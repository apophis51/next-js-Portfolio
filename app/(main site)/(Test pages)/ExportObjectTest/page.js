
class Car {
    constructor(make, model, year) {
      this.make = make;
      this.model = model;
      this.year = year;
      console.log(this)
    }
  
    displayInfo() {
      console.log(`${this.year} ${this.make} ${this.model}`);
    }
  
    // Serialize the object to JSON
    toJSON() {
        return JSON.stringify({
          make: this.make,
          model: this.model,
          year: this.year,
        });
      }
  }
  const myCar = new Car('Toyota', 'Camry', 2022);  
  console.log(myCar)
  let jasonCar = myCar.toJSON();
  console.log(jasonCar)
 

  const reconstructedCar = new Car(...Object.values(JSON.parse(jasonCar)));

// Use the reconstructed object
reconstructedCar.displayInfo();