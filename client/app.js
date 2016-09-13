var os = require('os'),
    osUtils = require('os-utils'),
    ioc = require('socket.io-client');

var socket = ioc.connect("http://localhost:8000");

socket.on("connect", function () {

    console.log('Connected to server');

    socket.emit('hostname', 'Dawid');
    socket.emit('platform', os.platform());

    setInterval(() => {
        var total = Math.round(osUtils.totalmem());
        var free = Math.round(osUtils.freemem());

        socket.emit('mem', { total: total, free: free });

    }, 800);

    setInterval(() =>
        osUtils.cpuUsage(function (usage) {
            socket.emit('cpu', usage);
        }), 800);
});
