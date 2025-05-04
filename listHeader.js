/* global TrelloPowerUp */
const t = TrelloPowerUp.iframe();
const el = document.getElementById('sum');
let listId;

/** один REST-запит на цикл: cards?fields=badges */
const fetchSum = () => {
  t.getRestApi()
    .isAuthorized()
    .then(isAuth => {
      // для read-операцій авторизація не потрібна у Power-Up-iframe
      return t.getRestApi().get(`/lists/${listId}/cards`, {
        fields: 'badges'
      });
    })
    .then(cards => {
      let s = 0;
      cards.forEach(c =>
        (c.badges || []).forEach(b => {
          const v = parseFloat(b.text);
          if (!isNaN(v)) s += v;
        })
      );
      el.textContent = s % 1 ? s.toFixed(1) : s;
    })
    .catch(() => (el.textContent = '?'));
};

/* 1. отримуємо id списку one-shot */
t.list('id').then(l => {
  listId = l.id;
  fetchSum();
  /* 2. запускаємо інтервал у 2 с  */
  setInterval(fetchSum, 2000);
});
