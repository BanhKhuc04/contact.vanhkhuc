import { useMemo } from 'react'

function randomBetween(min, max) {
  return Number((Math.random() * (max - min) + min).toFixed(2))
}

function Particles() {
  const particles = useMemo(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const dotCount = prefersReducedMotion ? 6 : 16
    const shardCount = prefersReducedMotion ? 3 : 5
    const items = []

    for (let index = 0; index < dotCount; index += 1) {
      const size = randomBetween(2.5, 7)

      items.push({
        type: 'dot',
        key: `dot-${index}`,
        style: {
          width: `${size}px`,
          height: `${size}px`,
          left: `${randomBetween(0, 100)}%`,
          top: `${randomBetween(0, 100)}%`,
          animationDuration: `${randomBetween(12, 22)}s`,
          animationDelay: `${randomBetween(-18, 0)}s`,
          opacity: randomBetween(0.15, 0.4),
          '--drift-x': `${randomBetween(-60, 60)}px`,
          '--travel-y': `${randomBetween(80, 180)}px`,
        },
      })
    }

    for (let index = 0; index < shardCount; index += 1) {
      items.push({
        type: 'shard',
        key: `shard-${index}`,
        style: {
          left: `${randomBetween(-4, 92)}%`,
          top: `${randomBetween(8, 96)}%`,
          '--size': `${randomBetween(12, 24)}px`,
          '--blur': `${randomBetween(0.2, 1.4)}px`,
          '--opacity': `${randomBetween(0.18, 0.45)}`,
          '--duration': `${randomBetween(13, 24)}s`,
          '--delay': `${randomBetween(-16, 0)}s`,
          '--drift-x': `${randomBetween(44, 130)}px`,
          '--drift-y': `${randomBetween(42, 120)}px`,
          '--rotate-mid': `${randomBetween(90, 170)}deg`,
          '--rotate-end': `${randomBetween(220, 360)}deg`,
        },
      })
    }

    return items
  }, [])

  return (
    <div className="scene-particles" aria-hidden="true">
      {particles.map((particle) => (
        <span
          key={particle.key}
          className={
            particle.type === 'dot' ? 'particle-dot' : 'particle-shard'
          }
          style={particle.style}
        />
      ))}
    </div>
  )
}

export default function SceneBackground({
  imageRef,
  videoRef,
  mistRef,
  dissolveRef,
  softGlowRef,
  onSceneClick,
  onVideoEnded,
}) {
  return (
    <>
      <div className="scene-stage" onClick={onSceneClick}>
        <img
          ref={imageRef}
          className="scene-media scene-image"
          src="/assets/images/satella-bg.jpg"
          alt="Satella fantasy background"
          draggable="false"
        />

        <video
          ref={videoRef}
          className="scene-media scene-video"
          src="/assets/videos/satella-loop.mp4"
          muted
          playsInline
          preload="auto"
          onEnded={onVideoEnded}
        />

        <div className="scene-overlay" />
        <div className="scene-haze" />
        <div ref={mistRef} className="dream-mist-layer" />
        <div ref={dissolveRef} className="dream-dissolve-layer" />
        <div ref={softGlowRef} className="dream-soft-glow" />
      </div>

      <Particles />
    </>
  )
}
