'use client'

import { Suspense, lazy, useState } from 'react'
import { Sparkles } from 'lucide-react'

// Lazy load Spline
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

// Loading/Fallback component
function SplineLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-transparent">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-4">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 to-secondary-500/30 rounded-full blur-xl animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-white/60 animate-pulse" />
          </div>
        </div>
        <p className="text-white/40 text-sm">Loading 3D...</p>
      </div>
    </div>
  )
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <Suspense fallback={<SplineLoader />}>
      <div className="w-full h-full relative">
        {/* Loading overlay - hides when loaded */}
        {!isLoaded && (
          <div className="absolute inset-0 z-10">
            <SplineLoader />
          </div>
        )}
        
        {/* Spline scene */}
        <Spline
          scene={scene}
          className={className}
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </Suspense>
  )
}
