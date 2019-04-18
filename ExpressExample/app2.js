var express = require('express')
  , http = require('http')

var app = express();

//미들웨어 : 구조 내에서 중간 처리를 위한 함수(함수들의 꾸러미가 모듈)
//미들웨어 함수 생명주기 : request - response 응답을 주기로 종료 
//use함수로 써준다
app.use(function(req,res,next){
    console.log('첫번째 미들웨어에서 요청을 처리했예돌');

    res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
    res.end('<h1>Express  서버에서 응답한 결과입니다.</h1>');

});

http.createServer(app).listen(3000,function(){
    console.log('Express 서버가 3000번 포트에서 시작됨');
});