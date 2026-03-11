function spawnTimerStars(){
  const c = document.getElementById('stars-timer');
  for(let i=0;i<120;i++){
    const s = document.createElement('div');
    s.className = 'star';
    const sz = Math.random()*2.5+0.5;
    s.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random()*100}%;top:${Math.random()*100}%;--d:${Math.random()*4+2}s;--op:${Math.random()*0.7+0.3};animation-delay:${Math.random()*5}s;`;
    c.appendChild(s);
  }
}

function startTimer(){
  const funMsgs = [
    "She's still peacefully unaware this exists. 🤫",
    "Santosh is nervously refreshing this page. 😅",
    "The cake is still theoretical at this point. 🎂",
    "Her students have no idea their Ma'am is this celebrated. 🏫",
    "The pan that burned her finger is also waiting. 🍳",
    "Every second brings her closer to finding out. 👀",
    "She's probably grading papers right now, unaware. 📝",
    "Excitement level: trying to act casual. 😌",
    "She deserves this so much. Just saying. 💛",
    "Tick tock. The birthday queen approaches. 👑",
  ];
  let msgIdx = 0;
  const msgEl = document.getElementById('fun-msg');

  function rotateMsgs(){
    msgEl.style.opacity = '0';
    setTimeout(()=>{
      msgIdx = (msgIdx + 1) % funMsgs.length;
      msgEl.textContent = funMsgs[msgIdx];
      msgEl.style.opacity = '1';
    }, 500);
  }
  setInterval(rotateMsgs, 4000);

  function tick(){
    const now = new Date();
    const target = new Date(now.getFullYear(), 2, 13, 0, 0, 0); // March 13 midnight
    if(now > target) target.setFullYear(target.getFullYear() + 1);
    const diff = target - now;

    if(diff <= 0){
      showPage('page-lock');
      return;
    }

    const days  = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
    const mins  = Math.floor((diff % (1000*60*60)) / (1000*60));
    const secs  = Math.floor((diff % (1000*60)) / 1000);

    document.getElementById('cd-days').textContent  = String(days).padStart(2,'0');
    document.getElementById('cd-hours').textContent = String(hours).padStart(2,'0');
    document.getElementById('cd-mins').textContent  = String(mins).padStart(2,'0');
    document.getElementById('cd-secs').textContent  = String(secs).padStart(2,'0');

    setTimeout(tick, 1000);
  }
  tick();
}
