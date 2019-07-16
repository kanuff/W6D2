class View {
  constructor(game, $el) {
    this.game = game;
    this.el = $el;
    this.board = [];
    this.selected = false;
    this.startTower = null;
    this.endTower = null; 

    this.setupTowers();
    this.clickTower();
  }
}

View.prototype.setupTowers = function () {
  
  for (let i = 0; i < 3; i += 1) {
    const $ul = $('<ul>');
    $ul.data("position", parseInt(i));
    $ul.addClass("tower");
    this.board.push($ul);
  }
  
  for (let i= 0; i < 3; i++){
    const $li = $("<li>");
    $li.data("size", i+1)
    $li.css({
      "width" : `${(i + 1) * 33}%`
    })
    $li.addClass("disc");
    this.board[0].append($li);
  
  }

  this.board.forEach((tower) => {
    this.el.append(tower);
  })
}

View.prototype.clickTower = function() {
  this.el.on("click", "ul", (e) => {
    if (this.selected){
      this.endTower = $(e.currentTarget);
    } else {
      this.startTower = $(e.currentTarget);
      this.startTower.toggleClass("selected")
    }


    this.selected = !this.selected;

    if (this.endTower !== null){

      if (!this.game.move(this.startTower.data("position"), this.endTower.data("position"))) {
        alert("Invalid move bad");
      } else {
        this.render();
        if (this.game.isWon()){
          const $h4 = $("<h4>");
          $h4.append("Good job you")
          this.el.append($h4)

          $("li").css({
            "background-color" : "green"
          })
        }
      }
      
      this.startTower.toggleClass("selected")
      this.startTower = null;
      this.endTower = null;

    }  
  })
}

View.prototype.render = function () {
  const $firstLi = this.startTower.children()[0];
  console.log($firstLi)
  this.endTower.prepend($firstLi);
}

module.exports = View;