var express = require('express')
  , http = require('http');

var app = express();

app.use(function(req, res, next){
console.log('첫번째');

var userAgent = req.header('User-Agent');
var paramName = req.query.name;
var paramid = req.query.id;

res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
res.write('<div><p>User-Agent:'+userAgent+'</p></div>');
res.write('<div><p>Param name :'+paramName+'</p></div>');
res.write('<div><p>Param value :'+paramid+'</p></div>');
res.end();

})


// Express 서버 시작
http.createServer(app).listen(3000, function(){
  console.log('Express 서버가 3000번 포트에서 시작됨.');
});


