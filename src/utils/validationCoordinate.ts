import { isShapeConvex } from "./isShapeConvex";
import { Coordinate } from "./types";

interface ValidateCoordinateResult {
  success: boolean;
  reason?: string;
  coordinates?: Coordinate[];
}

export function validateCoordinate(
  coordinates: Coordinate[],
  testCoordinates: Coordinate
): ValidateCoordinateResult {
  if (
    typeof testCoordinates.x !== "number" ||
    typeof testCoordinates.y !== "number" ||
    isNaN(testCoordinates.x) || // Also checks for NaN which is technically of type 'number'
    isNaN(testCoordinates.y)
  ) {
    return { success: false, reason: "Invalid input types" };
  }
  const isDuplicate = coordinates.some((coord) => {
    return coord.x === testCoordinates.x && coord.y === testCoordinates.y;
  });

  if (isDuplicate) {
    return {
      success: false,
      reason: `New coordinates(${testCoordinates.x},${testCoordinates.y}) are invalid!!! (duplicate found)`,
    };
  }

  // Temporarily add newCoordinate for convexity check
  const tempCoordinates = [...coordinates, testCoordinates];

  // Check if shape remains convex
  if (!isShapeConvex(tempCoordinates)) {
    return {
      success: false,
      reason: `New coordinates(${testCoordinates.x},${testCoordinates.y}) are invalid!!! (non-convex shape formed)`,
    };
  }

  return { success: true, coordinates: tempCoordinates };
}
