import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { shouldRunAnimation } from '../lib/performance/animation-policy.ts'
import { createFrameLoop } from '../lib/performance/animation-runtime.ts'

test('animation policy requires every activity signal', () => {
  assert.equal(shouldRunAnimation({ enabled: true, inViewport: true, documentVisible: true, reducedMotion: false }), true)
  assert.equal(shouldRunAnimation({ enabled: true, inViewport: false, documentVisible: true, reducedMotion: false }), false)
  assert.equal(shouldRunAnimation({ enabled: true, inViewport: true, documentVisible: false, reducedMotion: false }), false)
  assert.equal(shouldRunAnimation({ enabled: true, inViewport: true, documentVisible: true, reducedMotion: true }), false)
})

test('frame loop owns exactly one scheduled frame and disposes idempotently', () => {
  let nextId = 0
  const queued = new Map<number, FrameRequestCallback>()
  const cancelled: number[] = []
  const loop = createFrameLoop(() => undefined, {
    request: (callback) => (queued.set(++nextId, callback), nextId),
    cancel: (id) => { cancelled.push(id); queued.delete(id) },
  })
  loop.start()
  loop.start()
  assert.equal(queued.size, 1)
  loop.stop()
  assert.deepEqual(cancelled, [1])
  loop.dispose()
  loop.dispose()
  assert.equal(queued.size, 0)
})

test('WebGL canvases use visibility and reduced-motion activity', () => {
  for (const file of ['components/ui/3d-gallery.tsx', 'components/ui/reveal-wave-image.tsx']) {
    const code = readFileSync(file, 'utf8')
    assert.match(code, /useAnimationActivity/, file)
    assert.match(code, /frameloop=\{active \? ['"]always['"] : ['"]never['"]\}/, file)
  }
})

test('3d gallery does not set React state every frame', () => {
  const code = readFileSync('components/ui/3d-gallery.tsx', 'utf8')
  const frameBody = code.match(/useFrame\([\s\S]*?\n\s*}\)/)?.[0] ?? ''
  assert.doesNotMatch(frameBody, /setScroll|setVelocity/)
})

test('cursor effects cancel frames and remove listeners directly from effects', () => {
  const tech = readFileSync('components/ui/tech-cursor.tsx', 'utf8')
  const social = readFileSync('components/ui/hero-designali.tsx', 'utf8')
  assert.match(tech, /cancelAnimationFrame/)
  assert.doesNotMatch(tech, /loadImages\(\)\.then\([\s\S]*return \(\) =>/)
  assert.match(social, /return \(\) =>/)
  assert.match(social, /cancelAnimationFrame/)
  assert.doesNotMatch(social, /let ctx: CanvasRenderingContext2D \| null = null/)
})
