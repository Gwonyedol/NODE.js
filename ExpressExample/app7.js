var express = require('express')
  , http = require('http')
  , path = require('path');

//POST방식을 다루는 미들웨어 모듈
var bodyParser = require('body-parser')
  , static = require('serve-static');

var app = express();

app.set('port', process.env.PORT || 3000);

//body-parser를 이용해 application/x-www-form-urlencoded 파싱
//body-parser를 이용해 application/json 파싱
//얘네둘을 써줘야 req.body.id를 이용할 수 있음 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//static 메소드는 패스를 지정해준다!
app.use(static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
	console.log('첫번째');

	var paramId = req.body.id || req.query.id;
	var paramPassword = req.body.password || req.query.password;
	
	res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
	res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
	res.write('<div><p>Param id : ' + paramId + '</p></div>');
	res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
	res.end();
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('서버연결해보장' + app.get('port'));
});
