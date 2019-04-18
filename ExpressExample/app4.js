var express = require('express')
  , http = require('http');

var app = express();

//send 이용하여 JSON 전송
app.use(function(req, res, next) {
	console.log('첫번째');
	
	res.send({name:'권예돌', age:24});
});


// Express 서버 시작
http.createServer(app).listen(3000, function(){
  console.log('Express 서버가 3000번 포트에서 시작됨.');
});


