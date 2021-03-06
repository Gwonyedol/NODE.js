
var http = require('http');
var fs = require('fs');

var server = http.createServer();

var port = 3000;
server.listen(port, function() {
	console.log('웹서버가 시작되었습니다. : %d', port);
});

server.on('connection', function(socket) {
    var addr = socket.address();
	console.log('클라이언트가 접속했습니다. : %s, %d', addr.address, addr.port);
});

server.on('request', function(req, res) {
	console.log('클라이언트 요청이 들어왔습니다.');
    
    var filename = 'house.jpg';
    var infile = fs.createReadStream(filename, {flags:'r'});
    
    //파이프로 연결하여 알아서 처리하도록 설정하기
    infile.pipe(res);
	
});

server.on('close', function() {
	console.log('서버가 종료됩니다.');
});

