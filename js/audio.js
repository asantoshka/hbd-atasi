function playHappyBirthday(){
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if(!AudioCtx) return;
  const ctx = new AudioCtx();

  const BPM = 132;
  const beat = 60 / BPM;

  const C4=261.63,D4=293.66,E4=329.63,F4=349.23,G4=392.00,
        A4=440.00,Bb4=466.16,B4=493.88,
        C5=523.25,D5=587.33,E5=659.25,F5=698.46,G5=783.99,
        C3=130.81,F3=174.61,G3=196.00,Bb3=233.08;

  // Melody
  const melody = [
    [C4,0.75],[C4,0.25],[D4,1],[C4,1],[F4,1],[E4,2],
    [C4,0.75],[C4,0.25],[D4,1],[C4,1],[G4,1],[F4,2],
    [C4,0.75],[C4,0.25],[C5,1],[A4,1],[F4,1],[E4,1],[D4,2],
    [Bb4,0.75],[Bb4,0.25],[A4,1],[F4,1],[G4,1],[F4,3],
  ];

  // Harmony a third below
  const harmony = [
    [A4,0.75],[A4,0.25],[B4,1],[A4,1],[D4,1],[C5,2],
    [A4,0.75],[A4,0.25],[B4,1],[A4,1],[B4,1],[A4,2],
    [A4,0.75],[A4,0.25],[A4,1],[F4,1],[D4,1],[C5,1],[B4,2],
    [G4,0.75],[G4,0.25],[F4,1],[D4,1],[E4,1],[D4,3],
  ];

  // Bass line
  const bass = [
    [F3,2],[C3,2],
    [F3,2],[G3,2],
    [F3,2],[C3,2],[G3,2],
    [Bb3,2],[F3,4],
  ];

  const totalBeats = melody.reduce((s,[,d])=>s+d,0);
  const totalDur   = totalBeats * beat;

  // Master bus with soft limiter
  const master = ctx.createGain();
  master.gain.value = 0.72;
  master.connect(ctx.destination);

  // Shared reverb delay
  const revDelay = ctx.createDelay(0.4);
  revDelay.delayTime.value = 0.22;
  const revFB = ctx.createGain(); revFB.gain.value = 0.28;
  const revOut = ctx.createGain(); revOut.gain.value = 0.18;
  revDelay.connect(revFB); revFB.connect(revDelay);
  revDelay.connect(revOut); revOut.connect(master);

  function note(freq, startT, dBeats, vol, type='triangle', toReverb=true){
    const d = dBeats * beat;
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    const filt = ctx.createBiquadFilter();
    filt.type = 'lowpass';
    filt.frequency.value = type === 'sine' ? 1800 : 3200;
    osc.type = type;
    osc.frequency.value = freq;
    osc.connect(filt); filt.connect(gain); gain.connect(master);
    if(toReverb) gain.connect(revDelay);
    gain.gain.setValueAtTime(0, startT);
    gain.gain.linearRampToValueAtTime(vol, startT + 0.025);
    gain.gain.setValueAtTime(vol * 0.8, startT + d * 0.6);
    gain.gain.exponentialRampToValueAtTime(0.0001, startT + d * 0.94);
    osc.start(startT); osc.stop(startT + d + 0.05);
  }

  function scheduleTrack(track, vol, type, startT, octaveMult=1){
    let t = startT;
    for(const [freq, dur] of track){
      note(freq * octaveMult, t, dur, vol, type);
      t += dur * beat;
    }
  }

  function kick(t){
    const buf  = ctx.createBuffer(1, ctx.sampleRate * 0.35, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for(let i=0;i<data.length;i++) data[i]=(Math.random()*2-1)*Math.exp(-i/(ctx.sampleRate*0.045));
    const src  = ctx.createBufferSource();
    const gain = ctx.createGain();
    const filt = ctx.createBiquadFilter();
    filt.type='lowpass'; filt.frequency.value=130;
    src.buffer=buf; src.connect(filt); filt.connect(gain); gain.connect(master);
    gain.gain.setValueAtTime(0.5,t); gain.gain.exponentialRampToValueAtTime(0.001,t+0.28);
    src.start(t);
  }

  function hihat(t, vol=0.07){
    const buf  = ctx.createBuffer(1, ctx.sampleRate*0.05, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for(let i=0;i<data.length;i++) data[i]=(Math.random()*2-1)*Math.exp(-i/(ctx.sampleRate*0.012));
    const src  = ctx.createBufferSource();
    const gain = ctx.createGain();
    const filt = ctx.createBiquadFilter();
    filt.type='highpass'; filt.frequency.value=7000;
    src.buffer=buf; src.connect(filt); filt.connect(gain); gain.connect(master);
    gain.gain.setValueAtTime(vol,t); gain.gain.exponentialRampToValueAtTime(0.001,t+0.04);
    src.start(t);
  }

  function schedulePerc(startT){
    const bars = Math.ceil(totalBeats / 3);
    for(let b=0;b<bars;b++){
      const barT = startT + b * 3 * beat;
      kick(barT);
      hihat(barT);
      hihat(barT + beat, 0.05);
      hihat(barT + beat*2, 0.05);
    }
  }

  function playSong(startT){
    scheduleTrack(melody,  0.30, 'triangle', startT);
    scheduleTrack(melody,  0.06, 'sine',     startT, 2);
    scheduleTrack(harmony, 0.12, 'sine',     startT);
    scheduleTrack(bass,    0.18, 'sine',     startT);
    schedulePerc(startT);
  }

  let nextStart = ctx.currentTime + 0.1;
  playSong(nextStart);

  function loop(){
    nextStart += totalDur;
    playSong(nextStart);
    setTimeout(loop, (totalDur - 0.7) * 1000);
  }
  setTimeout(loop, (totalDur - 0.7) * 1000);
}
