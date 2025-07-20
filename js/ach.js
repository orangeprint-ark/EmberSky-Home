const achievements = [
  {
    id: 'first_slice',
    title: 'First Slice',
    description: 'Slice your first orange!',
  },
  {
    id: 'slice_10',
    title: 'Orange Slicer',
    description: 'Slice 10 oranges in the Orange Cutter minigame.',
  },
  {
    id: 'slice_50',
    title: 'Master Slicer',
    description: 'Slice 50 oranges in the Orange Cutter minigame.',
  },
  // Add more achievements here...
];

// Save achievement unlocks in localStorage
function getUnlocked() {
  const raw = localStorage.getItem('orangeAchievements');
  return raw ? JSON.parse(raw) : {};
}

function saveUnlocked(unlocked) {
  localStorage.setItem('orangeAchievements', JSON.stringify(unlocked));
}

function unlock(id) {
  const unlocked = getUnlocked();
  if (!unlocked[id]) {
    unlocked[id] = true;
    saveUnlocked(unlocked);
    renderAchievements();
  }
}

function renderAchievements() {
  const container = document.getElementById('achievements-list');
  const unlocked = getUnlocked();
  container.innerHTML = '';

  for (const ach of achievements) {
    const div = document.createElement('div');
    div.className = 'achievement' + (unlocked[ach.id] ? ' unlocked' : '');
    div.innerHTML = `
      <h3>${ach.title}</h3>
      <p>${ach.description}</p>
      <small>${unlocked[ach.id] ? 'Unlocked ✅' : 'Locked 🔒'}</small>
    `;
    container.appendChild(div);
  }
}

// Initialize page achievements
renderAchievements();

// Expose `unlock` globally for other scripts to call
window.orangeAchievements = { unlock, getUnlocked };
