var animal = [{name:'고양이',cute:100},{name:'강아지',cute:90}];
//console.log('delete 키워드로 배열요소 삭제 전 배열요소 수 : %d',animal.length);

//delete animal[1];
//console.log('delete키워드로 배열 요소 삭제 후');
//console.dir(animal);
       
console.dir(animal);

animal.splice(1,0,{name:'햄스터',cute:80});
console.log('splice로 인덱스1에 추가한후');
console.dir(animal);

              
animal.splice(1,2);
console.log('splice로 인덱스1부터 길이2만큼 삭제한후');
console.dir(animal);              