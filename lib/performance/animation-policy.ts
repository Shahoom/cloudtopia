export type AnimationSignals = {
  enabled: boolean
  inViewport: boolean
  documentVisible: boolean
  reducedMotion: boolean
}

export const shouldRunAnimation = (s: AnimationSignals) =>
  s.enabled && s.inViewport && s.documentVisible && !s.reducedMotion
