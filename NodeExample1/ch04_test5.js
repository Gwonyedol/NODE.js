var fs = require('fs');

//파일을 동기식 io로 읽어온다
var data = fs.readFileSync('./package.json','utf8');

//읽어들인 데이터를 출력한다
console.log(data);