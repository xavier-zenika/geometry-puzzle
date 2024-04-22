# Geometry Puzzle

The Geometry Puzzle is a command-line application written in Typescript designed to create custom geometric shapes and solve puzzles related to them.

### Features

- `Puzzle.ts`: : Contains the `Puzzle` class responsible for user interaction, creating custom shapes, and initiating the puzzle-solving interface.
- `utils/validateCoordinate.ts`: Contains the logic for validating the coordinates of a custom shape.
- `utils/isInsideShape.ts`: Contains the logic for checking if a given point is inside a shape.
- `utils/isShapeConvex.ts`: Contains the `isShapeConvex` utility used to ensure that a shape maintains convexity after each coordinate addition.

The design assumes a 2D Cartesian coordinate system, where coordinates are input as `x y` pairs. Convexity is determined using the cross-product method.

### Environment

This application was developed on macOS, but it should run on any Windows environment with Node.js installed.

### Prerequisites

- Node.js (v12.0.0 or higher)
- npm (usually comes with Node.js)

### Libraries used

- `readline`: For reading input from the command line
- `jest`: For unit testing the application
- Typescript-related libraries (`typescript`, `ts-node`,`@types/node`) for language enhancement

### Setup and Running the Application on Windows

This application was developed and tested on a machine running macOS. These steps are for setting up and running the app on Windows devices.

1. **Install Node.js and npm**
   Download and install Node.js from the [official website](https://nodejs.org/en). This will also install `npm`

2. **Clone/extract the repository**
   Clone or unzip (if in .zip format) the source code to your local machine.

   ```bash
   cd geometry-puzzle
   ```

3. **Install dependencies**
   Run the following command in the root directory of the project to install the necessary development dependencies:
   ```bash
   npm install
   ```
4. **Compile Typescript**
   Compile the TypeScript code to JavaScript using the TypeScript compiler. The `ts-node` package can be used to execute TypeScript files directly.

5. **Start the application**
   Use the npm script provided to start the application:

   ```bash
   npm start
   ```

6. **Running tests**
   To run the unit tests, use the following npm script:
   ```bash
   npm test
   ```

### Running the Application without Installation

If you prefer not to install the application, you can use `npx` to run it directly without a global installation:

```bash
npx ts-node ./Puzzle.ts
```

This will execute the application using `ts-node` which compiles and executes TypeScript on the fly.

### Screenshots

As stated in the Instructions document, sufficient evidence that the solution is complete should be provided in the form of visual screenshots of the running program. These screenshots can be found in the root of the project inside the folder named `Geometry Puzzle Screenshots`.

For further details or troubleshooting, refer to the Node.js documentation or contact the application developer.
