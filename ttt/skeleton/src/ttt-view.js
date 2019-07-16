class View {
  constructor(game, $el) {
    this.game = game;
    this.el = $el;
    this.over = false;
  }

  bindEvents() {}

  makeMove($square) {}

  setupBoard() {}
}

View.prototype.setupBoard = function(){
  const $ul = $('<ul>');

  $ul.addClass('board')

  for (let i = 0; i < 9; i++) {
    const $li = $('<li>');
    $li.data("pos", [Math.floor(i/3) , i % 3])
    $li.addClass('not-highlighted')
    $ul.append($li);
  }

  this.el.append($ul);
}

View.prototype.bindEvents = function(){
  this.el.on("click", "li", (e) => {
    if (!this.over){
      const $li = $(e.target);
      $li.css({
        "background-color" : "white"
      })
      this.makeMove(e);
    }
  })

}

View.prototype.makeMove = function(e){
  const $li = $(e.target);
  const pos = $li.data("pos");
  const currentPlayer = this.game.currentPlayer;

  try {
    this.game.playMove(pos);
    $li.text(`${currentPlayer}`);
    if (this.game.isOver()){
      this.over = true;
    }
  } catch (err) {
    alert(`${err.msg}`)
  }

  if (this.over){
    this.gameover(currentPlayer);
  }
  
}

View.prototype.gameover = function (currentPlayer){
    const $div = $("<div>");
    const $h1 = $("<h4>");
    $h1.append(`You win, ${currentPlayer}!`);
    $div.append($h1);
    $div.addClass("win-message");
    this.el.append($div);
    const $lis = $("li");

    $lis.css({
      "background-color" : "white"
    })

    const $winLis = $(`li:contains(${currentPlayer})`);
    $winLis.css({
      "background-color" : "green",
      "color" : "white",
    })

    const $loseLis = $(`li:contains(${this.game.currentPlayer})`);
    $loseLis.css({
      "color" : "red",
    })
}

module.exports = View;
