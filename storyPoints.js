/* global TrelloPowerUp */
const t = TrelloPowerUp.iframe();
const VALUES = [0.5,1,2,3,5,8,13,21];

const render = current => {
  document.body.innerHTML = '';
  VALUES.forEach(v => {
    const b = document.createElement('button');
    b.textContent = v;
    if (v === current) b.classList.add('active');
    b.onclick = () => t.set('card','shared','storyPoints',v)
                       .then(() => t.closeModal());
    document.body.appendChild(b);
  });

  // кнопка Remove
  const rm = document.createElement('button');
  rm.textContent = 'Remove';
  rm.style.borderColor = '#e33'; rm.style.color = '#e33';
  rm.onclick = () => t.remove('card','shared','storyPoints')
                      .then(() => t.closeModal());
  document.body.appendChild(rm);
};

t.get('card','shared','storyPoints').then(val => render(val));
