//var socket = io.connect();

$(document).ready(() => {
    // socket.emit('dashboard');

    // socket.on('hostname', (data) => {        
    //      $('#clients').append(`<li id='${data.id}'><div class='hostname'>${data.hostname}</div><div class='cpu'></div></li>`);
    // });

    // socket.on('cpu', (data) => {
    //     console.log(`#${data.id} .cpu`);
    //     $(`#${data.id} .cpu`).text(data.usage);        
    // });

// progressbar.js@1.0.0 version is used
// Docs: http://progressbarjs.readthedocs.org/en/1.0.0/

var bar = new ProgressBar.Circle(container, {
  color: '#aaa',
  // This has to be the same size as the maximum width to
  // prevent clipping
  strokeWidth: 4,
  trailWidth: 1,
  easing: 'easeInOut',
  duration: 1400,
  text: {
    autoStyleContainer: false
  },
  from: { color: '#aaa', width: 1 },
  to: { color: '#333', width: 4 },
  // Set default step function for all animate calls
  step: function(state, circle) {
    circle.path.setAttribute('stroke', state.color);
    circle.path.setAttribute('stroke-width', state.width);

    var value = Math.round(circle.value() * 100);
    if (value === 0) {
      circle.setText('');
    } else {
      circle.setText(value);
    }

  }
});
bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
bar.text.style.fontSize = '2rem';

bar.animate(1.0);  // Number from 0.0 to 1.0

});