/**
 * @description a base class for Parking lot
 * @author Ardeman <ardeman.com>
 */
class ParkingLot {
    constructor() {
        this.MAX_PARKING_SLOTS = 0; // maximum parking slots allowed
        this.parkingSlots = new Array(); // array for parking slots
    }

    /**
     *
     * @param {String} input user's input via terminal
     * @description creates a parking lot with given maximum slot numbers.
     * It throws an error if zero or negative input is provided
     */
    createParkingLot(input) {
        this.MAX_PARKING_SLOTS = parseInt(input.split(" ")[1]);
        if (this.MAX_PARKING_SLOTS <= 0) {
            // minimum: 1 slot
            throw new Error(
                "Minimum one slot is required to create parking slot"
            );
        }
        for (let i = 0; i < this.MAX_PARKING_SLOTS; i++) {
            this.parkingSlots.push(null);
        }
        return this.MAX_PARKING_SLOTS;
    }

    /**
     *
     * @param {String} input user's input via terminal
     * @description allocates nearest slot number to incoming cars.
     * It throws an error if parking lot is empty or full.
     */
    parkCar(input) {
        const len = this.parkingSlots.length;
        if (this.MAX_PARKING_SLOTS > 0) {
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
            throw new Error("Sorry, no slot available");
        }
    }

    /**
     *
     * @param {String} input user's input via terminal
     * @description it makes the slot free for the car of given registration number.
     * It throws an error if car is not found.
     */
    leaveCar(input) {
        if (this.MAX_PARKING_SLOTS > 0) {
            let carNumber = input.split(" ")[1];
            let isCarParked = this.parkingSlots.includes(carNumber);
            if(isCarParked) {
                for (let i = 0; i < this.MAX_PARKING_SLOTS; i++) {
                    if (this.parkingSlots[i] === carNumber) {
                        this.parkingSlots[i] = null;
                        return i + 1;
                    }
                }
            } else {
                throw new Error(`Registration number ${carNumber} not found`);
            }
        } else {
            throw new Error("Sorry, no slot available");
        }
    }

    /**
     * @description Returns an array containing parking details i.e. slot no and registration number
     */
    getParkingStatus() {
        let arr = new Array();
        if (this.MAX_PARKING_SLOTS > 0) {
            arr.push("Slot No.    Registration No.");

            for (let i = 0; i < this.parkingSlots.length; i++) {
                if (this.parkingSlots[i] != null) {
                    let e = i + 1;
                    arr.push(e + "    " + this.parkingSlots[i]);
                }
            }
            return arr;
        } else {
            throw new Error("Sorry, parking lot is empty");
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
}

module.exports = ParkingLot;
