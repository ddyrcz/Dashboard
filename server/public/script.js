var socket = io.connect();

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
					<div class='oswrapper'></div>
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

$(document).ready(() => {
  socket.emit('dashboard');

  socket.on('hostname', (data) => {
    var cpuId = `${data.id}-cpu`;
    var memId = `${data.id}-mem`;

    var client = $(getClientTemplate(data.id))
      .hide()
      .fadeIn(1000);

    $('#clients').append(client);

    $(`#${data.id} .hostname`).text(data.hostname);
    $(`#${data.id}-cpu`).css('height', '100%');

    cpuBar[data.id] = getCpuBar(cpuId);
    memBar[data.id] = getMemBar(memId);

    memBar[data.id].text.style.fontSize = '15px';
    memBar[data.id].text.style.color = '#fff';
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
    //console.log(data.usage);
    cpuBar[data.id].animate(data.usage);
  });

  socket.on('clientDisconnected', (id) => {
    var id = `#${id}`;
    $(id).fadeOut(1000, () => {
      $(id).remove();
    });
  });

});