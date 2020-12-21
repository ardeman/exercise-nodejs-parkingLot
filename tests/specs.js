const assert = require("chai").assert;
const fs = require("fs");
const Parking = require("../models/parkingLot.js");

let commands = [];
let totalParkings;
let parkingLot = new Parking();

// test specs for unit testing the methods in Parking Lot class
describe("Test for reading input test data", function () {
    it("reading input.txt", function (done) {
        fs.readFile("./functional_spec/fixtures/file_input.txt", "utf-8", function (err, data) {
            if (err) {
                throw "Unable to read input test file";
            }
            commands = JSON.parse(JSON.stringify(data)).split("\n");
            done();
        });
    });

    it("checking commands", function (done) {
        assert.equal(commands[0].split(" ")[0], "create_parking_lot");
        assert.equal(commands[1].split(" ")[0], "park");
        assert.equal(commands[7].split(" ")[0], "leave");
        assert.equal(commands[8], "status");
        done();
    });
});

// unit tests for functions in ParkingLot class
describe("Testing Functions in ParkingLot class", function () {
    it("Creating a Parking lot", function (done) {
        totalParkings = parkingLot.createParkingLot(commands[0]);
        assert.equal(totalParkings, 6);
        done();
    });

    it("Allocating Parking to User 1", function (done) {
        var ele = parkingLot.parkCar(commands[1]);
        assert.equal(ele, 1, "these numbers are equal");
        done();
    });

    it("Allocating Parking to User 2", function (done) {
        var ele = parkingLot.parkCar(commands[2]);
        assert.equal(ele, 2);
        done();
    });

    it("Allocating Parking to User 3", function (done) {
        var ele = parkingLot.parkCar(commands[3]);
        assert.equal(ele, 3);
        done();
    });

    it("Allocating Parking to User 4", function (done) {
        var ele = parkingLot.parkCar(commands[4]);
        assert.equal(ele, 4);
        done();
    });

    it("Allocating Parking to User 5", function (done) {
        var ele = parkingLot.parkCar(commands[5]);
        assert.equal(ele, 5);
        done();
    });

    it("Allocating Parking to User 6", function (done) {
        var ele = parkingLot.parkCar(commands[6]);
        assert.equal(ele, 6);
        done();
    });

    it("User 6 leaving. With parking charge 30", function (done) {
        var ele = parkingLot.leaveCar(commands[7]);
        assert.include(ele, {
            carNumber: "KA-01-HH-3141",
            slot: 6,
            charge: 30,
        });
        done();
    });

    it("Checking status", function (done) {
        var ele = parkingLot.getParkingStatus();
        assert.equal(ele.length, 6);
        done();
    });

    it("Allocating Parking to User 7. Should Reallocate the nearest empty postion 6", function (done) {
        var ele = parkingLot.parkCar(commands[9]);
        assert.equal(ele, 6);
        assert.notEqual(ele, 7);
        done();
    });

    it("Allocating Parking to User 8. Should indicate Parking is full.", function (done) {
        try {
            var ele = parkingLot.parkCar(commands[10]);
        } catch (err) {
            assert.notEqual(ele, 7);
        }
        done();
    });

    it("User 1 leaving. With parking charge 30", function (done) {
        var ele = parkingLot.leaveCar(commands[11]);
        assert.include(ele, {
            carNumber: "KA-01-HH-1234",
            slot: 1,
            charge: 30,
        });
        done();
    });

    it("User 3 leaving. With parking charge 50", function (done) {
        var ele = parkingLot.leaveCar(commands[12]);
        assert.include(ele, {
            carNumber: "KA-01-BB-0001",
            slot: 3,
            charge: 50,
        });
        done();
    });

    it("User 8 leaving. Should indicate User not found.", function (done) {
        try {
            var ele = parkingLot.leaveCar(commands[13]);
        } catch (err) {
            assert.isNotObject(ele);
        }
        done();
    });

    it("Allocating Parking to User 9. Should Reallocate the nearest empty postion 1", function (done) {
        var ele = parkingLot.parkCar(commands[14]);
        assert.equal(ele, 1);
        assert.notEqual(ele, 7);
        done();
    });

    it("Allocating Parking to User 10. Should Reallocate the nearest empty postion 3", function (done) {
        var ele = parkingLot.parkCar(commands[15]);
        assert.equal(ele, 3);
        assert.notEqual(ele, 7);
        done();
    });

    it("Allocating Parking to User 11. Should indicate Parking is full.", function (done) {
        try {
            var ele = parkingLot.parkCar(commands[10]);
        } catch (err) {
            assert.notEqual(ele, 7);
        }
        done();
    });

    it("Checking status", function (done) {
        var ele = parkingLot.getParkingStatus();
        assert.equal(ele.length, 7);
        done();
    });

});
