/* global TrelloPowerUp */
TrelloPowerUp.initialize({

  // ▶ додаємо кнопку у кожну картку
  'card-buttons': () => [{
    text: 'Story Points',
    icon: 'https://img.icons8.com/ios/20/000000/counter.png',
    callback: t => t.popup({
      title: 'Story Points',
      url: './storyPoints.html',
      height: 160
    })
  }]

});
