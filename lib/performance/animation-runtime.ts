export type FrameScheduler = {
  request: (callback: FrameRequestCallback) => number
  cancel: (id: number) => void
}

export type FrameLoop = {
  start(): void
  stop(): void
  dispose(): void
  readonly running: boolean
}

const defaultScheduler: FrameScheduler = {
  request: (callback) => requestAnimationFrame(callback),
  cancel: (id) => cancelAnimationFrame(id),
}

/**
 * A requestAnimationFrame loop that owns at most one scheduled frame at a
 * time. `start()` is a no-op while running or after `dispose()`; `stop()`
 * cancels the owned frame; `dispose()` stops once and permanently disables
 * restart. The scheduler is injectable for tests.
 */
export function createFrameLoop(
  callback: FrameRequestCallback,
  scheduler: FrameScheduler = defaultScheduler,
): FrameLoop {
  let frameId: number | null = null
  let disposed = false

  const tick: FrameRequestCallback = (time) => {
    frameId = scheduler.request(tick)
    callback(time)
  }

  return {
    start() {
      if (disposed || frameId !== null) return
      frameId = scheduler.request(tick)
    },
    stop() {
      if (frameId !== null) {
        scheduler.cancel(frameId)
        frameId = null
      }
    },
    dispose() {
      if (disposed) return
      disposed = true
      this.stop()
    },
    get running() {
      return frameId !== null
    },
  }
}
