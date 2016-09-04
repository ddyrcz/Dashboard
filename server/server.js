// var socketio = require('socket.io');
// var http = require('http');

// var server = http.createServer((req, res) => {
	
// });


// var io = socketio.listen(server);

// var clients = [];

// io.sockets.on('connection', (socket) => {
//     clients.push(socket);


//     socket.on('cpu', (cpu) => {
//         //send to dashboard page
//     });

// });

var port = 3011;

var server = require( 'http' ).createServer( ).listen( port, function () {
    console.log( "Express server listening on port " + port );
} );

var io = require( 'socket.io' ).listen( server );

io.sockets.on( "connection", function ( socket ) {
    console.log( 'Server: Incoming connection.' );
    socket.on( "echo", function ( msg, callback ) {
        callback( msg );
    } );
} );


var ioc = require( 'socket.io-client' );
var client = ioc.connect( "http://localhost:" + port );

client.once( "connect", function () {
    console.log( 'Client: Connected to port ' + port );

    // client.emit( "echo", "Hello World", function ( message ) {
    //     console.log( 'Echo received: ', message );
    //     client.disconnect();
    //     server.close();
    // } );
} );

