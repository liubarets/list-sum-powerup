/* global TrelloPowerUp */
const t = TrelloPowerUp.iframe();

Promise.all([
  t.cards('id', 'badges')
]).then(([cards]) => {
  let sum = 0;
  cards.forEach(card => {
    (card.badges || []).forEach(b => {
      const v = parseFloat(b.text);
      if (!isNaN(v)) sum += v;
    });
  });

  t.send('message', {
    badges: [{
      text: sum % 1 ? sum.toFixed(1) : sum,
      color: 'blue',
      refresh: 30
    }]
  });
});
