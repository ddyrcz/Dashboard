var socket = io.connect();

var getBar = function (id) {
  return new ProgressBar.Line(id, {
    strokeWidth: 4,
    easing: 'easeInOut',
    duration: 1400,
    progress: 1,
    color: '#FFEA82',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: { width: '100%', height: '100%' },
    from: { color: '#00FF00' },
    to: { color: '#FF0000' },
    step: (state, bar) => {
      bar.path.setAttribute('stroke', state.color);
    }
  });
}

var clients = {};

$(document).ready(() => {
  socket.emit('dashboard');

  socket.on('hostname', (data) => {

    var cpuId = `${data.id}cpu`;
    $('#clients').append(`<li><div id='${data.id}hostname'>${data.hostname}</div><div id='${cpuId}'></div></li>`);
    console.log(data);

    console.log(cpuId);
    clients[data.id] = getBar(cpuId);
    
  });

  socket.on('cpu', (data) => {
    // console.log(`#${data.id} .cpu`);
    // $(`#${data.id} .cpu`).text(data.usage);
            
    //clients[data.id].animate((data.usage / 100), { duration: 800 });
  });

});