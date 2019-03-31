var animal = [{name:'고양이',cute:100},{name:'강아지',cute:90}];

var add = function(a,b){
    return a+b;
};

animal.push(add);


console.log('동물 숫자:%d',animal.length);
console.log('세번째 요소로 추가된 함수 실행:%d',animal[2](10,10));