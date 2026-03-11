// DEV FLAG — set to false before sending to Atasi
const DEV_SKIP_TIMER = false;

function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if(id==='page-quiz') renderQuestion();
}

// Spawn lock page stars
(function(){
  const c = document.getElementById('stars');
  for(let i=0;i<120;i++){
    const s = document.createElement('div');
    s.className = 'star';
    const sz = Math.random()*2.5+0.5;
    s.style.cssText = `
      width:${sz}px;height:${sz}px;
      left:${Math.random()*100}%;top:${Math.random()*100}%;
      --d:${Math.random()*4+2}s;
      --op:${Math.random()*0.7+0.3};
      animation-delay:${Math.random()*5}s;
    `;
    c.appendChild(s);
  }
})();

// Birthday check — show timer if not yet 13th March midnight
(function(){
  const now = new Date();
  const isBirthday = now.getMonth() === 2 && now.getDate() === 13;
  if (!isBirthday && !DEV_SKIP_TIMER) {
    document.getElementById('page-timer').classList.add('active');
    document.getElementById('page-lock').classList.remove('active');
    startTimer();
    spawnTimerStars();
  }
})();
