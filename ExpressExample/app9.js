var express = require('express')
  , http = require('http')
  , path = require('path')
  , expressErrorHandler = require('express-error-handler');;

var bodyParser = require('body-parser')
  , static = require('serve-static')
  , errorHandler = require('errorhandler');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/public', static(path.join(__dirname, 'public')));

var router = express.Router();

router.route('/process/users/:id').get(function(req,req){
	console.log('처리완료');
	
	//URL 파라미터 확인
	var paramId = req.params.id;

	res.wrtieHead('200',{'Content-Type':'text/html;charset=utf8'});
	res.write('<h1>Express서버에서 응답한 결과임</h1>');
	res.write('<div><p>Param id :'+paramId+'</p></div>');
	res.end();
});

app.use('/',router);


// 등록되지 않은 패스에 대해 페이지 오류 응답
app.all('*', function(req, res) {
	res.status(404).send('<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>');
});


// 404 에러 페이지 처리
var errorHandler = expressErrorHandler({
    static: {
      '404': './public/404.html'
    }
});

app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );


// Express 서버 시작
http.createServer(app).listen(app.get('port'), function(){
  console.log('서버 시작됨~~~~~ ' + app.get('port'));
});
