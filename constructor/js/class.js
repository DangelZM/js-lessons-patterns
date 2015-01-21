
// В javascript нет классов (пока нет),
// но их можно смоделировать с помощу функций

function Car(model) {

    this.model = model;
    this.color = "чорный";
    this.year  = "2013";

    this.getInfo = function () {
        return this.model + " " + this.year;
    };

}

// Мы можем создать экземпляр объекта с помощью конструктора Car 
// который мы определили выше:

var myCar = new Car("Ford");

myCar.year = "2010";

console.log(myCar.getInfo());