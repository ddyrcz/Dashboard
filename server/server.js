var http = require('http'),
    staticFile = require('./lib/static_file'),
    clientsManager = require('./lib/clients_manager');

var server = http.createServer((req, res) => {
    var filePath = manageFilePath(req.url);
    staticFile.serveStaticFile(filePath, res);
});

clientsManager(server);

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
