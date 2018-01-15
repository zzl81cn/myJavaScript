/**
 *
 * @authors Your Name (you@example.org)
 * @date    2015-07-23 16:17:59
 * @version $Id$
 */

// cmd node example.js
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');

// var net = require('net');

// var server = net.createServer(function (socket) {
//   socket.write('Echo server\r\n');
//   socket.pipe(socket);
// });

// server.listen(1337, '127.0.0.1');

// Stream
// var Readable = require('stream').Readable;

// var rs = new Readable;
// rs.push('beep ');
// rs.push('boop\n');
// rs.push(null);

// rs.pipe(process.stdout);