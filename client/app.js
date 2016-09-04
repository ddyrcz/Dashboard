var os = require('os');



console.log(os.hostname());
console.log(`PLATFORM: ${os.platform()}`);


setInterval(() => {

    var totalMemory = Math.round(os.totalmem() / 1000000);
    var freeMemory = Math.round(os.freemem() / 1000000);

    console.log(`TOTAL MEMORY: ${totalMemory}MB`);
    console.log(`MEMORY IN USE: ${totalMemory - freeMemory}MB`);
}, 1000);



// var osUtils = require('os-utils');

// setInterval(() =>
//     osUtils.cpuUsage(function (v) {
//         console.log('CPU Usage (%): ' + v);

//         // sent information to the server
//     }), 1000);
