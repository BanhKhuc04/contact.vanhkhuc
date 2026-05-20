import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import SceneBackground from './components/SceneBackground'
import HeroContent from './components/HeroContent'
import MusicDock from './components/MusicDock'
import MobileBlocker from './components/MobileBlocker'

export default function App() {
  const [sceneState, setSceneState] = useState('idle')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [audioLocked, setAudioLocked] = useState(false)
  const [isReady, setIsReady] = useState(false)

  const sceneStateRef = useRef('idle')
  const transitionLockRef = useRef(false)
  const timelineRef = useRef(null)

  const imageRef = useRef(null)
  const videoRef = useRef(null)
  const fillImageRef = useRef(null)
  const fillVideoRef = useRef(null)
  const mistRef = useRef(null)
  const dissolveRef = useRef(null)
  const softGlowRef = useRef(null)
  const audioRef = useRef(null)

  const baseFilters = {
    image: 'brightness(0.9) saturate(1.08)',
    video: 'brightness(0.9) saturate(1.08)',
    fillImage: 'blur(18px) brightness(0.74) saturate(1.18)',
    fillVideo: 'blur(18px) brightness(0.74) saturate(1.18)',
  }

  const softenFilters = {
    image: 'blur(10px) brightness(1.03) saturate(1.04)',
    video: 'blur(10px) brightness(1.03) saturate(1.04)',
    fillImage: 'blur(28px) brightness(0.86) saturate(1.14)',
    fillVideo: 'blur(28px) brightness(0.86) saturate(1.14)',
  }

  const setScene = useCallback((nextScene) => {
    sceneStateRef.current = nextScene
    setSceneState(nextScene)
  }, [])

  const setTransitionState = useCallback((nextValue) => {
    transitionLockRef.current = nextValue
    setIsTransitioning(nextValue)
  }, [])

  const setMediaOpacity = useCallback((imageOpacity, videoOpacity) => {
    const imageTargets = [fillImageRef.current, imageRef.current].filter(Boolean)
    const videoTargets = [fillVideoRef.current, videoRef.current].filter(Boolean)

    if (imageTargets.length) {
      gsap.set(imageTargets, { opacity: imageOpacity })
    }

    if (videoTargets.length) {
      gsap.set(videoTargets, { opacity: videoOpacity })
    }
  }, [])

  const resetVideos = useCallback(() => {
    ;[videoRef.current, fillVideoRef.current].forEach((media) => {
      if (!media) return
      try {
        media.pause()
        media.currentTime = 0
      } catch {
        // Ignore media reset failures from an interrupted playback.
      }
    })
  }, [])

  const restoreSceneFilters = useCallback(() => {
    if (imageRef.current) {
      gsap.set(imageRef.current, { filter: baseFilters.image })
    }

    if (videoRef.current) {
      gsap.set(videoRef.current, { filter: baseFilters.video })
    }

    if (fillImageRef.current) {
      gsap.set(fillImageRef.current, { filter: baseFilters.fillImage })
    }

    if (fillVideoRef.current) {
      gsap.set(fillVideoRef.current, { filter: baseFilters.fillVideo })
    }
  }, [])

  useEffect(() => {
    const handlePointerMove = (event) => {
      document.documentElement.style.setProperty(
        '--pointer-x',
        `${(event.clientX / window.innerWidth) * 100}%`
      )
      document.documentElement.style.setProperty(
        '--pointer-y',
        `${(event.clientY / window.innerHeight) * 100}%`
      )
    }

    document.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    })

    return () => document.removeEventListener('pointermove', handlePointerMove)
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.48

    audio
      .play()
      .then(() => {
        setIsAudioPlaying(true)
        setAudioLocked(false)
      })
      .catch(() => {
        setAudioLocked(true)
        setIsAudioPlaying(false)
      })
  }, [])

  useEffect(() => {
    requestAnimationFrame(() => setIsReady(true))
  }, [])

  useEffect(() => {
    if (!audioLocked) return

    const unlockAudio = async () => {
      const audio = audioRef.current
      if (!audio) return

      try {
        await audio.play()
        setAudioLocked(false)
        setIsAudioPlaying(true)
      } catch {
        // Browser still requires a later user gesture.
      }

      document.removeEventListener('pointerdown', unlockAudio)
      document.removeEventListener('keydown', unlockAudio)
    }

    document.addEventListener('pointerdown', unlockAudio)
    document.addEventListener('keydown', unlockAudio)

    return () => {
      document.removeEventListener('pointerdown', unlockAudio)
      document.removeEventListener('keydown', unlockAudio)
    }
  }, [audioLocked])

  useEffect(() => {
    setMediaOpacity(1, 0)
    restoreSceneFilters()

    const overlayTargets = [
      mistRef.current,
      dissolveRef.current,
      softGlowRef.current,
    ].filter(Boolean)
    if (overlayTargets.length) {
      gsap.set(overlayTargets, { opacity: 0 })
    }

    return () => {
      timelineRef.current?.kill()
    }
  }, [restoreSceneFilters, setMediaOpacity])

  const handleSceneClick = useCallback(() => {
    if (transitionLockRef.current || sceneStateRef.current === 'playingVideo') {
      return
    }

    const video = videoRef.current
    if (!video) return

    timelineRef.current?.kill()
    setTransitionState(true)
    resetVideos()
    restoreSceneFilters()

    const timeline = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      onComplete: () => setTransitionState(false),
    })

    timelineRef.current = timeline

    timeline
      .set(mistRef.current, {
        opacity: 0,
        xPercent: -18,
        scale: 1.08,
        filter: 'blur(30px)',
      })
      .set(dissolveRef.current, {
        opacity: 0,
        filter: 'blur(22px)',
      })
      .set(softGlowRef.current, {
        opacity: 0,
        filter: 'blur(28px)',
      })
      .to(mistRef.current, {
        opacity: 0.95,
        xPercent: 0,
        filter: 'blur(18px)',
        duration: 0.55,
      })
      .to(
        dissolveRef.current,
        {
          opacity: 0.72,
          filter: 'blur(12px)',
          duration: 0.45,
        },
        '<'
      )
      .to(
        softGlowRef.current,
        {
          opacity: 0.7,
          filter: 'blur(18px)',
          duration: 0.45,
        },
        '<'
      )
      .to(
        imageRef.current,
        {
          filter: softenFilters.image,
          duration: 0.35,
        },
        '-=0.15'
      )
      .to(
        fillImageRef.current,
        {
          filter: softenFilters.fillImage,
          duration: 0.35,
        },
        '<'
      )
      .add(() => {
        const fillVideo = fillVideoRef.current

        setScene('playingVideo')
        if (videoRef.current) {
          gsap.set(videoRef.current, {
            opacity: 1,
            filter: softenFilters.video,
          })
        }

        if (fillVideoRef.current) {
          gsap.set(fillVideoRef.current, {
            opacity: 1,
            filter: softenFilters.fillVideo,
          })
        }

        if (imageRef.current) {
          gsap.set(imageRef.current, { opacity: 0 })
        }

        if (fillImageRef.current) {
          gsap.set(fillImageRef.current, { opacity: 0 })
        }

        void video
          .play()
          .then(() => {
            if (!fillVideo) return
            fillVideo.currentTime = video.currentTime
            void fillVideo.play().catch(() => {})
          })
          .catch((error) => {
            console.warn('Video play failed:', error)
            resetVideos()
            setScene('idle')
            setMediaOpacity(1, 0)
            restoreSceneFilters()
          })
      })
      .to(videoRef.current, {
        filter: baseFilters.video,
        duration: 0.45,
      })
      .to(
        fillVideoRef.current,
        {
          filter: baseFilters.fillVideo,
          duration: 0.45,
        },
        '<'
      )
      .to(
        mistRef.current,
        {
          opacity: 0,
          xPercent: 18,
          filter: 'blur(34px)',
          duration: 0.72,
        },
        '-=0.15'
      )
      .to(
        dissolveRef.current,
        {
          opacity: 0,
          filter: 'blur(26px)',
          duration: 0.68,
        },
        '<'
      )
      .to(
        softGlowRef.current,
        {
          opacity: 0,
          filter: 'blur(30px)',
          duration: 0.68,
        },
        '<'
      )
      .set(imageRef.current, { filter: baseFilters.image })
      .set(fillImageRef.current, { filter: baseFilters.fillImage })
  }, [resetVideos, restoreSceneFilters, setMediaOpacity, setScene, setTransitionState])

  const handleVideoEnded = useCallback(() => {
    if (transitionLockRef.current) return

    timelineRef.current?.kill()
    setTransitionState(true)
    restoreSceneFilters()

    const timeline = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      onComplete: () => {
        resetVideos()
        setScene('idle')
        setMediaOpacity(1, 0)
        restoreSceneFilters()
        setTransitionState(false)
      },
    })

    timelineRef.current = timeline

    timeline
      .set(mistRef.current, {
        opacity: 0,
        xPercent: 18,
        scale: 1.08,
        filter: 'blur(30px)',
      })
      .set(dissolveRef.current, {
        opacity: 0,
        filter: 'blur(22px)',
      })
      .set(softGlowRef.current, {
        opacity: 0,
        filter: 'blur(28px)',
      })
      .to(mistRef.current, {
        opacity: 0.95,
        xPercent: 0,
        filter: 'blur(18px)',
        duration: 0.55,
      })
      .to(
        dissolveRef.current,
        {
          opacity: 0.72,
          filter: 'blur(12px)',
          duration: 0.45,
        },
        '<'
      )
      .to(
        softGlowRef.current,
        {
          opacity: 0.7,
          filter: 'blur(18px)',
          duration: 0.45,
        },
        '<'
      )
      .to(
        videoRef.current,
        {
          filter: softenFilters.video,
          duration: 0.35,
        },
        '-=0.15'
      )
      .to(
        fillVideoRef.current,
        {
          filter: softenFilters.fillVideo,
          duration: 0.35,
        },
        '<'
      )
      .to(
        [videoRef.current, fillVideoRef.current].filter(Boolean),
        {
          opacity: 0,
          duration: 0.38,
        }
      )
      .set(
        imageRef.current,
        {
          opacity: 1,
          filter: softenFilters.image,
        },
        '<'
      )
      .set(
        fillImageRef.current,
        {
          opacity: 1,
          filter: softenFilters.fillImage,
        },
        '<'
      )
      .to(imageRef.current, {
        filter: baseFilters.image,
        duration: 0.45,
      })
      .to(
        fillImageRef.current,
        {
          filter: baseFilters.fillImage,
          duration: 0.45,
        },
        '<'
      )
      .to(
        mistRef.current,
        {
          opacity: 0,
          xPercent: -18,
          filter: 'blur(34px)',
          duration: 0.72,
        },
        '-=0.15'
      )
      .to(
        dissolveRef.current,
        {
          opacity: 0,
          filter: 'blur(26px)',
          duration: 0.68,
        },
        '<'
      )
      .to(
        softGlowRef.current,
        {
          opacity: 0,
          filter: 'blur(30px)',
          duration: 0.68,
        },
        '<'
      )
  }, [resetVideos, restoreSceneFilters, setMediaOpacity, setScene, setTransitionState])

  const toggleMusic = useCallback((event) => {
    event.stopPropagation()

    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      audio
        .play()
        .then(() => {
          setIsAudioPlaying(true)
          setAudioLocked(false)
        })
        .catch(() => setAudioLocked(true))
      return
    }

    audio.pause()
    setIsAudioPlaying(false)
  }, [])

  const shellClassName = [
    'page-shell',
    sceneState === 'playingVideo' ? 'playing-video' : '',
    isTransitioning ? 'transitioning' : '',
    isReady ? 'is-ready' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <main className={shellClassName}>
      <SceneBackground
        imageRef={imageRef}
        videoRef={videoRef}
        fillImageRef={fillImageRef}
        fillVideoRef={fillVideoRef}
        mistRef={mistRef}
        dissolveRef={dissolveRef}
        softGlowRef={softGlowRef}
        onSceneClick={handleSceneClick}
        onVideoEnded={handleVideoEnded}
      />

      <HeroContent />

      <MusicDock isAudioPlaying={isAudioPlaying} toggleMusic={toggleMusic} />

      <MobileBlocker />

      <audio
        ref={audioRef}
        src="/assets/audio/satella-theme.mp3"
        loop
        preload="auto"
      />
    </main>
  )
}
