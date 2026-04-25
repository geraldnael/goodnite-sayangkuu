/* ─── Stars ─── */
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initStars() {
  stars = [];
  const count = Math.min(200, Math.floor((canvas.width * canvas.height) / 5000));
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.007 + 0.002,
      color: Math.random() > 0.85 ? '#f5d87a' : '#ffffff'
    });
  }
}

function drawStars(t) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const s of stars) {
    const a = 0.25 + 0.75 * Math.abs(Math.sin(s.phase + t * s.speed));
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = s.color === '#f5d87a'
      ? `rgba(245,216,122,${a})`
      : `rgba(255,255,248,${a})`;
    ctx.fill();
  }
  requestAnimationFrame(drawStars);
}

resize();
initStars();
window.addEventListener('resize', () => { resize(); initStars(); });
requestAnimationFrame(drawStars);

/* ─── Floating Hearts ─── */
const fhc = document.getElementById('fhc');
const heartEmojis = ['❤️','🩷','💕','💖','✨','🌟','💫','🩷'];

function spawnHearts() {
  const count = 4 + Math.floor(Math.random() * 4);
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'fheart';
      el.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
      el.style.left = (Math.random() * 92 + 4) + '%';
      el.style.fontSize = (12 + Math.random() * 16) + 'px';
      el.style.animationDuration = (5 + Math.random() * 5) + 's';
      el.style.animationDelay = (Math.random() * 1.5) + 's';
      fhc.appendChild(el);
      setTimeout(() => el.remove(), 12000);
    }, i * 350);
  }
}

spawnHearts();
setInterval(spawnHearts, 5500);

/* ─── Audio ─── */
const audio = document.getElementById('bgAudio');
const btnPlay = document.getElementById('btnPlay');
const btnStop = document.getElementById('btnStop');
const playIcon = document.getElementById('playIcon');
const musicDot = document.getElementById('musicDot');

let isPlaying = false;

// Auto-play on first user interaction (browser policy)
document.addEventListener('click', function startOnce() {
  if (!isPlaying) {
    audio.play().then(() => setPlayState(true)).catch(() => {});
  }
  document.removeEventListener('click', startOnce);
}, { once: true });

function togglePlay() {
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play().catch(() => {});
  }
}

function stopMusic() {
  audio.pause();
  audio.currentTime = 0;
  setPlayState(false);
}

function setVolume(val) {
  audio.volume = parseFloat(val);
}

function setPlayState(playing) {
  isPlaying = playing;
  playIcon.textContent = playing ? '⏸' : '▶';
  musicDot.classList.toggle('playing', playing);
}

audio.addEventListener('play', () => setPlayState(true));
audio.addEventListener('pause', () => setPlayState(false));
audio.addEventListener('ended', () => setPlayState(false));
audio.addEventListener('error', () => {
  document.getElementById('musicLabel').textContent = '⚠ File music/mereka.mp3 belum ada';
});
