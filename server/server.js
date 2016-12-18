var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    clientsManager = require('./lib/clients_manager');

app.use(express.static(__dirname + '/public'));

clientsManager(server);

server.listen(8000, () => {
    console.log('Server is listining');
});
