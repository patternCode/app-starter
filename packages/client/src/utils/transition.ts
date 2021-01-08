export function transitionDuration(
  top: number,
  prevTop: number,
  now: number,
  past: number
) {
  const dScrollTop = top - prevTop;
  const dTime = now - past;
  const scrollVelocity = dScrollTop / dTime;
  return Math.min(300, Math.max(0, (top - prevTop) / scrollVelocity));
}
