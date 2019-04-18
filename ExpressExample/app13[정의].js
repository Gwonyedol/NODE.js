/*Express는 http connect 컴포넌트를 기반으로 한 웹프레임워크
즉 웹 서버를 만드는 큰 틀이라고 보면 돼요
그리고 '컴포넌트(구성요소)'들을 미들웨어라고 합니다*/
var express = require('express') //기본적으로 express오고요
  , http = require('http') //서버기능을 담당하는 http와
	, path = require('path'); /*파일경로를 다루고 변경하는 유틸리티가
	포함되어있는 path를 불러옵니다.*/

/*Express의 미들웨어 불러오기
미들웨어의 정의 : Express 프레임워크에서 사용할 수 있는
중간처리 목적의 모듈들입니다.
생명주기: req - res 응답 주기로 종료*/
var bodyParser = require('body-parser') /*body 안에 들어있는 파라미터들을 편리하게 추출하도록 도와
주는 모듈이다. 얘를 쓰기전까진 언파인드로 설정되어있음*/
	, cookieParser = require('cookie-parser')
	, expressSession = require('express-session') /*쿠키,세션은 정보저장을 해주는 모듈인데
쿠키는 서버에 저장이고 expresssession은 웹브라우저에 저장되는 기능임*/
	, static = require('serve-static') /*특정경로에 있는 폴더를 지정해서 바로 가져올수 있게 만든 모듈*/
  , errorHandler = require('errorhandler')
	, expressErrorHandler = require('express-error-handler'); /*에러를 잡아주는 모듈*/

var multer = require('multer'); // 파일 업로드용 미들웨어
var fs = require('fs');

var cors = require('cors'); /*ajax(비동기)로 요청시 다중서버접속 지원*/
 
// 익스프레스 객체 생성
var app = express();

// 기본 속성 설정
app.set('port', process.env.PORT || 3000);
//but it is general behaviour to use port greater than 1024 to avoid sudo privilege dependency


//bodyParser 미들웨어
//bodyParser : body 안에 들어있는 파라미터를 편리하게 추출하도록 도와준다.
//req.body는 body-parser를 사용하기 전에는 디폴트 값으로 Undefined이 설정되기 때문이다. (출처: Express Docs)
//참고 : https://medium.com/@chullino/1%EB%B6%84-%ED%8C%A8%ED%82%A4%EC%A7%80-%EC%86%8C%EA%B0%9C-body-parser%EB%A5%BC-%EC%86%8C%EA%B0%9C%ED%95%A9%EB%8B%88%EB%8B%A4-%ED%95%98%EC%A7%80%EB%A7%8C-body-parser%EB%A5%BC-%EC%93%B0%EC%A7%80-%EB%A7%88%EC%84%B8%EC%9A%94-bc3cbe0b2fd
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// public 폴더와 uploads 폴더 오픈! 패스로 만듬
app.use('/a', static(path.join(__dirname, 'public'))); //localhost:3000/public 패스로 public 폴더를열음
app.use('/uploads', static(path.join(__dirname, 'uploads'))); //localhost:3000/uploads 패스로 uploads 폴더를열음

// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
	secret:'my key', //세션을 암호화 하여 저장하는 값 세션이 변조되지 않도록
	resave:true, // 세션을 언제나 저장할 지 (변경되지 않아도) 정하는 값입니다
	saveUninitialized:true // 세션이 저장되기 전에 uninitialized 상태로 미리 만들어서 저장합니다.
}));


//클라이언트에서 ajax로 요청 시 CORS(다중 서버 접속) 지원
app.use(cors());


//multer 미들웨어 사용(파일 업로드시 POST방식 많이씀)
//사용 순서 중요! 
//body-parser -> multer -> router
// 파일 제한 : 10개, 1G
var storage = multer.diskStorage({ //저장경로와 파일명을 지정하기위해 multer의 diskstorage엔진이 필요함
	destination: function(req, file, callback) { //파일경로
		callback(null, 'uploads')
	},
	filename: function(req, file, callback){ //파일이름
		callback(null, file.originalname + Date.now())
	}
}) 

var upload = multer({
	storage:storage, //저장경로
	limits:{
		files:10,
		fileSize:1024 * 1024 * 1024 //사이즈
	}
});

//라우터 미들웨어
//사용자가 요청한 기능이 무엇인지 '패스'를 기준으로 구별해준다
//라우터 단위로 request가 발생하면 실행, 특정 지정 라우트가 실행되었을 때마다 실행되는 미들웨어
//요청url이 무엇인지 일일이 확인해야하는 번거로움 없애줌
var router = express.Router();

router.route('/process/photo').post(upload.array('photo',1), function(req, res){
	console.log('/process/photo 호출됨'); //upload.array가 뭔말인진...

	try{

		var files = req.files; //arrays 이므로 암묵적인 배열선언

		console.dir('#======업로드된 첫번째 파일 정보=====#');
		console.dir(req.files[0]);
		console.dir('#=======#');


		//현재 파일 정보를 저장할 수 있는 변수선언

		var originalname = '', //파일 원래이름
			filename = '', //저장되며 변경될이름
			mimetype = '', //저장될 파일 확장자
			size = 0 ; //파일 크기

			//배열에 들어가 있는 경우
			//설정에서 1개의 파일도 배열에 넣게함
			if(Array.isArray(files)){
				console.log("배열에 들어있는 파일 개수:%d", files.length);
				//배열에 요청 객체를 넣는 과정
				for(var index = 0; index<files.length; index++){
					originalname = files[index].originalname;
					filename = files[index].filename;
					mimetype = files[index].mimetype;
					size = files[index].size;
				}
			 } else {
				//배열에 들어가 있지 않은 경우
				//현재설정에서는 노 상관
				
				console.log('파일개수:1');
				 
				originalname = files[index].originalname;
				filename = files[index].name;
				mimetype = files[index].mimetype;
				size = files[index].size;

				}

				console.log('현재 파일정보:'+ originalname + filename + mimetype + size);

				//클라이언트에 응답 전송
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h1>파일 업로드 성공</h1>');;
				res.write('<hr/>')
				res.write('<div><p> 원본 파일 이름 : '+originalname+'</p></div>');
				res.write('<div><p> 저장 파일명: '+filename+'</p></div>');
				res.end();
			} catch(err){
				console.dir(err.stack);
			}

	});


 
app.use('/', router);
//app.use('/', router); 부분을 보게되면, '/'로 시작되는 모든 url 요청을 router.js로 넘겨주겠다는 의미입니다


// 404 에러 페이지 처리
var errorHandler = expressErrorHandler({
    static: {
      '404': './public/404.html'
    }
});

app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express 서버가 3000번 포트에서 시작됨');
});
