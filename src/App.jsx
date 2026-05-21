import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import SceneBackground from './components/SceneBackground'
import HeroContent from './components/HeroContent'
import MusicDock from './components/MusicDock'
import MobileBlocker from './components/MobileBlocker'

export default function App() {
  const AUDIO_PREFERENCE_KEY = 'satella-audio-enabled'
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
  const mistRef = useRef(null)
  const dissolveRef = useRef(null)
  const softGlowRef = useRef(null)
  const audioRef = useRef(null)
  const audioPreferenceRef = useRef(true)

  const setScene = useCallback((nextScene) => {
    sceneStateRef.current = nextScene
    setSceneState(nextScene)
  }, [])

  const setTransitionState = useCallback((nextValue) => {
    transitionLockRef.current = nextValue
    setIsTransitioning(nextValue)
  }, [])

  const persistAudioPreference = useCallback((nextValue) => {
    audioPreferenceRef.current = nextValue
    window.localStorage.setItem(AUDIO_PREFERENCE_KEY, String(nextValue))
  }, [AUDIO_PREFERENCE_KEY])

  const resetSceneVisuals = useCallback(() => {
    if (imageRef.current) {
      gsap.set(imageRef.current, { opacity: 1, filter: 'none' })
    }

    if (videoRef.current) {
      gsap.set(videoRef.current, { opacity: 0, filter: 'none' })
    }

    ;[mistRef.current, dissolveRef.current, softGlowRef.current]
      .filter(Boolean)
      .forEach((target) => {
        gsap.set(target, { opacity: 0 })
      })
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

    const savedPreference = window.localStorage.getItem(AUDIO_PREFERENCE_KEY)
    const shouldAutoPlay = savedPreference !== 'false'

    audioPreferenceRef.current = shouldAutoPlay
    audio.volume = 0.3

    if (!shouldAutoPlay) {
      setIsAudioPlaying(false)
      setAudioLocked(false)
      return
    }

    audio
      .play()
      .then(() => {
        persistAudioPreference(true)
        setIsAudioPlaying(true)
        setAudioLocked(false)
      })
      .catch(() => {
        setAudioLocked(true)
        setIsAudioPlaying(false)
      })
  }, [AUDIO_PREFERENCE_KEY, persistAudioPreference])

  useEffect(() => {
    requestAnimationFrame(() => setIsReady(true))
  }, [])

  useEffect(() => {
    if (!audioLocked) return

    const unlockAudio = async () => {
      if (!audioPreferenceRef.current) return

      const audio = audioRef.current
      if (!audio) return

      try {
        await audio.play()
        persistAudioPreference(true)
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
    window.addEventListener('focus', unlockAudio)
    document.addEventListener('visibilitychange', unlockAudio)

    return () => {
      document.removeEventListener('pointerdown', unlockAudio)
      document.removeEventListener('keydown', unlockAudio)
      window.removeEventListener('focus', unlockAudio)
      document.removeEventListener('visibilitychange', unlockAudio)
    }
  }, [audioLocked, persistAudioPreference])

  useEffect(() => {
    resetSceneVisuals()

    return () => {
      timelineRef.current?.kill()
    }
  }, [resetSceneVisuals])

  const handleSceneClick = useCallback(() => {
    if (transitionLockRef.current || sceneStateRef.current === 'playingVideo') {
      return
    }

    const video = videoRef.current
    const image = imageRef.current
    if (!video || !image) return

    timelineRef.current?.kill()
    setTransitionState(true)

    try {
      video.pause()
      video.currentTime = 0
    } catch {
      // Ignore reset failures from interrupted media states.
    }

    const timeline = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      onComplete: () => setTransitionState(false),
    })

    timelineRef.current = timeline

    timeline
      .set(mistRef.current, {
        opacity: 0,
        xPercent: -18,
        filter: 'blur(24px)',
      })
      .set(dissolveRef.current, {
        opacity: 0,
        filter: 'blur(16px)',
      })
      .set(softGlowRef.current, {
        opacity: 0,
        filter: 'blur(18px)',
      })
      .to(mistRef.current, {
        opacity: 0.72,
        xPercent: 0,
        filter: 'blur(14px)',
        duration: 0.38,
      })
      .to(
        dissolveRef.current,
        {
          opacity: 0.42,
          filter: 'blur(10px)',
          duration: 0.34,
        },
        '<'
      )
      .to(
        softGlowRef.current,
        {
          opacity: 0.28,
          filter: 'blur(14px)',
          duration: 0.34,
        },
        '<'
      )
      .add(() => {
        setScene('playingVideo')

        gsap.set(video, {
          opacity: 1,
          filter: 'none',
        })

        gsap.set(image, {
          opacity: 0,
          filter: 'none',
        })

        void video.play().catch((error) => {
          console.warn('Video play failed:', error)
          setScene('idle')
          gsap.set(image, { opacity: 1, filter: 'none' })
          gsap.set(video, { opacity: 0, filter: 'none' })
        })
      })
      .to(mistRef.current, {
        opacity: 0,
        xPercent: 18,
        filter: 'blur(26px)',
        duration: 0.52,
      })
      .to(
        dissolveRef.current,
        {
          opacity: 0,
          filter: 'blur(20px)',
          duration: 0.48,
        },
        '<'
      )
      .to(
        softGlowRef.current,
        {
          opacity: 0,
          filter: 'blur(22px)',
          duration: 0.48,
        },
        '<'
      )
  }, [setScene, setTransitionState])

  const handleVideoEnded = useCallback(() => {
    if (transitionLockRef.current) return

    const video = videoRef.current
    const image = imageRef.current
    if (!video || !image) return

    timelineRef.current?.kill()
    setTransitionState(true)

    const timeline = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      onComplete: () => {
        video.pause()
        video.currentTime = 0
        setScene('idle')
        setTransitionState(false)
      },
    })

    timelineRef.current = timeline

    timeline
      .set(mistRef.current, {
        opacity: 0,
        xPercent: 18,
        filter: 'blur(24px)',
      })
      .set(dissolveRef.current, {
        opacity: 0,
        filter: 'blur(16px)',
      })
      .set(softGlowRef.current, {
        opacity: 0,
        filter: 'blur(18px)',
      })
      .to(mistRef.current, {
        opacity: 0.72,
        xPercent: 0,
        filter: 'blur(14px)',
        duration: 0.38,
      })
      .to(
        dissolveRef.current,
        {
          opacity: 0.42,
          filter: 'blur(10px)',
          duration: 0.34,
        },
        '<'
      )
      .to(
        softGlowRef.current,
        {
          opacity: 0.28,
          filter: 'blur(14px)',
          duration: 0.34,
        },
        '<'
      )
      .set(image, {
        opacity: 1,
        filter: 'none',
      })
      .set(video, {
        opacity: 0,
        filter: 'none',
      })
      .to(mistRef.current, {
        opacity: 0,
        xPercent: -18,
        filter: 'blur(26px)',
        duration: 0.52,
      })
      .to(
        dissolveRef.current,
        {
          opacity: 0,
          filter: 'blur(20px)',
          duration: 0.48,
        },
        '<'
      )
      .to(
        softGlowRef.current,
        {
          opacity: 0,
          filter: 'blur(22px)',
          duration: 0.48,
        },
        '<'
      )
  }, [setScene, setTransitionState])

  const toggleMusic = useCallback((event) => {
    event.stopPropagation()

    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      audio
        .play()
        .then(() => {
          persistAudioPreference(true)
          setIsAudioPlaying(true)
          setAudioLocked(false)
        })
        .catch(() => setAudioLocked(true))
      return
    }

    audio.pause()
    persistAudioPreference(false)
    setIsAudioPlaying(false)
  }, [persistAudioPreference])

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
        src={`${import.meta.env.BASE_URL}assets/audio/satella-theme.mp3`}
        loop
        preload="auto"
      />
    </main>
  )
}
