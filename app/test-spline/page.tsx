'use client'

import { SplineSceneBasic } from '@/components/ui/demo'

export default function TestSplinePage() {
  return (
    <div className="min-h-screen bg-neutral-50 py-20">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Spline 3D Component Test</h1>
          <p className="text-neutral-600">If you see a 3D scene below, the component is working!</p>
        </div>
        <SplineSceneBasic />
      </div>
    </div>
  )
}
