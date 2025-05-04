/* global TrelloPowerUp */

if (window.TrelloPowerUp) {          // ← щоб при прямому відкритті у браузері не падало
  const t   = TrelloPowerUp.iframe();
  const box = document.getElementById('sum');

  const recalc = () => {
    t.cards('badges').then(cards => {
      let total = 0;
      cards.forEach(c =>
        (c.badges || []).forEach(b => {
          const v = parseFloat(b.text);
          if (!isNaN(v)) total += v;
        })
      );
      box.textContent = total % 1 ? total.toFixed(1) : total;
    }).catch(() => (box.textContent = '?'));
  };

  recalc();                 // одразу
  setInterval(recalc, 2000); // автооновлення
}
