const questions = [
  {
    bg: 'q1',
    num: 'Question 1 of 6 — 👩‍🏫 Profession',
    text: 'A student raises their hand and says "Ma\'am, I don\'t understand anything." It\'s 5 minutes before the bell. Your face does:',
    options: [
      { text: '😊 Lights up — teaching moment!', feedback: 'Absolutely not. No one\'s face does that at 5 minutes to bell. Not even yours. Beautiful fiction though. 😭' },
      { text: '😐 The smile that doesn\'t reach the eyes', feedback: 'Ah yes. The "I am professionally obligated to care right now" expression. Perfected over many semesters. 🎭' },
      { text: '🙂 A slow, deep breath and a forced nod', feedback: 'The nod of someone who has accepted their fate. Deeply relatable. Deeply concerning. 🫡' },
      { text: '😶 Nothing. I have left my body entirely.', feedback: 'Correct. The soul exits the building approximately 3 minutes before the bell. Every time. 👻' }
    ]
  },
  {
    bg: 'q2',
    num: 'Question 2 of 6 — 🔥 Cooking Chronicles',
    text: 'You\'re cooking. Everything smells incredible. You reach over the pan confidently and then — it happens. Your finger meets hot oil. First thought?',
    options: [
      { text: '🤬 Words that would get me suspended from my own class', feedback: 'The kitchen has heard things the classroom never will. And honestly? Completely fair. 🔊' },
      { text: '🧊 Cold water. Immediately. I\'m fine. I\'m totally fine.', feedback: 'Stoic. Strong. Absolutely still dying on the inside. A true performer. 🎬' },
      { text: '📞 Call Santosh and ask what to do', feedback: 'Honestly the most unhinged and yet somehow wholesome response. He would absolutely panic too. 😅' },
      { text: '📱 Google "is this bad" while still holding the spoon', feedback: 'One hand burned, one hand Googling, one eye on the curry. Peak human multitasking. 💪' }
    ]
  },
  {
    bg: 'q3',
    num: 'Question 3 of 6 — 🔥 Cooking Chronicles',
    text: 'After the burn incident, someone asks "how\'s the cooking going?" You say:',
    options: [
      { text: '😎 "Great! Just adding some character to the dish."', feedback: 'Unshakeable confidence. The finger is fine. The ego is intact. Respect. 💅' },
      { text: '😅 "Good! Minor casualties but overall a success."', feedback: 'Minor casualties. Finger not included in the success metrics. Accurate summary. 📊' },
      { text: '🙂 "It\'s going well!" — and show nothing', feedback: 'The same face you use when a student says they studied. Practiced. Flawless. 🎭' },
      { text: '😶 "I don\'t want to talk about it."', feedback: 'Respect the boundary. The kitchen has trauma. We move on. 🚶' }
    ]
  },
  {
    bg: 'q5',
    num: 'Question 5 of 7 — 🌟 You\'re the Best',
    text: 'Your students secretly agree on something. What is it most likely to be?',
    options: [
      { text: '😌 "She\'s strict but actually we learn the most from her"', feedback: 'The highest compliment students give. They\'ll admit it publicly in about 10 years. 🏅' },
      { text: '🤩 "She\'s genuinely the coolest teacher we have"', feedback: 'Also very likely true. Some teachers just have it. You have it. Undeniable. ✨' },
      { text: '😂 "She roasts us but we love her for it"', feedback: 'The rare and powerful combo of feared + loved. Only the best teachers pull this off. 👑' },
      { text: '🥹 "We hope she knows how much she matters"', feedback: 'This one\'s real. They probably don\'t say it. But they mean it. And so does everyone here. 💛' }
    ]
  },
  {
    bg: 'q6',
    num: 'Question 5 of 6 — 🌟 You\'re the Best',
    text: 'If someone had to describe you in one sentence, which lands closest to the truth?',
    options: [
      { text: '✨ "Effortlessly the most capable person in the room"', feedback: 'Accurate. And the frustrating part? She doesn\'t even try. She just IS. 💫' },
      { text: '😄 "Funny, sharp, and somehow always right"', feedback: 'Three things. All true. No notes. No corrections. Just facts. 📋' },
      { text: '💛 "The kind of person you\'re genuinely glad exists"', feedback: 'This is it. This is the one. Some people just make the world better by being in it. 🌍' },
      { text: '🔥 "Dangerous in the kitchen, unstoppable everywhere else"', feedback: 'The most balanced and complete description of a human being ever written. We\'re done here. 🏆' }
    ]
  },
  {
    bg: 'q7',
    num: 'Question 7 of 7 — 🕵️ About the Mystery Person',
    text: 'Someone named Santosh made you this site. You met him on an aisle. He is probably:',
    options: [
      { text: '🛒 A guy who noticed you between the snacks and the dairy section', feedback: 'Correct. He saw you, panicked mildly, and later built a website. As one does. 😅' },
      { text: '🤔 Someone with way too much time and very good taste', feedback: 'The time part is debatable. The taste part — spot on. He did pick you to celebrate, after all. 😌' },
      { text: '😄 A little unhinged but in a sweet way', feedback: 'Building a birthday site for someone you just met IS slightly unhinged. But here we are. Happy Birthday! 🎂' },
      { text: '💛 Someone who just genuinely thinks you\'re worth celebrating', feedback: 'That\'s the one. That\'s exactly it. Happy Birthday, Atasi. 🎉' }
    ]
  }
];

const balloonColors = ['#e8647a','#f7c5cc','#d4a853','#a8d8ea','#b8e0d2','#f4a261','#e76f51'];
const confettiColors = ['#e8647a','#d4a853','#a8d8ea','#b8e0d2','#f4a261','#c084fc','#f472b6'];
const TOTAL_BALLOONS = 25;

const scoreMessages = [
  [1,  "First one down! 🎈"],
  [5,  "5 down! She means business 💅"],
  [10, "Halfway there! Unstoppable teacher energy 🏆"],
  [15, "15! The kitchen may fear her but balloons fear her more 🔥"],
  [20, "20! Almost there, finish them! 👀"],
  [25, "PERFECT SCORE! 🎉 Every. Single. One. Queen behaviour."],
];
