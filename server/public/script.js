var socket = io.connect();

$(document).ready(() => {
    socket.emit('dashboard');

    socket.on('cpu', (usage) => {
        $('#cpu').text(usage);
    });
});