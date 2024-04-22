import { Coordinate } from "./types";

export function isShapeConvex(coordinates: Coordinate[]) {
  // A polygon is convex if all turns are in the same direction
  // For simplicity, we'll use the sign of the z-component of the cross product of consecutive edges to determine this
  let prevSign = 0;

  for (let i = 0; i < coordinates.length; i++) {
    const curr = coordinates[i];
    const next = coordinates[(i + 1) % coordinates.length];
    const afterNext = coordinates[(i + 2) % coordinates.length];

    // Compute the cross product of the edges (curr, next) and (next, afterNext)
    const crossProductZ =
      (next.x - curr.x) * (afterNext.y - next.y) -
      (next.y - curr.y) * (afterNext.x - next.x);
    const currentSign = Math.sign(crossProductZ);

    // If currentSign is zero, it means the points are collinear; in this case, continue
    if (currentSign === 0) {
      continue;
    }

    // If prevSign is not set yet, set it to the current sign
    if (prevSign === 0) {
      prevSign = currentSign;
    } else if (prevSign !== currentSign) {
      // If the current sign is different from the previous, the polygon is not convex
      return false;
    }
  }

  return true;
}