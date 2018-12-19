var battleBackground = new Image();
var imagePokemonPlayer = new Image();
var imageWildPokemon = new Image();
var hpPlayer = new Image();
var hpOpponent = new Image();
var attackBackground = new Image();
var attackBtn = new Image();
battleBackground.src = "./images/battleBackground.png";

Battle = function(playerObj, gameLoop) {
  var that = this;
  var buttonOne = {
    x: 534,
    y: 358,
    width: 110,
    height: 32
  };
  var buttonTwo = {
    x: 650,
    y: 358,
    width: 110,
    height: 32
  };
  var buttonThree = {
    x: 534,
    y: 392,
    width: 110,
    height: 32
  };
  var buttonFour = {
    x: 650,
    y: 392,
    width: 110,
    height: 32
  };
  var MessageBox = {
    x: 270,
    y: 350,
    width: 512,
    height: 83
  };

  const totalHpWildPokemon = playerObj.wildPokemon.hp;
  const totalHpPokemon = playerObj.pokemon.hp;
  var isPlayerTurn = true;
  var hpOpponentIndicator = 100;
  var hpPlayerIndicator = 100;
  var isFinished = false;
  this.transitionToBattle = function() {
    var that = this;
    console.log("g", gameLoop);
    this.opacity = 0;
    const hold = setInterval(function() {
      that.opacity += 0.1;
      ctx.fillStyle = "rgba(0,0,0," + that.opacity + ")";
      ctx.fillRect(0, 0, width, height);
      if (that.opacity >= 1) {
        clearInterval(hold);
        ctx.clearRect(0, 0, width, height);
        that.createBattle();
      }
    }, 500);
  };

  this.createBattle = function() {
    imagePokemonPlayer.src = playerObj.pokemon.img;
    imageWildPokemon.src = playerObj.wildPokemon.img;
    hpOpponent.src = "./images/hp_opponent.png";
    hpPlayer.src = "./images/hp_trainer.png";
    attackBackground.src = "./images/attackrect.png";
    attackBtn.src = "./images/attack.png";
    imagePokemonPlayer.onload = function() {
      ctx.drawImage(battleBackground, 270, 10, 512, 340);
      ctx.drawImage(imageWildPokemon, 0, 0, 56, 56, 604, 121, 112, 112);
      ctx.drawImage(imagePokemonPlayer, 114, 0, 56, 56, 355, 230, 112, 112);
      ctx.drawImage(hpPlayer, 504, 270, 249, 73);
      ctx.drawImage(hpOpponent, 284, 110, 249, 73);
      ctx.drawImage(attackBackground, 270, 350, 512, 83);
      ctx.drawImage(attackBtn, buttonOne.x, buttonOne.y, 110, 32);
      ctx.drawImage(attackBtn, buttonTwo.x, buttonTwo.y, 110, 32);
      ctx.drawImage(attackBtn, buttonThree.x, buttonThree.y, 110, 32);
      ctx.drawImage(attackBtn, buttonFour.x, buttonFour.y, 110, 32);
      ctx.font = "14px Comic Sans MS";
      ctx.fillText("Opponent : " + playerObj.wildPokemon.name, 288, 140);
      ctx.fillText("Player : " + playerObj.pokemon.name, 536, 297);
      ctx.fillText("What will " + playerObj.pokemon.name + " do ?", 300, 380);
      ctx.fillText(playerObj.wildPokemon.level, 458, 145);
      ctx.fillText(playerObj.pokemon.level, 716, 299);
      ctx.fillText(Object.keys(playerObj.pokemon.attacks)[0], 564, 380);
      ctx.fillText(Object.keys(playerObj.pokemon.attacks)[1], 680, 380);
      ctx.fillText(Object.keys(playerObj.pokemon.attacks)[2], 564, 414);
      ctx.fillText(Object.keys(playerObj.pokemon.attacks)[3], 680, 414);
      ctx.fillStyle = "green";
      ctx.fillRect(644, 309, hpPlayerIndicator, 6);
      ctx.fillRect(388, 160, hpOpponentIndicator, 6);
    };
  };
  drawHp = function(selectedAttack) {
    this.hpWildPokemon = parseInt(playerObj.wildPokemon.hp);
    this.hpWildPokemon -= parseInt(selectedAttack);
    playerObj.wildPokemon.hp = this.hpWildPokemon;
    ctx.clearRect(388, 160, hpOpponentIndicator, 6);
    hpOpponentIndicator = Math.floor((this.hpWildPokemon / totalHpWildPokemon) * 100);
    ctx.fillRect(388, 160, hpOpponentIndicator, 6);

    var hold = setTimeout(function() {
      var randomindex = Math.floor(Math.random() * (3 - 0) + 0);
      var opponentAttack = Object.entries(playerObj.wildPokemon.attacks)[randomindex];
      this.hpPlayerPokemon = parseInt(playerObj.pokemon.hp);
      this.hpPlayerPokemon -= parseInt(opponentAttack[1]);
      playerObj.pokemon.hp = this.hpPlayerPokemon;
      ctx.clearRect(644, 309, hpPlayerIndicator, 6);
      hpPlayerIndicator = Math.floor((this.hpPlayerPokemon / totalHpPokemon) * 100);
      ctx.fillRect(644, 309, hpPlayerIndicator, 6);
      console.log("attack", opponentAttack[1]);
      console.log("hpPlayer", this.hpPlayer);
      isPlayerTurn = true;
    }, 2500);
    if (this.hpWildPokemon < 25) {
      winMessage("You Win !!!");
      isFinished = true;
    }
    if (this.hpPlayerPokemon < 25) {
      winMessage("You Lose !!!");
      isFinished = true;
    }
  };

  function winMessage(message) {
    ctx.clearRect(270, 350, 512, 83);
    ctx.drawImage(attackBackground, 270, 350, 512, 83);
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(message + "Press here to return back to the game", 310, 400);
  }

  function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  function isInside(pos, rect) {
    return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y;
  }

  canvas.addEventListener("click", function(evt) {
    var mousePos = getMousePos(canvas, evt);
    if (isPlayerTurn && !isFinished) {
      if (isInside(mousePos, buttonTwo)) {
        drawHp(Object.values(playerObj.pokemon.attacks)[1]);
        isPlayerTurn = false;
      }
      if (isInside(mousePos, buttonOne)) {
        drawHp(Object.values(playerObj.pokemon.attacks)[0]);
        isPlayerTurn = false;
      }
      if (isInside(mousePos, buttonThree)) {
        drawHp(Object.values(playerObj.pokemon.attacks)[2]);
        isPlayerTurn = false;
      }
      if (isInside(mousePos, buttonFour)) {
        drawHp(Object.values(playerObj.pokemon.attacks)[3]);
        isPlayerTurn = false;
      }
    }

    if (isFinished && isInside(mousePos, MessageBox)) {
      console.log("clicked");
    }
  });
};
