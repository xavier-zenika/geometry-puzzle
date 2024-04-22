import { isShapeConvex } from "./isShapeConvex";
import { Coordinate } from "./types";

describe("isShapeConvex", () => {
  test("identifies a convex shape correctly", () => {
    // A square, which is convex
    const convexShape: Coordinate[] = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
    ];
    expect(isShapeConvex(convexShape)).toBe(true);
  });

  test("identifies a non-convex shape correctly", () => {
    // An L-shape, which is non-convex
    const nonConvexShape: Coordinate[] = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 0, y: 2 },
    ];
    expect(isShapeConvex(nonConvexShape)).toBe(false);
  });

  test("identifies a convex shape with more complex geometry correctly", () => {
    // A pentagon, which is convex
    const complexConvexShape: Coordinate[] = [
      { x: 0, y: 0 },
      { x: 3, y: 0 },
      { x: 4, y: 2 },
      { x: 1.5, y: 3 },
      { x: -1, y: 2 },
    ];
    expect(isShapeConvex(complexConvexShape)).toBe(true);
  });
});
