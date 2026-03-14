let currentQ = 0;
const quizAnswers = [];

function renderQuestion(){
  const q = questions[currentQ];
  document.getElementById('quiz-bg').className = `quiz-bg ${q.bg}`;
  document.getElementById('question-num').textContent = q.num;
  document.getElementById('question-text').textContent = q.text;
  document.getElementById('feedback-box').className = 'feedback-box';
  document.getElementById('feedback-box').textContent = '';
  document.getElementById('next-btn').className = 'next-btn';

  // progress dots
  const prog = document.getElementById('quiz-progress');
  prog.innerHTML = '';
  questions.forEach((_,i)=>{
    const dot = document.createElement('div');
    dot.className = 'progress-dot' + (i<currentQ?' done':i===currentQ?' active':'');
    prog.appendChild(dot);
  });

  const opts = document.getElementById('options');
  opts.innerHTML = '';
  q.options.forEach((opt)=>{
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt.text;
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.option-btn').forEach(b=>b.classList.remove('selected'));
      btn.classList.add('selected');
      quizAnswers[currentQ] = { answer: opt.text, feedback: opt.feedback };
      const fb = document.getElementById('feedback-box');
      fb.textContent = opt.feedback;
      fb.className = 'feedback-box show';
      document.getElementById('next-btn').className = 'next-btn show';
    });
    opts.appendChild(btn);
  });

  // animate in
  const qc = document.querySelector('.quiz-container');
  qc.style.opacity='0'; qc.style.transform='translateY(20px)';
  requestAnimationFrame(()=>{
    qc.style.transition='opacity 0.4s ease, transform 0.4s ease';
    qc.style.opacity='1'; qc.style.transform='translateY(0)';
  });
}

document.getElementById('next-btn').addEventListener('click',()=>{
  currentQ++;
  if(currentQ < questions.length){
    renderQuestion();
  } else {
    const body = {};
    questions.forEach((q, i) => {
      const a = quizAnswers[i];
      body[`Q${i + 1}_question`] = q.text;
      body[`Q${i + 1}_answer`]   = a ? a.answer   : '(skipped)';
      body[`Q${i + 1}_comment`]  = a ? a.feedback : '(skipped)';
    });
    notify(body);
    showPage('page-wish');
    launchWish();
  }
});
