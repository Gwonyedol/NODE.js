var animal = [{name:'고양이',cute:100},{name:'강아지',cute:90}];
console.log('push()전 배열 요수의 수:%d',animal.length);

animal.push({name:'햄스터',cute:80});
console.log('push()후 배열 요수의 수:%d',animal.length);

animal.pop();
console.log('pop()후 배열 요수의 수:%d',animal.length);