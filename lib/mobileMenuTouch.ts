/** Touch movement only controls feedback. Only a stationary native tap may activate. */
export type MenuTouchPoint = { identifier: number; clientX: number; clientY: number };
export type MenuTouchGesture = { id: number; x: number; y: number; key: string | null; moved: boolean; tracking: boolean };
export function beginMenuTouch(point: MenuTouchPoint, count: number, key: string | null): MenuTouchGesture {
  return { id: point.identifier, x: point.clientX, y: point.clientY, key, moved: count !== 1, tracking: count === 1 };
}
export function moveMenuTouch(gesture: MenuTouchGesture, points: readonly MenuTouchPoint[], key: string | null) {
  const point = points.find(p => p.identifier === gesture.id);
  if (!point || points.length !== 1) {
    gesture.moved = true;
    gesture.tracking = false;
    return null;
  }
  if (Math.hypot(point.clientX - gesture.x, point.clientY - gesture.y) > 10 || gesture.key !== key) gesture.moved = true;
  return gesture.tracking ? point : null;
}
export function suppressMenuTouchClick(gesture: MenuTouchGesture | null, clickDetail: number) {
  return clickDetail !== 0 && gesture?.moved === true;
}
