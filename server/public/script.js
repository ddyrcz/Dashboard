var socket = io.connect();

var getCpuBar = function (id) {
  return new ProgressBar.Line(window[id], {
    strokeWidth: 4,
    easing: 'easeInOut',
    duration: 1400,
    progress: 1,
    color: '#FFEA82',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: { width: '100%', height: '100%' },
    from: { color: '#096b00' },
    to: { color: '#9f0505' },
    step: (state, bar) => {
      bar.path.setAttribute('stroke', state.color);
    }
  });
}

var getMemBar = function (id) {
  return undefined;
}

var cpuBar = {};
var memBar = {};

$(document).ready(() => {
  socket.emit('dashboard');

  socket.on('hostname', (data) => {
    var cpuId = `${data.id}-cpu`;
    var memId = `${data.id}-mem`;

    var client = $(`<li id='${data.id}' ><div id='${data.id}-hostname'>${data.hostname}</div><div id='${cpuId}'></div></li>`)
      .hide()
      .fadeIn(1000);

    $('#clients').append(client);

    cpuBar[data.id] = getCpuBar(cpuId);
    memBar[data.id] = getMemBar(memId);
  });

  socket.on('mem', (data) => {
    var inUse = data.inUse;
    var total = data.total;

    memBar[data.id].animate(data.usage)

  });

  socket.on('cpu', (data) => {
    cpuBar[data.id].animate((data.usage));
  });

  socket.on('clientDisconnected', (id) => {
    var id =`#${id}`; 
    $(id).fadeOut(1000, () => {
      $(id).remove();
    });    
  });

})