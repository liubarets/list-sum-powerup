/* global TrelloPowerUp */
if (window.TrelloPowerUp){
  const t   = TrelloPowerUp.iframe();
  const box = document.getElementById('sum');

  const recalc = () =>
    t.cards('id','shared').then(cards => {
      let total = 0;
      cards.forEach(c => {
        const v = parseFloat(c.shared?.storyPoints);
        if (!isNaN(v)) total += v;
      });
      box.textContent = total % 1 ? total.toFixed(1) : total;
      t.render();
    });

  t.list('id').then(() => {
    recalc();
    setInterval(recalc, 2000);
  });
}
