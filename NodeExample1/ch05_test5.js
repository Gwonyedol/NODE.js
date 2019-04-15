
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

// 클라이언트 요청 이벤트 처리
server.on('request',function(req,res){
    console.log('클라이언트 요청 들어왔어');

    var filename = 'house.jpg';
    fs.readFile(filename,function(err,data){
        res.writeHead(200, {"Content-Type":"image/jpg"});
        res.write(data);
        res.end();
    })
})

// 서버 종료 이벤트 처리
server.on('close', function() {
	console.log('서버가 종료됩니다.');
});

