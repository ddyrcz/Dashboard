var socketio = require('socket.io');

var dashboards = [];

var sendToAll = function (event, message) {
    if (dashboards) {
        dashboards.forEach(function (dashboard) {
            dashboard.emit(event, message);
        });
    }
}

var getProperSocketId = function (socket) {
    return socket.id.replace('/#', '');
}

var isClient = function (socket) {
    return dashboards.indexOf(socket) == -1;
}

module.exports = function (server) {
    var io = socketio.listen(server);

    io.sockets.on('connection', (socket) => {

        console.log('Connection accepted');

        socket.on('hostname', (hostname) => {
            sendToAll('hostname', { id: getProperSocketId(socket), hostname: hostname });
        });

        socket.on('dashboard', () => {
            console.log('Dashboard connected');
            dashboards.push(socket);
        });

        socket.on('platform', (platform) => {
            sendToAll('platform', { id: getProperSocketId(socket), platform: platform });
        });

        socket.on('cpu', (usage) => {
            sendToAll('cpu', { id: getProperSocketId(socket), usage: usage });
        });

        socket.on('disconnect', () => {
            if (isClient(socket)) {
                sendToAll('clientDisconnected', getProperSocketId(socket));
            }
        });
    });
}