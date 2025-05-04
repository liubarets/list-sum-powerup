/* global TrelloPowerUp */
const t   = TrelloPowerUp.iframe();
const box = document.getElementById('sum');

/** Повертає суму числових бейджів тільки у ВИДИМИХ картках */
const recalc = () => {
  t.cards('badges').then(cards => {
    let total = 0;
    cards.forEach(card =>
      (card.badges || []).forEach(b => {
        const v = parseFloat(b.text);
        if (!isNaN(v)) total += v;
      })
    );
    box.textContent = total % 1 ? total.toFixed(1) : total;
  }).catch(() => (box.textContent = '?'));
};

recalc();                  // перший підрахунок одразу
setInterval(recalc, 2000); // автооновлення ≤ 2 с
