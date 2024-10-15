
// class Car {
//     constructor(make, model, year) {
//       this.make = make;
//       this.model = model;
//       this.year = year;
//       console.log(this)
//     }
  
//     displayInfo() {
//       console.log(`${this.year} ${this.make} ${this.model}`);
//     }
  
//     // Serialize the object to JSON
//     toJSON() {
//         return JSON.stringify({
//           make: this.make,
//           model: this.model,
//           year: this.year,
//         });
//       }
//   }
//   const myCar = new Car('Toyota', 'Camry', 2022);  
//   console.log(myCar)
//   let jasonCar = myCar.toJSON();
//   console.log(jasonCar)
 

//   const reconstructedCar = new Car(...Object.values(JSON.parse(jasonCar)));

// // Use the reconstructed object
// reconstructedCar.displayInfo();
// let cool = new Set()

// cool.add('a')

// console.log(cool)

// // let cool = []
// let object = {
//     a: true,
//     b: false
// }

// cool['a'] = true
// cool.b = false

// console.log(cool['a'])
// console.log(cool)
// console.log(object)

// Object.entries(cool).forEach(([key, value]) => {
//     console.log(key, value)
// }
// )
// cool.forEach((item) => (console.log('item 1',item)))