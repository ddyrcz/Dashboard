var socketio = require('socket.io');

var dashboards = [];

var sendToAll = function (event, message) {
    if (dashboards) {
        dashboards.forEach(function (dashboard) {
            dashboard.emit(event, message);
        });
    }
}

module.exports = function (server) {
    var io = socketio.listen(server);

    io.sockets.on('connection', (socket) => {

        console.log('Connection accepted');

        socket.on('hostname', (hostname) => {
            sendToAll('hostname', { id: socket.id.replace('/#', ''), hostname: hostname });
        });

        socket.on('dashboard', () => {
            console.log('Dashboard connected');
            dashboards.push(socket);
        });

        socket.on('platform', (platform) => {
            sendToAll('platform', { id: socket.id.replace('/#', ''), platform: platform });
        });

        socket.on('cpu', (usage) => {
            sendToAll('cpu', { id: socket.id.replace('/#', ''), usage: usage });
        });
    });
}