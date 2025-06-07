
const processes = [
  { name: "熱氧化", match: "形成二氧化矽絕緣層" },
  { name: "PVD", match: "物理撞擊方式沉積金屬層" },
  { name: "CVD", match: "氣體反應沉積絕緣或導電薄膜" },
  { name: "ALD", match: "原子級控制層層沉積薄膜" },
  { name: "光阻塗佈", match: "提供可曝光轉印圖案的感光層" },
  { name: "擴散", match: "高溫下摻雜雜質形成PN接面" }
];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startMatchGame() {
  document.getElementById('main-menu').classList.add('hidden');
  document.getElementById('game-screen').classList.remove('hidden');

  const leftCol = document.getElementById('left-column');
  const rightCol = document.getElementById('right-column');

  leftCol.innerHTML = '';
  rightCol.innerHTML = '';

  const leftItems = shuffle([...processes]);
  const rightItems = shuffle([...processes]);

  leftItems.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'draggable';
    div.textContent = item.name;
    div.setAttribute('draggable', true);
    div.setAttribute('data-name', item.name);
    div.addEventListener('dragstart', dragStart);
    leftCol.appendChild(div);
  });

  rightItems.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'droppable';
    div.textContent = item.match;
    div.setAttribute('data-match', item.name);
    div.addEventListener('dragover', dragOver);
    div.addEventListener('drop', dropItem);
    rightCol.appendChild(div);
  });
}

function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.getAttribute('data-name'));
}

function dragOver(e) {
  e.preventDefault();
}

function dropItem(e) {
  e.preventDefault();
  const draggedName = e.dataTransfer.getData('text/plain');
  e.target.textContent = `${e.target.textContent}\n👉 ${draggedName}`;
  e.target.setAttribute('data-answer', draggedName);
}

function checkMatches() {
  const droppables = document.querySelectorAll('.droppable');
  let correct = 0;

  droppables.forEach(div => {
    const correctAnswer = div.getAttribute('data-match');
    const userAnswer = div.getAttribute('data-answer');
    if (correctAnswer === userAnswer) {
      div.style.backgroundColor = '#c8f7c5';
      correct++;
    } else {
      div.style.backgroundColor = '#f7c5c5';
    }
  });

  document.getElementById('game-screen').classList.add('hidden');
  document.getElementById('result-screen').classList.remove('hidden');
  document.getElementById('result-message').textContent =
    `你答對了 ${correct} / ${processes.length} 題！`;
}
