/* global TrelloPowerUp */
const t = TrelloPowerUp.iframe();
const $sum = document.getElementById('sum');
let listId;

/* читаємо карти списку через Trello REST і рахуємо суму бейджів */
const fetchSum = () => {
  t.getRestApi()
    .get(`/lists/${listId}/cards`, { fields: 'badges' })
    .then(cards => {
      let total = 0;
      cards.forEach(card =>
        (card.badges || []).forEach(badge => {
          const v = parseFloat(badge.text);
          if (!isNaN(v)) total += v;
        })
      );
      $sum.textContent = total % 1 ? total.toFixed(1) : total;
    })
    .catch(() => ($sum.textContent = '?'));
};

t.list('id').then(list => {
  listId = list.id;
  fetchSum();                 // перший підрахунок
  setInterval(fetchSum, 2000); // автооновлення кожні 2 с
});
