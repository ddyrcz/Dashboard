var socketio = require('socket.io');

var dashboards = [];
var clients = [];

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
    return clients.indexOf(socket) != -1;
}

var removeClient = function (socket) {
    clients.splice(clients.indexOf(socket), 1);
}

var reportClients = function (dashboard, clients) {
    clients.forEach((client) => {
        dashboard.emit('hostname', { id: getProperSocketId(client), hostname: client.hostname });
    });
}

module.exports = function (server) {
    var io = socketio.listen(server);

    io.sockets.on('connection', (socket) => {

        console.log('Connection accepted');

        socket.on('hostname', (hostname) => {
            socket.hostname = hostname;
            clients.push(socket);
            sendToAll('hostname', { id: getProperSocketId(socket), hostname: hostname });
        });

        socket.on('dashboard', () => {
            reportClients(socket, clients);
            dashboards.push(socket);
        });

        socket.on('platform', (platform) => {
            sendToAll('platform', { id: getProperSocketId(socket), platform: platform });
        });

        socket.on('cpu', (usage) => {
            sendToAll('cpu', { id: getProperSocketId(socket), usage: usage });
        });

        socket.on('mem', (mem) => {
            sendToAll('mem', { id: getProperSocketId(socket), mem: mem });
        });

        socket.on('disconnect', () => {
            if (isClient(socket)) {
                removeClient(socket);
                sendToAll('clientDisconnected', getProperSocketId(socket));
            }
        });
    });
}