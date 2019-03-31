var url = require('url');

//주소문자열을 url로 만들기
var curURL = url.parse('http://m.search.naver.com/search.naver?query=steve+jobs&where=m&m=mtp_hty');

//url객체를 주소 문자열로
var curStr = url.format(curURL);

console.log('주소문자열:%s',curStr);
console.dir(curURL);


//요청 파라미터 구분하기
var querystring = require('querystring');
var param = querystring.parse(curURL.query);

console.log('요청 파라미터 중 query의 값 : %s', param.query);
console.log('원본 요청 파라미터 : %s', querystring.stringify(param));

