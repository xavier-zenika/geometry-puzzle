import readline = require("readline");
import { Coordinate } from "./utils/types";
import { validateCoordinate } from "./utils/validationCoordinate";
import { isInsideShape } from "./utils/isInsideShape";

export default class Puzzle {
  public _coordinates: Coordinate[];
  public readonly rl: readline.Interface;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this._coordinates = [];
  }

  private log(message: string): void {
    console.log(message);
  }

  public get coordinates(): Coordinate[] {
    return this._coordinates;
  }

  // acts as a setter
  public addCoordinate(coordinate: Coordinate): void {
    const validationResult = validateCoordinate(this._coordinates, coordinate);
    if (validationResult.success) {
      this._coordinates.push(coordinate);
    } else {
      this.log(validationResult.reason);
    }
  }

  public prompt(message: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(message, resolve);
    });
  }

  public async createCustomShape(): Promise<void> {
    this.log("Creating custom shape...");
    let coordinateCount = 1;

    while (true) {
      const xInput = await this.prompt(
        `Please enter coordinate ${coordinateCount} in x y format: `
      );
      if (xInput === "#") break;

      const [xStr, yStr] = xInput.split(" ").map((str) => str.trim());
      const x = parseFloat(xStr);
      const y = parseFloat(yStr);

      if (isNaN(x) || isNaN(y)) {
        this.log("Invalid input! Please enter numbers.");
        continue;
      }
      const coordinate: Coordinate = { x, y };

      const validationResult = validateCoordinate(
        this._coordinates,
        coordinate
      );

      if (!validationResult.success) {
        this.log(validationResult.reason);
        continue;
      }

      this.addCoordinate(coordinate);
      this.log(`Coordinate ${coordinateCount} added: (${x}, ${y})`);
      coordinateCount++;

      const isIncomplete = this._coordinates.length < 3;
      if (isIncomplete) {
        this.log("Your current shape is incomplete");
      } else {
        this.log("Your current shape is valid and complete");
        this.log(
          `Please enter # to finalize your shape or enter coordinate ${coordinateCount} in x y format: `
        );
      }
      this.printCoordinates();
    }

    if (this._coordinates.length > 0) {
      this.log("Your finalized shape is:");
      this.printCoordinates();
    } else {
      this.log("No valid shape was created.");
    }

    this.log(
      "Please key in test coordinates in x y format or enter # to quit the game"
    );
    await this.startPuzzle();
  }

  public generateRandomShape(): void {
    this.log("Generating random shape...");
    const numCoordinates = Math.floor(Math.random() * 6) + 3;
    for (let i = 0; i < numCoordinates; i++) {
      this.addCoordinate({
        x: Math.floor(Math.random() * 10) + 1,
        y: Math.floor(Math.random() * 10) + 1,
      });
    }

    this.log("Your random shape is:");
    this.printCoordinates();
    this.log(
      "Please key in test coordinates in x y format or enter # to quit the game"
    );
    this.startPuzzle();
  }

  public printCoordinates(): void {
    this.coordinates.forEach((coordinate, index) => {
      this.log(`${index + 1}:(${coordinate.x},${coordinate.y})`);
    });
  }

  public async startPuzzle(): Promise<void> {
    while (true) {
      const userInput = await this.prompt("");
      if (userInput === "#") {
        this.log("Thank you for playing the GIC geometry puzzle app");
        this.log("Have a nice day!");
        return;
      }

      const [xStr, yStr] = userInput.split(" ").map((str) => str.trim());
      const x = parseFloat(xStr);
      const y = parseFloat(yStr);

      if (isNaN(x) || isNaN(y)) {
        this.log("Invalid input! Please enter numbers.");
        continue;
      }

      const isInside = isInsideShape(this.coordinates, { x, y });
      if (isInside) {
        this.log(`Coordinates (${x} ${y}) is within your finalized shape`);
      } else {
        this.log(
          `Sorry, coordinates (${x} ${y}) is outside of your finalized shape`
        );
      }
    }
  }

  async start(): Promise<void> {
    this.log("Welcome to the GIC geometry puzzle app");
    this.log("[1] Create a custom shape");
    this.log("[2] Generate a random shape");
    this.log("[#] Quit the game");

    const choice = await this.prompt("Please enter your choice: ");

    if (choice === "1") {
      await this.createCustomShape();
    } else if (choice === "2") {
      this.generateRandomShape();
    } else if (choice === "#") {
      this.log("Thank you for playing the GIC geometry puzzle app");
      this.log("Have a nice day!");
      return;
    } else {
      this.log("Invalid choice! Please enter 1, 2, or #.");
      this.start();
    }
  }
}

const puzzle = new Puzzle();
puzzle.start();
