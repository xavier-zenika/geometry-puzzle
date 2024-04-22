import { isInsideShape } from "./isInsideShape";
import { validateCoordinate } from "./validationCoordinate";

describe("validateCoordinate - Parameterized Tests", () => {
  describe.each([
    [
      [
        { x: 1, y: 2 },
        { x: 3, y: 4 },
      ],
      { x: 1, y: 2 },
      false,
      "duplicate found",
      "rejects duplicate coordinates",
    ],
    [
      [
        { x: 0, y: 0 },
        { x: 5, y: 0 },
        { x: 5, y: 5 },
      ],
      { x: 4, y: -1 },
      false,
      "non-convex shape formed",
      "rejects non-convex shape addition",
    ],
  ])(
    "validateCoordinate - %s",
    (
      existingCoords,
      newCoord,
      expectedSuccess,
      expectedReason,
      description
    ) => {
      test(description, () => {
        const result = validateCoordinate(existingCoords, newCoord);
        expect(result.success).toBe(expectedSuccess);
        expect(result.reason).toContain(expectedReason);
      });
    }
  );

  // Test for valid additions
  test.each([
    [
      [
        { x: 0, y: 0 },
        { x: 5, y: 0 },
        { x: 5, y: 5 },
      ],
      { x: 0, y: 5 },
      true,
      "accepts valid coordinate for convex shape",
    ],
  ])("%s", (existingCoords, newCoord, expectedSuccess, description) => {
    const result = validateCoordinate(existingCoords, newCoord);
    expect(result.success).toBe(expectedSuccess);
  });

  test.each([
    [
      [{ x: 0, y: 0 }],
      // Deliberately test for invalid input types
      { x: null, y: "invalid" } as any,
      false,
      "Invalid input types",
      "gracefully handles incorrect input types",
    ],
  ])("%s", (existingCoords, newCoord, expectedSuccess, expectedReason) => {
    const result = validateCoordinate(existingCoords, newCoord);
    expect(result.success).toBe(expectedSuccess);
    expect(result.reason).toBe(expectedReason);
  });
});
