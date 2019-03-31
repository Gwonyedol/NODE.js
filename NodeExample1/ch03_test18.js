function Person(name,age) {
    this.name = name;
    this.age = age;
}

Person.prototype.walk = function(speed){
    console.log(speed + 'km속도로 걸어갑니다.');
}

var person01 = new Person('예돌',24);
var person02 = new Person('지은',24);

console.log(person01.name + '객체의 walk(10)을 호출합니다.');
person01.walk(10);
