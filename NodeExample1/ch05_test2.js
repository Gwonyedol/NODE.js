
var http = require('http');

var server = http.createServer();

var port = 3000; // 웹서버를 시작하여 3000번 포트에서 대기하도록 합니다.
server.listen(port, function() {
	console.log('웹서버가 시작되었습니다. : %d', port);
});

server.on('connection',function(socket){
	var addr = socket.address();
	console.log('클라이언트가 접속했어요:%s,%d',addr.address,addr.port);
//socket에는 클라이언트 연결 정보를 담고있다.
//address 메소드를 호출해서 클라이언트의 ip,포트정보 알수있음
});

server.on('request',function(req,res){ //클라이언트 요청 이벤트 처리
	console.log('클라이언트 요청이 들어왔어요');
	console.dir(req);
});

server.on('close', function(){
	console.log('서버가 종료된다');
});