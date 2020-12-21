# Parking Lot

## About Problem

To **design a parking lot system** with ability:

- Automated ticketing.

- Documenting the vehicle regtistration number (car number).

- Allocating an available parking slot to the car before actually handing over a ticket to the driver.

- Calculating total parking charge. Charge applicable is `$10` for first 2 hours and `$10` for every additional hour.

## Pre requisites

The source code for this project is written using [Node.js](https://nodejs.org/). Make sure you have [Node.js](https://nodejs.org/) installed on your computer before running this application, **if not please install Node.js from [nodejs.org](https://nodejs.org/en/download/)**.

To check if you have Node.js and NPM installed by running simple commands to see what version of each is installed:

 - **Test Node.js**: To see if Node is installed, type `node -v` in Terminal. This should print the version number so you’ll see something like this `v10.16.0`.

 - **Test NPM**. To see if NPM is installed, type `npm -v` in Terminal. This should print the version number so you’ll see something like this `6.9.0`.

> **Note:** [Node installer](https://nodejs.org/en/download/) installs both Node.js and npm on your system.

## How to run?

This is a console application written in `Node.js`. This can be run in two modes:

1. **Interactive Mode**: An interactive terminal based shell where commands can be typed in to perform different actions.

2. **File Mode**: It accepts a filename as a parameter at the terminal and read the commands from that file.

### Quick Start

**Proceed to the steps below only if you've `Node.js` installed.** If not, please refer [pre requisites](#pre-requisites) section.

#### For Interactive Mode

Open terminal and navigate (`cd`) to this folder and type the following commands:

```bash
1. npm install
2. npm start
```

#### For File Mode

Open terminal and type:

```bash
1. bin/setup
2. bin/parking_lot <path_to_file.txt>
```

**Note**: You can use a provided sample input file inside `functional_spec/fixtures/file_input.txt` .

## List of User Commands

Users can interact with the Parking Lot system via a following simple set of commands which produce a specific output:

- **create_parking_lot {{CAPACITY}}**:
`create_parking_lot 6` will create a parking lot with 6 slots.

- **park {{CAR NUMBER}}**:
`park KA-01-HH-1234` will allocate the nearest slot from entry gate.

- **leave {{CAR NUMBER}} {{HOURS}}**:
`leave KA-01-HH-3141 4` will free the slot occupied by car with registration number KA-01-HH-3141 and will return parking charge.

- **status**:
`status` will display cars and their slot details

```bash
Slot No.    Registration No.
1    KA-01-HH-1234
2    KA-01-HH-9999
3    KA-01-BB-0001
4    KA-01-HH-7777
5    KA-01-HH-2701
```

- **exit**: `exit` will quit the application and return to the console.

> **NOTE: Any commands which are not mentioned above will throw an error: `<INPUT> is an invalid command`**