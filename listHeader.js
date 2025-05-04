/* global TrelloPowerUp */
const t = TrelloPowerUp.iframe();
const $sum = document.getElementById('sum');
let listId;

const fetchSum = () => {
  t.getRestApi()
    .get(`/lists/${listId}/cards`, { fields: 'badges' })
    .then(cards => {
      let total = 0;
      cards.forEach(c =>
        (c.badges || []).forEach(b => {
          const v = parseFloat(b.text);
          if (!isNaN(v)) total += v;
        })
      );
      $sum.textContent = total % 1 ? total.toFixed(1) : total;
    })
    .catch(() => ($sum.textContent = '?'));
};

t.list('id').then(l => {
  listId = l.id;
  fetchSum();                 // перший підрахунок
  setInterval(fetchSum, 2000); // автооновлення ≤ 2 с
});
