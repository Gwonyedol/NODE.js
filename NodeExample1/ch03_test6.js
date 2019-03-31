var Person = {};

Person['age'] = 24;
Person['name'] = '권예돌';

var oper = function(a,b) {
    return a+b;
};

Person['add']=oper;

console.log('더하기:%d',Person.add(10,10));