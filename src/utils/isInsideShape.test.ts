import { isInsideShape } from "./isInsideShape";

describe("isInsideShape", () => {
  test.each([
    // Define a simple square shape for testing
    {
      shape: [
        { x: 0, y: 0 },
        { x: 10, y: 0 },
        { x: 10, y: 10 },
        { x: 0, y: 10 },
      ],
      testPoints: [
        {
          point: { x: 5, y: 5 },
          expected: true,
          description: "inside the shape",
        },
        {
          point: { x: 15, y: 5 },
          expected: false,
          description: "outside the shape",
        },
        {
          point: { x: 10, y: 5 },
          expected: true,
          description: "on an edge of the shape",
        },
        {
          point: { x: 0, y: 0 },
          expected: true,
          description: "on a vertex of the shape",
        },
        {
          point: { x: 5, y: 10 },
          expected: true,
          description: "on a horizontal edge of the shape",
        },
      ],
    },
  ])(
    "with $shape and test point $testPoints.point being $testPoints.description",
    ({ shape, testPoints }) => {
      testPoints.forEach(({ point, expected }) => {
        const result = isInsideShape(shape, point);
        expect(result).toBe(expected);
      });
    }
  );
});
