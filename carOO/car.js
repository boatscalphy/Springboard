class Vehicle {
    
    constructor(make, model, year) {

        this.make = make;
        this.model = model;
        this.year = year;

    }

    honk() {
        return "BEEEEEP";
    }

    toString() {
        return `The vehicle is a ${this.make} ${this.model} from ${this.year}`
    }
}

class Car extends Vehicle {
    constructor(make, model, year) {
        super(make, model, year);
        this.numWheels = 4;
    }
}

class Motorcycle extends Vehicle {
    constructor(make, model, year) {
        super(make, model, year);
        this.numWheels = 2;
    }

    revEngine() {
        return "VROOOOOM!"
    }
}

class Garage {
    constructor(capacity) {
        this.capacity = capacity;
        this.vehicles = [];
    }

    add(vehicle) {
        if (this.vehicles.length >= capcity) {
            return `Sorry we're full`;
        }

        if (!(vehicle instanceof Vehicle)) {
            return `Only vehicles are allowed in here`
        }

        this.vehicles.push(vehicle);
        return `Vehicle Added!`
    }
}