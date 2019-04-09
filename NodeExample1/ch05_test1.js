var http = require('http');

//웹 서버 객체를 만든다
var sever = http.createServer();

//웹 서버를 시작하여 3000번 포트에서 대기
var port = 3000;
server.listen(port,function(){
    sonsole.log('서버 시작 :%d',port);
})

//웹서버를 시작하여 192.168.0.5 ip와 3000번 포트에서 대기하도록 설정
var host = '192.168.0.5';
var port = 3000;
server.listen(port,host,'50000',function(){
    console.log('서버 시작:%s,%d',host,port);
});
