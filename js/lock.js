const CORRECT = ['1','3','0','3'];
const pins = [0,1,2,3].map(i=>document.getElementById('p'+i));

pins.forEach((pin,i) => {
  pin.addEventListener('input', e => {
    const v = e.target.value.slice(-1);
    pin.value = v;
    if(v) pin.classList.add('filled');
    if(v && i<3) pins[i+1].focus();
    if(pins.every(p=>p.value)) checkPin();
  });
  pin.addEventListener('keydown', e => {
    if(e.key==='Backspace'&&!pin.value&&i>0) pins[i-1].focus();
  });
  pin.addEventListener('keypress', e => {
    if(!/[0-9]/.test(e.key)) e.preventDefault();
  });
});

function checkPin(){
  const entered = pins.map(p=>p.value);
  if(JSON.stringify(entered)===JSON.stringify(CORRECT)){
    const card = document.getElementById('lock-card');
    card.style.transform='scale(0.95)';
    card.style.opacity='0.6';
    setTimeout(()=>showPage('page-welcome'), 600);
  } else {
    const card = document.getElementById('lock-card');
    card.classList.add('shake');
    document.getElementById('error-msg').textContent = 'Nope! Try again 😄';
    setTimeout(()=>{
      card.classList.remove('shake');
      pins.forEach(p=>{p.value='';p.classList.remove('filled');});
      pins[0].focus();
    }, 600);
  }
}
