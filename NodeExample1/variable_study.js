console.log(name); // undefined
var name = '예지';

/*위의 코드를 보면 첫 줄에 name을 출력하는데 에러가 나지 않고 undefined가 나옵니다. 
왜냐면 실행시점에 호이스팅에 의해 var 변수가 아래와 같이 최 상단에 선언됩니다.*/

//var name2 = '예지' // 전역변수
//{
//    console.log(name2) //  name is not defined
//    let name2 = '예지' // 지역변수
//}


var name3 = '예돌';
 
(function(){
  var name3 = '권예돌';
  console.log(name3);
})();
 
console.log(name3);



let name4 = '예지';
 
{
  let name4 = '권예돌';
  console.log(name4);
}
 
console.log(name4);


var name5 = '예지';
function test() {
    console.log(name5);
    var name5 = '권예돌';
    console.log(name5);
}
test();


//let name6 = '예지';
//function test() {
//    console.log(name6);
//    let name6 = '권예돌';
//    console.log(name6);
//}
//test();
//재선언 불가능

let name6 = '예지';
{
    let name6 = '권예돌';
    console.log(name6);
}
console.log(name6);
