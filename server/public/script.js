var socket = io.connect();

var getBar = function (id) {
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

var clients = {};

$(document).ready(() => {
  socket.emit('dashboard');

  socket.on('hostname', (data) => {
    var cpuId = `${data.id}-cpu`;

    var client = $(`<li id='${data.id}' ><div id='${data.id}-hostname'>${data.hostname}</div><div id='${cpuId}'></div></li>`)
      .hide()
      .fadeIn(1000);

    $('#clients').append(client);

    clients[data.id] = getBar(cpuId);
  });

  socket.on('cpu', (data) => {
    clients[data.id].animate((data.usage / 100), { duration: 800 });
  });

  socket.on('clientDisconnected', (id) => {
    var id =`#${id}`; 
    $(id).fadeOut(1000, () => {
      $(id).remove();
    });    
  });

})