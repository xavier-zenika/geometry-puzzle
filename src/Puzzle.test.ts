jest.mock("readline", () => {
  return {
    createInterface: jest.fn().mockReturnValue({
      question: jest.fn((prompt, callback) => callback("1 2")),
      close: jest.fn(),
    }),
  };
});

import Puzzle from "./Puzzle";

describe("GeometryPuzzle", () => {
  let puzzle: Puzzle;

  beforeEach(() => {
    puzzle = new Puzzle();
    const inputs = ["1", "1 2", "3 4", "3 2", "#", "1 2", "#"];
    let inputIndex = 0;
    (puzzle.rl.question as jest.Mock).mockImplementation((prompt, callback) => {
      callback(inputs[inputIndex++] || "#");
    });
  });

  afterEach(() => {
    puzzle.rl.close();
  });

  test("is correctly initialized", () => {
    expect(puzzle.coordinates).toEqual([]);
  });

  describe("Custom Shape Creation", () => {
    test("accepts valid coordinate inputs and updates shape", async () => {
      await puzzle.createCustomShape();
      expect(puzzle.coordinates.length).toBe(3);
      expect(puzzle.coordinates[0]).toEqual({ x: 1, y: 2 });
    });
  });

  describe("Random Shape Generation", () => {
    test("generates a shape with the correct number of coordinates", () => {
      puzzle.generateRandomShape();
      expect(puzzle.coordinates.length).toBeGreaterThanOrEqual(3);
      expect(puzzle.coordinates.length).toBeLessThanOrEqual(8);
    });
  });
});
