//쿠키와 세션 관리하기
//쿠키 : [웹브라우저]에 저장되는 정보로서 일정기간 저장하고
//싶을때 사용합니다.
//세션 : 상태정보를 저장하나 [서버]에 저장된다


//express,http,path 모듈 불러오기
var express = require('express') 
  , http = require('http')
  , path = require('path');

/*
미들웨어 : 구조 내에서 중간 처리를 위한 함수(함수들의 꾸러미가 모듈)
미들웨어 함수 생명주기 : request - response 응답을 주기로 종료 
 -라우터 미들웨어
사용자가 요청한 기능이 무엇인지 '패스'를 기준으로 구별해준다
요청url이 무엇인지 일일이 확인해야하는 번거로움 없애줌
-express-session 모듈
세션을 지원하기위해 사용하는 모듈
*/

var bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , static = require('serve-static')
	, errorHandler = require('errorhandler')
	, expressSession = require('express-session');

var expressErrorHandler = require('express-error-handler');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/public', static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(expressSession({
	secret:'my yedol',
	resave:true,
	saveUninitialized:true
}));


//라우터 사용하여 라우팅 함수 등록
var router = express.Router();

//상품정보 라우팅
//req.session.user가 있으면 상품페이지로
//없으면 로그인 페이지로 넘어감
//get방식인데.. 언제는 get이고 언제는 post인건지 헷갈
router.route('/process/product').get(function(req,res){
	console.log('상품페이지 호출완료');

	if(req.session.user){
		res.redirect('/public/product.html');
	}else{
		res.redirect('/public/login2.html');
	}
});

//로그인 라우팅
//login페이지에서 Id,Password를 받아올건데
//req.session.user가 존재하면 로그인 상태니까
//상품페이지로 돌아가고 존재하지 않으면 가입 ㄱㄱ
router.route('/process/login').post(function(req,res){
	console.log('로그인 페이지 호출완료');

	var paramId = req.body.id || req.query.id;
	var paramPassword = req.body.password || req.query.password;

	if(req.session.user){ //session.user가 있다면..
		console.log('이미 로그인상태라 상품페이지로 돌아감');

		res.redirect('/public/product.html');
	}else{
		//로그인 안되어있으니 세션 저장쓰~~
		req.session.user = {
			id:paramId,
			name:'권예돌',
			authorized:true
		};

		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h1>로그인 성공</h1>');;
		res.write('<div><p>Param id:'+paramId+'</p></div>');
		res.write('<div><p>Param password : '+paramPassword+'</p></div>');
		res.write("<br><br><a href='/process/product'>상품페이지로 이동</a>");
		res.end();
	}
});

//로그아웃 라우팅 - 로그아웃하면 세션 삭제쓰
router.route('/process/logout').get(function(req, res){

	if(req.session.user){
		//로그인 상태라면?
		console.log('로그아웃');
		
		req.session.destroy(function(err){
			if(err) {throw err;}

			console.log('세션 삭제하고 로그아웃함!');
			res.redirect('/public/login2.html');
		});
	} else{
		//로그인 안된 상태라면?
		console.log('아직 로그인이 되어 있지 않슴다');
		res.redirect('/public/login2.html');
	}
})

app.use('/', router);


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
  console.log('서버 시작되었다!' + app.get('port'));
});

