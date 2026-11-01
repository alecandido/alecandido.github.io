/* Geometry of the horizon scene, shared with the wanderer that explores it. */

/** Scene box: the viewport covers it like `xMidYMid slice`. */
export const W = 1600;
export const H = 1000;
/** Height of the horizon line and of the vanishing point. */
export const HORIZON = 560;
export const SUN = { x: W / 2, y: HORIZON - 60, r: 260 };
/** Floor: a point at depth z (1 = nearest) sits at y = HORIZON + DEPTH / z. */
export const DEPTH = 440;

/** The scale from scene units to CSS pixels, as `--u` in scene.css. */
export function unit(width: number, height: number) {
  return Math.max(width / W, height / H);
}
