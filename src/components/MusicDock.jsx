export default function MusicDock({ isAudioPlaying, toggleMusic }) {
  return (
    <div className="corner-media-stack">
      <div className="anime-logo-shell">
        <span className="anime-logo-cloud anime-logo-cloud-1" aria-hidden="true" />
        <span className="anime-logo-cloud anime-logo-cloud-2" aria-hidden="true" />
        <img
          className="anime-logo"
          src="/assets/images/re-zero-logo.png"
          alt="Re:Zero"
          draggable="false"
        />
      </div>

      <div
        className={`music-dock ${isAudioPlaying ? 'is-playing' : ''}`}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div className="music-info">
          <span className="music-title">Stay Alive</span>
          <small className="music-artist">Emilia (Rie Takahashi)</small>
          <small className="music-status">
            {isAudioPlaying ? 'Now Playing' : 'Tap to play'}
          </small>
          <div className="music-eq" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>

        <button
          className="music-orb"
          onClick={toggleMusic}
          aria-label="Toggle music"
          type="button"
        >
          <span className="music-icon">♪</span>
        </button>
      </div>
    </div>
  )
}
