/*
 * Geometry of the horizon scene, shared with the wanderer that explores it,
 * and the scroll of its floor.
 */

/** Scene box: the viewport covers it like `xMidYMid slice`. */
export const W = 1600;
export const H = 1000;
/** Height of the horizon line and of the vanishing point. */
export const HORIZON = 560;
export const SUN = { x: W / 2, y: HORIZON - 60, r: 260 };
/** Floor: a point at depth z (1 = bottom of the scene) sits at y = HORIZON + DEPTH / z. */
export const DEPTH = 440;
/** Floor grid: rows, columns and their spacing where their feet are, at y = foot. */
export const FLOOR = { rows: 14, columns: 21, gap: 160, foot: H + 200, power: 2.2 };
/** Depth of the row holding the column feet. */
export const FOOT_DEPTH = DEPTH / (FLOOR.foot - HORIZON);

/** The scale from scene units to CSS pixels, as `--u` in scene.css. */
export function unit(width: number, height: number) {
  return Math.max(width / W, height / H);
}

/**
 * How far the floor has scrolled, as sawtooth waves: the column feet shifted
 * sideways within one gap, the rows advanced within one step of their spacing.
 */
export const scroll = $state({ shift: 0, phase: 0 });

/** Heights of the rows: denser near the horizon, each sliding towards the next. */
export function rowHeights(phase: number) {
  return Array.from(
    { length: FLOOR.rows + 1 },
    (_, i) => HORIZON + DEPTH * Math.pow(i / FLOOR.rows + phase, FLOOR.power)
  );
}

/** Offsets of the column feet from the vanishing point, one extra to fill the shift. */
export function columnFeet(shift: number) {
  return Array.from({ length: FLOOR.columns + 1 }, (_, i) => -W + i * FLOOR.gap + shift);
}

/** Row phase gained per unit of depth travelled by the floor, for a walker at depth z. */
export function rowPace(z: number) {
  const t = Math.pow(z, -1 / FLOOR.power);
  return 1 / (FLOOR.power * z * z * Math.pow(t, FLOOR.power - 1));
}
