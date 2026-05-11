document.addEventListener('DOMContentLoaded', () => {
    
    // --- Create Background Particles ---
    const particlesContainer = document.getElementById('particles');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        
        // Random styling for particles
        const size = Math.random() * 8 + 4;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;

        Object.assign(p.style, {
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            background: 'white',
            borderRadius: '50%',
            left: `${x}%`,
            top: `${y}%`,
            opacity: '0.2',
            filter: 'blur(2px)',
            animation: `floatParticle ${duration}s infinite alternate ease-in-out`,
            animationDelay: `${delay}s`
        });

        particlesContainer.appendChild(p);
    }

    // Add particle animation to stylesheet
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes floatParticle {
            from { transform: translateY(0) translateX(0); opacity: 0.2; }
            to { transform: translateY(-100px) translateX(50px); opacity: 0.5; }
        }
    `;
    document.head.appendChild(style);

    // --- Link Cards Staggered Animation ---
    const linkBtns = document.querySelectorAll('.btn-link');
    linkBtns.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(15px) scale(0.9)';
        
        setTimeout(() => {
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0) scale(1)';
        }, 600 + (index * 80));
    });

    // --- Music & Sound Effects ---
    const musicBtn = document.getElementById('magic-music');
    const bgMusic = new Audio('assets/soundlofi.mp3'); 
    const clickSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'); 
    const hoverSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2578/2578-preview.mp3'); 
    
    // Preload for better response
    clickSound.preload = 'auto';
    hoverSound.preload = 'auto';
    
    clickSound.volume = 0.6;
    hoverSound.volume = 0.8; // Set higher to be sure it's heard
    
    bgMusic.loop = true;
    let isMagicOn = false;

    if (musicBtn) {
        musicBtn.addEventListener('click', () => {
            isMagicOn = !isMagicOn;
            
            if (isMagicOn) {
                bgMusic.play().catch(e => console.log("Audio play blocked by browser. Click again!"));
                musicBtn.style.color = '#fff';
                musicBtn.style.background = 'linear-gradient(45deg, #E0C3FC, #A0C4FF)';
                musicBtn.querySelector('.magic-glow').style.animationDuration = '1s';
                
                // Add "magic" class to body for extra sparkles
                document.body.classList.add('magic-mode');
                
                console.log('Magic Music Enabled ✨');
            } else {
                bgMusic.pause();
                musicBtn.style.color = 'var(--p-sky)';
                musicBtn.style.background = '#fff';
                musicBtn.querySelector('.magic-glow').style.animationDuration = '2s';
                document.body.classList.remove('magic-mode');
                
                console.log('Magic Music Disabled');
            }
            
            // Visual feedback
            musicBtn.style.transform = 'scale(0.8) rotate(-20deg)';
            setTimeout(() => {
                musicBtn.style.transform = isMagicOn ? 'scale(1.2) rotate(10deg)' : 'scale(1)';
            }, 150);
        });
    }

    // --- Add Sounds to All Buttons ---
    const allButtons = document.querySelectorAll('.btn-link, .magic-btn');
    allButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            console.log('Hovering over button...');
            hoverSound.currentTime = 0;
            hoverSound.play().catch(err => console.log('Hover sound blocked: ', err));
        });
        
        btn.addEventListener('mousedown', () => {
            console.log('Clicking button...');
            clickSound.currentTime = 0;
            clickSound.play().catch(err => console.log('Click sound blocked: ', err));
        });
    });

    // --- Subtle Card Tilt ---
    const card = document.querySelector('.main-card');
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 40;
        const y = (window.innerHeight / 2 - e.pageY) / 40;
        
        card.style.transform = `rotateX(${y}px) rotateY(${-x}px)`;
    });

});
