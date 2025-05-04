/* global TrelloPowerUp */
if (window.TrelloPowerUp){
  const t = TrelloPowerUp.iframe();
  const box = document.getElementById('sum');
  let listId;

  const recalc = () => {
    t.cards('id','shared').then(cards => {
      let tot = 0;
      cards.forEach(c => {
        const v = parseFloat(c.shared?.storyPoints);
        if (!isNaN(v)) tot += v;
      });
      box.textContent = tot % 1 ? tot.toFixed(1) : tot;
      t.render();
    });
  };

  t.list('id').then(l=>{
    listId = l.id;
    recalc();
    setInterval(recalc,2000);
  });
}
