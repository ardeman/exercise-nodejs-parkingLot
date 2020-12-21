#!/usr/bin/env node
const fs = require("fs"),
    readLine = require("readline");

var commandLineInputs = process.argv, // processing command line inputs
    interactiveMode = false;

// to avoid memory leaks errors, default max listeners = 10
require("events").EventEmitter.defaultMaxListeners = 0;

if (commandLineInputs[commandLineInputs.length - 1].endsWith(".txt")) {
    interactiveMode = false;
    fs.readFile(commandLineInputs[2], "utf-8", function (err, data) {
        if (err) {
            console.log("Error in reading file");
        }
        var arr = data.split("\n");
        for (var i = 0; i < arr.length; i++) {
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
    var prompts = readLine.createInterface({
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