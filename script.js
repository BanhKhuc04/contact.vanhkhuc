const avatar = document.getElementById('avatarTilt');

if (avatar && window.matchMedia('(pointer: fine)').matches) {
  avatar.addEventListener('mousemove', (event) => {
    const r = avatar.getBoundingClientRect();
    const x = (event.clientX - r.left) / r.width - 0.5;
    const y = (event.clientY - r.top) / r.height - 0.5;
    avatar.style.transform = `perspective(650px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) scale(1.035)`;
  });

  avatar.addEventListener('mouseleave', () => {
    avatar.style.transform = 'perspective(650px) rotateX(0deg) rotateY(0deg) scale(1)';
  });
}
