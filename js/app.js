const _startTime = Date.now();

function getDevice() {
  const ua = navigator.userAgent;
  const mobile = /Mobi|Android/i.test(ua);
  const os = /iPhone|iPad/.test(ua) ? 'iOS'
    : /Android/.test(ua) ? 'Android'
    : /Windows/.test(ua) ? 'Windows'
    : /Mac/.test(ua) ? 'macOS'
    : /Linux/.test(ua) ? 'Linux' : 'unknown';
  const browser = /Edg\//.test(ua) ? 'Edge'
    : /OPR\/|Opera/.test(ua) ? 'Opera'
    : /Chrome\//.test(ua) ? 'Chrome'
    : /Safari\//.test(ua) ? 'Safari'
    : /Firefox\//.test(ua) ? 'Firefox' : 'unknown';
  return { device: mobile ? 'Mobile' : 'Desktop', os, browser };
}

function notify(payload) {
  fetch('https://ipapi.co/json/')
    .then(r => r.json())
    .catch(() => ({}))
    .then(geo => {
      fetch('https://formspree.io/f/xjgaoavy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          ...payload,
          ip: geo.ip || 'unknown',
          city: geo.city || 'unknown',
          region: geo.region || 'unknown',
          country: geo.country_name || 'unknown',
          ...getDevice(),
          time_spent: Math.round((Date.now() - _startTime) / 1000) + 's',
          time: new Date().toLocaleString()
        })
      }).catch(() => {});
    });
}

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

// Spawn welcome page stars
(function(){
  const c = document.getElementById('stars-welcome');
  for(let i=0;i<120;i++){
    const s = document.createElement('div');
    s.className = 'star';
    const sz = Math.random()*2.5+0.5;
    s.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random()*100}%;top:${Math.random()*100}%;--d:${Math.random()*4+2}s;--op:${Math.random()*0.7+0.3};animation-delay:${Math.random()*5}s;`;
    c.appendChild(s);
  }
})();

