import { Coordinate } from "./types";

function isOnHorizontalBoundary(
  coordinates: Coordinate[],
  testCoordinate: Coordinate
): boolean {
  return coordinates.some(({ x: xi, y: yi }, index) => {
    const { x: xj, y: yj } = coordinates[(index + 1) % coordinates.length];
    return (
      yi === yj &&
      yi === testCoordinate.y &&
      testCoordinate.x >= Math.min(xi, xj) &&
      testCoordinate.x <= Math.max(xi, xj)
    );
  });
}

function isOnVerticalBoundary(
  coordinates: Coordinate[],
  testCoordinate: Coordinate
): boolean {
  return coordinates.some(({ x: xi, y: yi }, index) => {
    const { x: xj, y: yj } = coordinates[(index + 1) % coordinates.length];
    return (
      xi === xj &&
      xi === testCoordinate.x &&
      testCoordinate.y >= Math.min(yi, yj) &&
      testCoordinate.y <= Math.max(yi, yj)
    );
  });
}

function doesRayIntersectEdge(
  testCoordinate: Coordinate,
  edgeStart: Coordinate,
  edgeEnd: Coordinate
): boolean {
  const { x: xi, y: yi } = edgeStart;
  const { x: xj, y: yj } = edgeEnd;

  const isPointAboveStart = yi > testCoordinate.y;
  const isPointAboveEnd = yj > testCoordinate.y;
  const isPointBetweenVertically = isPointAboveStart !== isPointAboveEnd;

  if (!isPointBetweenVertically) return false;

  const edgeSlope = (xj - xi) / (yj - yi);
  const xIntersection = xi + (testCoordinate.y - yi) * edgeSlope;

  return testCoordinate.x < xIntersection;
}

export function isInsideShape(
  coordinates: Coordinate[],
  testCoordinate: Coordinate
): boolean {
  if (
    isOnHorizontalBoundary(coordinates, testCoordinate) ||
    isOnVerticalBoundary(coordinates, testCoordinate)
  ) {
    return true;
  }

  let inside = false;
  for (let i = 0, j = coordinates.length - 1; i < coordinates.length; j = i++) {
    const edgeStart = coordinates[j];
    const edgeEnd = coordinates[i];

    if (doesRayIntersectEdge(testCoordinate, edgeStart, edgeEnd)) {
      inside = !inside;
    }
  }

  return inside;
}
