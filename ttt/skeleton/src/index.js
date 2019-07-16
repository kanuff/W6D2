const View = require('./ttt-view.js');
const Game = require('../../solution/game')

$(() => {
  // Your code here
  const $ttt = $('.ttt');
  window.game = new Game();
  window.view = new View(window.game, $ttt);
  window.view.setupBoard();
  window.view.bindEvents();

});
