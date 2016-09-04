var socketio = require('socket.io');
var http = require('http');

var server = http.createServer();

server.listen(8000, () => {
    console.log('Server is listining');
});

var io = socketio.listen(server);

var clients = [];

io.sockets.on('connection', (socket) => {

    console.log('Connection accepted');

    socket.on('hostname', (hostname) => {
        console.log(hostname);
    });

    socket.on('platform', (platform) => {
        console.log(platform);
    });

    socket.on('cpu', (usage) => {
        console.log(usage);
    });
});