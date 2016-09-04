var os = require('os');
var osUtils = require('os-utils');

console.log(os.hostname());
console.log(`PLATFORM: ${os.platform()}`);

setInterval(() => {

    var totalMemory = Math.round(osUtils.totalmem());
    var freeMemory = Math.round(osUtils.freemem());

    console.log(`TOTAL MEMORY: ${totalMemory}MB`);
    console.log(`MEMORY IN USE: ${totalMemory - freeMemory}MB`);

    // sent information to the server
}, 1000);

setInterval(() =>
    osUtils.cpuUsage(function (v) {
        console.log('CPU Usage (%): ' + v);

        // sent information to the server
    }), 1000);
