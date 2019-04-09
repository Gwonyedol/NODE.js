var http = require('http');

//웹 서버 객체를 만든다
var sever = http.createServer();

//웹 서버를 시작하여 3000번 포트에서 대기
var port = 3000;
server.listen(port,function(){
    sonsole.log('서버 시작 :%d',port);
})

//클라이언트 연결 이벤트 처리
server.on('connection',function(socket){
    var addr = socket.add
    
});

//클라이언트 요청 이베트 처리
server.on