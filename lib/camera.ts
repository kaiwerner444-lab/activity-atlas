import { interpolateZoom } from 'd3-interpolate'
import { zoomIdentity, type ZoomTransform } from 'd3-zoom'

// The camera is stored the way the map thinks about it (a centre and a
// half-height in world units) and converted to a d3 zoom transform at the edge.
// Keeping the world-unit form is what lets label sizes stay fixed in screen
// pixels: everything renders through the viewBox rather than through a scaled
// group, so text never inherits the zoom.

export interface Camera {
  cx: number
  cy: number
  /** Half-height of the visible world region. */
  h: number
}

export interface Viewport {
  w: number
  h: number
}

export function cameraFromTransform(t: ZoomTransform, view: Viewport): Camera {
  return {
    h: view.h / (2 * t.k),
    cx: (view.w / 2 - t.x) / t.k,
    cy: (view.h / 2 - t.y) / t.k,
  }
}

export function transformFromCamera(cam: Camera, view: Viewport): ZoomTransform {
  const k = view.h / (2 * cam.h)
  return zoomIdentity.translate(view.w / 2 - cam.cx * k, view.h / 2 - cam.cy * k).scale(k)
}

/**
 * How long a flight between two views should take.
 *
 * d3's interpolateZoom implements van Wijk and Nuij's optimal zoom path, where
 * the apparent velocity of the content stays constant instead of the scale
 * changing linearly. It reports the path length of that trajectory, which is a
 * far better basis for a duration than a fixed number: a hop to a neighbour
 * finishes quickly, a jump across the atlas gets the time it needs.
 */
export function flightDuration(from: Camera, to: Camera, view: Viewport): number {
  const aspect = view.w / Math.max(view.h, 1)
  const i = interpolateZoom(
    [from.cx, from.cy, from.h * 2 * aspect],
    [to.cx, to.cy, to.h * 2 * aspect],
  )
  return Math.min(900, Math.max(220, i.duration * 0.55))
}

/**
 * d3-zoom's wheel normalisation, which is the only part of this that is genuinely
 * hard. Pixel, line and page delta modes all report wildly different magnitudes,
 * and every browser disagrees; a trackpad emits a stream of small deltas where a
 * mouse emits one large one. Trackpad pinch arrives as a wheel event with
 * ctrlKey set, a de facto standard Chrome introduced and everyone copied, and
 * needs a much larger multiplier to feel one to one with the fingers.
 *
 * GAIN is the one number worth tuning. d3's default is calibrated for panning a
 * map at a roughly constant scale; a taxonomy has a twelvefold jump between
 * seeing all twenty domains and seeing inside one, and wants to cross that in
 * about two notches rather than five.
 */
const GAIN = 5

export function wheelDelta(event: WheelEvent): number {
  const perMode = event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002
  return -event.deltaY * perMode * (event.ctrlKey ? 10 : 1) * GAIN
}
