var express = require('express')
  , http = require('http')

var app = express();

//미들웨어 : 클라이언트에게 응답(res)을 보낸다
//use함수로 써준다
//라우팅 : 요청정보(req)를 처리해주는곳
app.use(function(req,res,next){
    console.log('첫번째 미들웨어에서 요청을 처리했예돌');

    res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
    res.end('<h1>Express  서버에서 응답한 결과입니다.</h1>');

});

http.createServer(app).listen(3000,function(){
    console.log('Express 서버가 3000번 포트에서 시작됨');
});