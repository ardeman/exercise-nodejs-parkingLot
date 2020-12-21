#!/usr/bin/env node
const fs = require("fs");
const readLine = require("readline");

let commandLineInputs = process.argv; // processing command line inputs
let interactiveMode = false;

/**
 * @description importing the parkingLot class
 */
const Parking = require("./models/parkingLot.js");
let parkingLot = new Parking();

// to avoid memory leaks errors, default max listeners = 10
require("events").EventEmitter.defaultMaxListeners = 0;

if (commandLineInputs[commandLineInputs.length - 1].endsWith(".txt")) {
    interactiveMode = false;
    fs.readFile(commandLineInputs[2], "utf-8", function (err, data) {
        if (err) {
            console.log("Error in reading file");
        }
        const arr = data.split("\n");
        for (let i = 0; i < arr.length; i++) {
            processUserCommands(arr[i]);
        }

        // returning to console once all the inputs are processed
        process.exit(1);
    });
} else {
    interactiveMode = true;
    openInteractiveConsole();
}

/**
 * @description called when users want to interact via console
 * it process one command at a time
 */
function openInteractiveConsole() {
    let prompts = readLine.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false,
    });

    // option for user to enter commands
    if (interactiveMode) {
        prompts.question("Input: ", function (data) {
            processUserCommands(data);
        });
    }
}

/**
 *
 * @param {String} input entered via console
 * @description driver function for different commands for entered by users
 * calls respective functions of ParkingLot class based on commands
 */
function processUserCommands(input) {
    const userCommand = input.split(" ")[0];
    let totalParkingSlots;
    let parkingSlotNumber;
    switch (userCommand) {
        case "create_parking_lot":
            try {
                totalParkingSlots = parkingLot.createParkingLot(input);
                console.log(
                    `Created parking lot with ${totalParkingSlots} slots`
                );
            } catch (err) {
                console.log(err.message);
            }
            break;
        case "park":
            try {
                parkingSlotNumber = parkingLot.parkCar(input);
                console.log("Allocated slot number: " + parkingSlotNumber);
            } catch (err) {
                console.log(err.message);
            }
            break;
        case "leave":
            try {
                parkingSlotNumber = parkingLot.leaveCar(input);
                console.log("Slot number " + parkingSlotNumber + " is free.");
            } catch (err) {
                console.log(err.message);
            }
            break;
        case "status":
            try {
                let parkingSlotStatus = parkingLot.getParkingStatus();
                if (parkingSlotStatus.length > 1) {
                    console.log(parkingSlotStatus.join("\n"));
                } else {
                    console.log("Sorry, parking lot is empty");
                }
            } catch (err) {
                console.log(err.message);
            }
            break;
        case "exit":
            process.exit(0);
            break;
        default:
            console.log(input, "is an invalid command");
            break;
    }
    openInteractiveConsole();
}