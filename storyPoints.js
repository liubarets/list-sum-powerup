/* global TrelloPowerUp */
const t = TrelloPowerUp.iframe();
const VALUES = [0.5,1,2,3,5,8,13,21];

const render = cur => {
  document.body.innerHTML = '';
  VALUES.forEach(v => {
    const b = document.createElement('button');
    b.textContent = v;
    if (v === cur) b.classList.add('active');
    b.onclick = () => t.set('card','shared','storyPoints',v)
                       .then(() => t.closeModal());
    document.body.appendChild(b);
  });
  const rm = document.createElement('button');
  rm.id='remove'; rm.textContent='Remove';
  rm.onclick = () => t.remove('card','shared','storyPoints')
                     .then(() => t.closeModal());
  document.body.appendChild(rm);
};

t.get('card','shared','storyPoints').then(render);
