//Express 기본 모듈 불러오기
//express 모듈은 웹서버를위해 만들어졌으므로 http모듈위에
//동작합니다.(express는 http와 한몸!)
var express = require('express')
  , http = require('http');

//익스프레스 객체 생성
var app = express();

// 기본 포트를 app 객체에 속성으로 설정
app.set('port', process.env.PORT || 3000);

// Express 서버 시작
http.createServer(app).listen(app.get('port'), function(){
  console.log('익스프레스 서버시작이당!! : ' + app.get('port'));
});

