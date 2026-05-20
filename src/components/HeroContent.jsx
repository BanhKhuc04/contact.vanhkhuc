export default function HeroContent() {
  return (
    <section className="hero-ui">
      <div
        className="hero-content"
        onClick={(event) => event.stopPropagation()}
        onPointerDown={(event) => event.stopPropagation()}
      >
        <div className="title-block">
          <div
            className="title-avatar"
            onClick={(event) => event.stopPropagation()}
            onPointerDown={(event) => event.stopPropagation()}
          >
            <span className="avatar-aura avatar-aura-1" />
            <span className="avatar-aura avatar-aura-2" />
            <span className="avatar-spark avatar-spark-1" />
            <span className="avatar-spark avatar-spark-2" />
            <img
              src={`${import.meta.env.BASE_URL}assets/images/satella-avatar.jpg`}
              alt="Satella avatar"
              draggable="false"
            />
          </div>

          <h1>Satella</h1>
          <p className="sub-name">VanhKhuc</p>
          <p className="role">Software Developer</p>
          <p className="tagline">A quiet corner on the internet.</p>
        </div>

        <div
          className="social-panel"
          onClick={(event) => event.stopPropagation()}
          onPointerDown={(event) => event.stopPropagation()}
        >
          <p className="social-kicker">Social links</p>
          <h2>Connect with Me</h2>

          <nav className="social-links">
            <a
              href="https://github.com/BanhKhuc04"
              target="_blank"
              rel="noreferrer"
              className="social-link"
              id="link-github"
            >
              <span className="social-icon">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </span>
              <span className="social-text">GitHub</span>
              <span className="social-arrow">→</span>
            </a>

            <a
              href="https://www.tiktok.com/@vanhkhucdev"
              target="_blank"
              rel="noreferrer"
              className="social-link"
              id="link-tiktok"
            >
              <span className="social-icon">
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.75a8.18 8.18 0 004.76 1.52V6.84a4.84 4.84 0 01-1-.15z" />
                </svg>
              </span>
              <span className="social-text">TikTok</span>
              <span className="social-arrow">→</span>
            </a>

            <a
              href="https://www.facebook.com/vanhkhuc2005"
              target="_blank"
              rel="noreferrer"
              className="social-link"
              id="link-facebook"
            >
              <span className="social-icon">
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </span>
              <span className="social-text">Facebook</span>
              <span className="social-arrow">→</span>
            </a>

            <a
              href="mailto:vanhkhuc2k5@gmail.com"
              className="social-link"
              id="link-email"
            >
              <span className="social-icon">
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
                </svg>
              </span>
              <span className="social-text">Email</span>
              <span className="social-arrow">→</span>
            </a>
          </nav>
        </div>
      </div>
    </section>
  )
}
