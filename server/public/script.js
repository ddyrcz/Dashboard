var socket = io.connect();

$(document).ready(() => {
    socket.emit('dashboard');

    socket.on('hostname', (data) => {        
         $('#clients').append(`<li id='${data.id}'><div class='hostname'>${data.hostname}</div><div class='cpu'></div></li>`);
    });

    socket.on('cpu', (data) => {
        console.log(`#${data.id} .cpu`);
        $(`#${data.id} .cpu`).text(data.usage);        
    });
});