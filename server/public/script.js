var socket = io.connect();

const NA_TILES_COUNT = 4;

var getCpuBar = function (id) {
  return new ProgressBar.Line(window[id], {
    strokeWidth: 1,
    easing: 'easeInOut',
    duration: 1400,
    progress: 1,
    color: '#FFEA82',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: { width: '100%', height: '100%' },
    from: { color: '#76497C' },
    to: { color: '#76497C' },
    step: (state, bar) => {
      bar.path.setAttribute('stroke', state.color);
    }
  });
}

var getMemBar = function (id) {
  return new ProgressBar.SemiCircle(window[id], {
    strokeWidth: 10,
    easing: 'easeInOut',
    duration: 1400,
    color: '#76497C',
    trailColor: 'white',
    trailWidth: 10,
    svgStyle: null,
    text: {
      value: ''
    }
  });
}

var getClientTemplate = function (id) {
  return `<li>
			<div id='${id}'>
				<div class='client'>
					<div class='memwrapper'>
						<div class='hostname'></div>
						<div class='mem'>
              <div id='${id}-mem'>
              </div>
            </div>
					</div>
					<div class='oswrapper'>
            <img class='img'/>
          </div>
					<div class='cpuwrapper'>
						<div class='cpu'>
							<div class='cputext'>CPU</div>
							<div id='${id}-cpu'>
							</div>
						</div>
					</div>
				</div>
			</div>
		</li>`;
}

var cpuBar = {};
var memBar = {};

var clientCount = 0;

function removeNaTile(count) {
  if (count < NA_TILES_COUNT) {
    $('#clients li:last').fadeOut(1000, () => {
      $('#clients li:last').remove();
    });
  }
}

function appendNaTile(count) {
  if (count < NA_TILES_COUNT) {
    $('#clients').append('<li class="na">N/A</li>');
  }
}

function styleMemoryBar(bar) {
  bar.text.style.fontSize = '13px';
  bar.text.style.color = '#fff';
}

$(document).ready(() => {
  socket.emit('dashboard');

  socket.on('hostname', (data) => {
    var cpuId = `${data.id}-cpu`;
    var memId = `${data.id}-mem`;

    clientCount += 1;

    var client = $(getClientTemplate(data.id))
      .hide()
      .fadeIn(1000);

    $('#clients').prepend(client);
    removeNaTile(clientCount);

    $(`#${data.id} .hostname`).text(data.hostname);
    $(`#${data.id}-cpu`).css('height', '100%');

    cpuBar[data.id] = getCpuBar(cpuId);
    memBar[data.id] = getMemBar(memId);

    styleMemoryBar(memBar[data.id]);    
  });

  socket.on('mem', (data) => {
    var total = data.mem.total;
    var free = data.mem.free;

    memBar[data.id].setText(`${total - free} / ${total}`);

    var usage = (total - free) / total;
    console.log(usage);
    memBar[data.id].animate(usage);

  });

  socket.on('cpu', (data) => {    
    cpuBar[data.id].animate(data.usage);
  });

  socket.on('platform', (data) => {
    $(`#${data.id} .img`).attr('src', `img\\${data.platform}.png`);
  });

  socket.on('clientDisconnected', (id) => {
    var id = `#${id}`;
    $(id).fadeOut(1000, () => {
      $(id).remove();
    });

    clientCount -= 1;
    appendNaTile(clientCount);
  });
});