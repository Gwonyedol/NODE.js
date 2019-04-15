
var http = require('http');
var fs = require('fs');

var server = http.createServer();

var port = 3000;
server.listen(port, function() {
	console.log('웹서버가 시작됨: %d', port);
});

server.on('connection', function(socket) {
    var addr = socket.address();
	console.log('클라이언트가 접속함: %s, %d', addr.address, addr.port);
});

// 클라이언트 요청 이벤트 처리
server.on('request', function(req, res) {
	console.log('클라이언트 요청이 들어옴');
	
	var filename = 'house.jpg';
	var infile = fs.createReadStream(filename, {flags: 'r'} );
	var filelength = 0;
	var curlength = 0;
	
	fs.stat(filename, function(err, stats) {
		filelength = stats.size;
	});
	//fs의 stat는 파일정보를 담고있다.
	
	// 헤더 쓰기
	res.writeHead(200, {"Content-Type": "image/jpg"});

	// 파일 내용을 스트림에서 읽어 본문 쓰기
	infile.on('readable', function() {
        var chunk;
        while (null !== (chunk = infile.read())) {
            console.log('읽어들인 데이터 크기 : %d 바이트', chunk.length);
            curlength += chunk.length;
            res.write(chunk, 'utf8', function(err) {
            	console.log('파일 부분쓰기 완료 : %d, 파일 크기 : %d', curlength, filelength);
            	if (curlength >= filelength) {
            		// 응답 전송하기
            		res.end();
            	}
            });
		}
	});
    

	  
});

// 서버 종료 이벤트 처리
server.on('close', function() {
	console.log('서버가 종료됩니다.');
});

