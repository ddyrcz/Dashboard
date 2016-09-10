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
  return undefined;
}

var getClientTemplate = function (id) {
  return `<li>
			<div id='${id}'>
				<div class='client'>
					<div class='memwrapper'>
						<div class='hostname'></div>
						<div class='mem'></div>
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

    cpuBar[data.id] = getCpuBar(`${data.id}-cpu`);
    //memBar[data.id] = getMemBar(memId);
  });

  socket.on('mem', (data) => {
    var inUse = data.inUse;
    var total = data.total;

    memBar[data.id].animate(data.usage)

  });

  socket.on('cpu', (data) => {
    console.log(data.usage);
    cpuBar[data.id].animate((data.usage));
  });

  socket.on('clientDisconnected', (id) => {
    var id =`#${id}`; 
    $(id).fadeOut(1000, () => {
      $(id).remove();
    });    
  });

});