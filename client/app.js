var os = require('os'),
    osUtils = require('os-utils'),
    ioc = require('socket.io-client');

var socket = ioc.connect("http://localhost:8000");

socket.on("connect", function () {

    console.log('Connected to server');

    socket.emit('hostname', os.hostname());
    socket.emit('platform', os.platform());

    setInterval(() => {
        // var totalMemory = Math.round(osUtils.totalmem());
        // var freeMemory = Math.round(osUtils.freemem());

        //console.log(`TOTAL MEMORY: ${totalMemory}MB`);
        //console.log(`MEMORY IN USE: ${totalMemory - freeMemory}MB`);

        // sent information to the server        

    }, 1000);

    setInterval(() =>
        osUtils.cpuUsage(function (usage) {
            socket.emit('cpu', Math.round(usage * 100));
        }), 1000);
});
