export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function clamp(v, min = 0, max = 1) {
  return Math.min(max, Math.max(min, v));
}

export function damp(current, target, lambda, dt) {
  return lerp(current, target, 1 - Math.exp(-lambda * dt));
}
