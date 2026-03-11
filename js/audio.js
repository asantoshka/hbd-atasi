let bgAudio = null;

function playHappyBirthday(){
  bgAudio = new Audio('audio.mp3');
  bgAudio.loop = true;
  bgAudio.volume = 0.7;
  bgAudio.play().catch(() => {
    document.addEventListener('click', () => bgAudio.play(), { once: true });
  });
}

function toggleMute(){
  if(!bgAudio) return;
  bgAudio.muted = !bgAudio.muted;
  const btn = document.getElementById('mute-btn');
  btn.textContent = bgAudio.muted ? '🔇' : '🔊';
}
