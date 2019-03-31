var animal = [{name:'고양이',cute:100},{name:'강아지',cute:90},{name:'햄스터',cute:80},{name:'토끼',cute:95}];
console.log('배열요소의 수:%d',animal.length);
console.log('원본 animal');
console.dir(animal);


var animal2 = animal.slice(1,3);
console.dir(animal2);

var animal3 = animal2.slice(1);
console.dir(animal3);