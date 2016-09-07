var socket = io.connect();

$(document).ready(() => {
    socket.emit('dashboard');

    socket.on('cpu', (data) => {
        $('#cpu').text(data.usage);
    });
});