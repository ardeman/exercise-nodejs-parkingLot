/**
 * @description a base class for Parking lot
 * @author Ardeman <ardeman.com>
 */
class ParkingLot {
    constructor() {
        this.capacity = 0; // maximum parking slots allowed
        this.parkingSlots = new Array(); // array for parking slots
    }

    /**
     *
     * @param {String} input user's input via terminal
     * @description creates a parking lot with given maximum slot numbers.
     * It throws an error if zero or negative input is provided
     */
    createParkingLot(input) {
        this.capacity = parseInt(input.split(" ")[1]) || 0;
        if (this.capacity <= 0) {
            // minimum: 1 slot
            throw new Error(
                "Minimum one slot is required to create parking slot"
            );
        }
        for (let i = 0; i < this.capacity; i++) {
            this.parkingSlots.push(null);
        }
        return this.capacity;
    }

    /**
     *
     * @param {String} input user's input via terminal
     * @description allocates nearest slot number to incoming cars.
     * It throws an error if parking lot is empty or full.
     */
    parkCar(input) {
        const len = this.parkingSlots.length;
        if (this.capacity > 0) {
            let carNumber;
            if (this.findNearestAvailableSlot(this.parkingSlots) == true) {
                for (let i = 0; i < len; i++) {
                    if (this.parkingSlots[i] == null) {
                        carNumber = input.split(" ")[1];
                        this.parkingSlots[i] = carNumber;
                        i = i + 1;
                        return i;
                    }
                }
            } else {
                throw new Error("Sorry, parking lot is full");
            }
        } else {
            throw new Error("Please create parking lot first");
        }
    }

    /**
     *
     * @param {String} input user's input via terminal
     * @description it makes the slot free for the car of given registration number.
     * It throws an error if car is not found.
     */
    leaveCar(input) {
        if (this.capacity > 0) {
            const carNumber = input.split(" ")[1];
            const hours = input.split(" ")[2];
            if (carNumber && hours) {
                const isCarParked = this.parkingSlots.includes(carNumber);
                let charge = this.getCharge(hours);
                if (isCarParked) {
                    for (let i = 0; i < this.capacity; i++) {
                        if (this.parkingSlots[i] === carNumber) {
                            this.parkingSlots[i] = null;
                            return {
                                carNumber: carNumber, 
                                slot: i + 1, 
                                charge: charge
                            };
                        }
                    }
                } else {
                    throw new Error(
                        `Registration number ${carNumber} not found`
                    );
                }
            } else {
                throw new Error(
                    "Please provide both registration number and parking duration (hour)"
                );
            }
        } else {
            throw new Error("Please create parking lot first");
        }
    }

    /**
     * @description Returns an array containing parking details i.e. slot no and registration number
     */
    getParkingStatus() {
        let arr = new Array();
        if (this.capacity > 0) {
            arr.push("Slot No.    Registration No.");

            for (let i = 0; i < this.parkingSlots.length; i++) {
                if (this.parkingSlots[i] != null) {
                    let e = i + 1;
                    arr.push(e + "    " + this.parkingSlots[i]);
                }
            }
            return arr;
        } else {
            throw new Error("Please create parking lot first");
        }
    }

    /**
     * @description returns the nearest available slot
     * used by parkCar() method to find nearest slot
     */
    findNearestAvailableSlot() {
        let ele = false;
        for (let i = 0; i < this.parkingSlots.length; i++) {
            if (this.parkingSlots[i] == null) {
                ele = true;
            }
        }
        return ele;
    }

    /**
     * @description returns the parking charge
     * used by leaveCar() method to find get parking charge
     */
    getCharge(hour) {
        let charge = 10;
        let extHour = hour - 2;
        if (extHour > 0) {
            charge += extHour * 10;
        }
        return charge;
    }
}

module.exports = ParkingLot;
