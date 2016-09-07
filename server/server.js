var socketio = require('socket.io');
var http = require('http');
var staticFile = require('./lib/static_file');

var server = http.createServer((req, res) => {
    var filePath = manageFilePath(req.url);
    staticFile.serveStaticFile(filePath, res);
});

var manageFilePath = function (url) {
    if (url === '/') {
        return 'public/index.html';
    } else {
        return 'public' + url;
    }
}

server.listen(8000, () => {
    console.log('Server is listining');
});

var io = socketio.listen(server);

var dashboards = [];

io.sockets.on('connection', (socket) => {

    console.log('Connection accepted');

    socket.on('hostname', (hostname) => {
        console.log(hostname);
    });

    socket.on('dashboard', () => {
        console.log('Dashboard connected');
        dashboards.push(socket);
    });

    socket.on('platform', (platform) => {
        console.log(platform);
    });

    socket.on('cpu', (usage) => {
        console.log(usage);

        if (dashboards) {
            dashboards.forEach(function (dashboard) {
                dashboard.emit('cpu', { id: socket.id, usage: usage });
            });
        }
    });
});