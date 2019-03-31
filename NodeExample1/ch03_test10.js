var animal = [{name:'고양이',cute:100},{name:'강아지',cute:90},{name:'햄스터',cute:80}];

console.log('배열 요소의 수:%d',animal.length);
for(var i =0; i<animal.length; i++){
    console.log('배열요소 #' + i + ':%s', animal[i].name)
};


console.log('\nforEach구문 사용하기');
animal.forEach(function(item,index){
    console.log('배열요소 #'+index+':%s',item.name);
});