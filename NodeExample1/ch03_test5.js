var Person = {};

Person['age'] = 24;
Person['name'] = '권예돌';
Person.add = function(a,b) {
    return a+b;
};

console.log('더하기:%d',Person.add(10,10));