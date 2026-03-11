// Inject dynamic keyframes
(function(){
  const st = document.createElement('style');
  st.textContent = `
    @keyframes sparkBurst {
      0%{opacity:1;transform:translate(-50%,-50%) translate(0,0) scale(1);}
      100%{opacity:0;transform:translate(-50%,-50%) translate(var(--tx),var(--ty)) scale(0);}
    }
    @keyframes popPiece {
      0%{opacity:1;transform:translate(-50%,-50%) translate(0,0) scale(1);}
      100%{opacity:0;transform:translate(-50%,-50%) translate(var(--tx),var(--ty)) scale(0);}
    }
  `;
  document.head.appendChild(st);
})();

let balloonScore = 0;

function getScoreMsg(score){
  let msg = '';
  for(const [threshold, text] of scoreMessages){
    if(score >= threshold) msg = text;
  }
  return msg;
}

function launchWish(){
  document.getElementById('balloon-game').style.display = 'flex';
  spawnBalloons();
  spawnConfetti();
  spawnMusicNotes();
  playHappyBirthday();
}

function spawnBalloons(){
  const c = document.getElementById('balloons');
  c.innerHTML = '';
  balloonScore = 0;
  document.getElementById('score-display').textContent = 0;
  document.getElementById('total-display').textContent = `/ ${TOTAL_BALLOONS}`;
  for(let i = 0; i < TOTAL_BALLOONS; i++){
    setTimeout(() => spawnOneBalloon(c), i * 400);
  }
}

function spawnOneBalloon(container){
  const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
  const size  = Math.random() * 24 + 48;
  const startX = Math.random() * (window.innerWidth - size);
  const speed  = Math.random() * 1.2 + 0.8;
  const sway   = Math.random() * 1.5 + 0.5;
  const swaySpeed = Math.random() * 0.03 + 0.01;

  const b = document.createElement('div');
  b.className = 'balloon';
  b.style.cssText = `
    width:${size}px;
    height:${size * 1.25}px;
    background:${color};
    box-shadow: inset -6px -6px 0 rgba(0,0,0,0.12);
    left:${startX}px;
    top:${window.innerHeight + 20}px;
    opacity:0.9;
  `;

  let posX = startX;
  let posY = window.innerHeight + 20;
  let tick = Math.random() * 100;
  let alive = true;

  function frame(){
    if(!alive || !b.parentNode) return;
    tick += swaySpeed;
    posY -= speed;
    posX = startX + Math.sin(tick) * sway * 18;
    b.style.left = posX + 'px';
    b.style.top  = posY + 'px';

    if(posY < -size - 40){
      b.remove();
      if(balloonScore < TOTAL_BALLOONS) spawnOneBalloon(container);
      return;
    }
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);

  b.addEventListener('click', (e) => {
    if(!alive) return;
    alive = false;
    popBalloon(b, color, e.clientX, e.clientY);
  });
  b.addEventListener('touchstart', (e) => {
    if(!alive) return;
    e.preventDefault();
    alive = false;
    popBalloon(b, color, e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: false });

  container.appendChild(b);
}

function popBalloon(el, color, x, y){
  el.remove();

  for(let p = 0; p < 10; p++){
    const piece = document.createElement('div');
    const angle = (p / 10) * 360;
    const dist  = Math.random() * 55 + 25;
    piece.style.cssText = `
      position:fixed;left:${x}px;top:${y}px;
      width:9px;height:9px;
      border-radius:50%;
      background:${color};
      pointer-events:none;
      z-index:9999;
      animation: popPiece 0.55s ease forwards;
      --tx:${Math.cos(angle * Math.PI/180) * dist}px;
      --ty:${Math.sin(angle * Math.PI/180) * dist}px;
    `;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 600);
  }

  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    osc.start(); osc.stop(ctx.currentTime + 0.12);
  } catch(err){}

  balloonScore++;
  document.getElementById('score-display').textContent = balloonScore;
  document.getElementById('score-msg').textContent = getScoreMsg(balloonScore);

  if(balloonScore < TOTAL_BALLOONS){
    setTimeout(() => {
      const c = document.getElementById('balloons');
      if(c) spawnOneBalloon(c);
    }, Math.random() * 2000 + 1000);
  }
}

function spawnConfetti(){
  const c = document.getElementById('confetti');
  for(let i=0;i<60;i++){
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    const isRect = Math.random()>0.5;
    p.style.cssText = `
      left:${Math.random()*100}%;
      top:0;
      background:${confettiColors[Math.floor(Math.random()*confettiColors.length)]};
      width:${isRect?8:6}px;
      height:${isRect?4:6}px;
      border-radius:${isRect?'2px':'50%'};
      --dur:${Math.random()*3+3}s;
      --delay:${Math.random()*6}s;
    `;
    c.appendChild(p);
  }
}

function spawnMusicNotes(){
  const notes = ['🎵','🎶','♪','♫'];
  const c = document.querySelector('.wish-content');
  for(let i=0;i<8;i++){
    const n = document.createElement('span');
    n.className = 'music-note';
    n.textContent = notes[i%notes.length];
    n.style.cssText = `
      left:${Math.random()*80+10}%;
      bottom:${Math.random()*40+5}%;
      --dur:${Math.random()*2+2}s;
      --delay:${Math.random()*4}s;
      --tx:${(Math.random()-0.5)*60}px;
    `;
    c.appendChild(n);
  }
}

// Cake click
document.getElementById('cake').addEventListener('click', function(){
  this.textContent = '🎂';
  this.style.filter = 'grayscale(0.3)';
  for(let i=0;i<12;i++){
    const spark = document.createElement('span');
    spark.textContent = ['✨','⭐','💫','🌟'][i%4];
    spark.style.cssText = `
      position:fixed;
      left:50%;top:40%;
      font-size:1rem;
      pointer-events:none;
      animation:sparkBurst 0.8s ease forwards;
      --tx:${(Math.random()-0.5)*120}px;
      --ty:${(Math.random()-0.5)*120}px;
    `;
    document.body.appendChild(spark);
    setTimeout(()=>spark.remove(),900);
  }
});
