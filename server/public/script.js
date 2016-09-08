var socket = io.connect();

var bar = new ProgressBar.Line(container, {
  strokeWidth: 4,
  easing: 'easeInOut',
  duration: 1400,
  progress: 1,
  color: '#FFEA82',
  trailColor: '#eee',
  trailWidth: 1,
  svgStyle: {width: '100%', height: '100%'},
  from: {color: '#FFEA82'},
  to: {color: '#ED6A5A'},
  step: (state, bar) => {
    bar.path.setAttribute('stroke', state.color);
  }
});

$(document).ready(() => {
    socket.emit('dashboard');

    // socket.on('hostname', (data) => {        
    //      $('#clients').append(`<li id='${data.id}'><div class='hostname'>${data.hostname}</div><div class='cpu'></div></li>`);
    // });

    socket.on('cpu', (data) => {
        // console.log(`#${data.id} .cpu`);
        // $(`#${data.id} .cpu`).text(data.usage);    

        bar.animate((data.usage/100), {duration:800});
    });

});