export default function MusicDock({ isAudioPlaying, toggleMusic }) {
  return (
    <div
      className={`music-dock ${isAudioPlaying ? 'is-playing' : ''}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="music-info">
        <span className="music-title">Satella Theme</span>
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
  )
}
