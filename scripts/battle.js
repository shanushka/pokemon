Battle = function(playerObj, gameObj, preloader) {
  battleBackground = preloader.getImage('battleBackground');
  hpOpponent = preloader.getImage('hpOpponent');
  hpPlayer = preloader.getImage('hpPlayer');
  attackBackground = preloader.getImage('attackBackground');
  attackBtn = preloader.getImage('attackBtn');
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
  const MessageBox = {
    x: 270,
    y: 350,
    width: 512,
    height: 83
  };
  const battleBackgrd ={
    x : 270,
    y : 10,
    width : 512,
    height : 340
  }

  const totalHpWildPokemon = playerObj.wildPokemon.hp;
  const totalHpPokemon = playerObj.pokemon.hp;
  var isPlayerTurn = true;
  var hpOpponentIndicator = playerObj.wildPokemon.hp;
  var hpPlayerIndicator = playerObj.pokemon.hp;
  var isFinished = false;

  this.transitionToBattle = function() {
    var that = this;
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
    }, 200);
  };

  drawImages = function() {
    ctx.drawImage(battleBackground, battleBackgrd.x,battleBackgrd.y, battleBackgrd.width, battleBackgrd.height);
    playerObj.pokemon.drawPokemon(114);
    playerObj.wildPokemon.drawPokemon(0);
    ctx.drawImage(hpPlayer, 504, 270, 249, 73);
    ctx.drawImage(hpOpponent, 284, 110, 249, 73);
    ctx.font = "14px Comic Sans MS";
    ctx.fillText("Opponent : " + playerObj.wildPokemon.name, 288, 140);
    ctx.fillText("Player : " + playerObj.pokemon.name, 536, 297);
    ctx.fillText(playerObj.wildPokemon.level, 458, 145);
    ctx.fillText(playerObj.pokemon.level, 716, 299);
    ctx.fillStyle = "green";
    ctx.fillRect(644, 309, hpPlayerIndicator, 6);
    ctx.fillRect(388, 160, hpOpponentIndicator, 6);
  };

  this.createBattle = function() {
      drawImages();
      ctx.drawImage(attackBackground, MessageBox.x, MessageBox.y, MessageBox.width, MessageBox.height);
      ctx.drawImage(attackBtn, buttonOne.x, buttonOne.y, buttonOne.width, buttonOne.height);
      ctx.drawImage(attackBtn, buttonTwo.x, buttonTwo.y, buttonTwo.width, buttonTwo.height);
      ctx.drawImage(attackBtn, buttonThree.x, buttonThree.y, buttonThree.width, buttonThree.height);
      ctx.drawImage(attackBtn, buttonFour.x, buttonFour.y, buttonFour.width, buttonFour.height);
      ctx.fillStyle = "black";
      ctx.fillText("What will " + playerObj.pokemon.name + " do ?", 300, 380);
      ctx.fillText(Object.keys(playerObj.pokemon.attacks)[0], 564, 380);
      ctx.fillText(Object.keys(playerObj.pokemon.attacks)[1], 680, 380);
      ctx.fillText(Object.keys(playerObj.pokemon.attacks)[2], 564, 414);
      ctx.fillText(Object.keys(playerObj.pokemon.attacks)[3], 680, 414);
  };

  drawHpOppnonet = function(selectedAttack) {
    let counter = 0;
    var intervalMovement = setInterval(function() {
      counter++;
      ctx.clearRect(270, 10, 512, 340);
      drawImages();
      playerObj.pokemon.animatePokemon();
      if (counter > 20) {
        clearInterval(intervalMovement);
      }
    }, 50);
    this.hpWildPokemon = parseInt(playerObj.wildPokemon.hp);
    this.hpWildPokemon -= parseInt(selectedAttack);
    playerObj.wildPokemon.hp = this.hpWildPokemon;
    hpOpponentIndicator = Math.floor((this.hpWildPokemon / totalHpWildPokemon) * 100);
    var hold = setTimeout(function() {
      if (!isFinished) {
        drawHpPlayer();
      }
    }, 2500);
    if (this.hpWildPokemon < 10) {
      winMessage("You Win !!!");
    }
    if (this.hpPlayerPokemon < 10) {
      winMessage("You Lose !!!");
    }
  }
  
  drawHpPlayer = function() {
    let counter = 0;
    var intervalMovement = setInterval(function() {
      counter++;
      ctx.clearRect(270, 10, 512, 340);
      drawImages();
      playerObj.wildPokemon.animatePokemon();
      if (counter > 20) {
        clearInterval(intervalMovement);
      }
    }, 50);
    var randomindex = Math.floor(Math.random() * (3 - 0) + 0);
    var opponentAttack = Object.entries(playerObj.wildPokemon.attacks)[randomindex];
    this.hpPlayerPokemon = parseInt(playerObj.pokemon.hp);
    this.hpPlayerPokemon -= parseInt(opponentAttack[1]);
    playerObj.pokemon.hp = this.hpPlayerPokemon;
    hpPlayerIndicator = Math.floor((this.hpPlayerPokemon / totalHpPokemon) * 100);
    ctx.clearRect(270, 10, 512, 340);
    drawImages();
    isPlayerTurn = true;
  };

  function winMessage(message) {
    isFinished = true;
    ctx.clearRect(270, 350, 512, 83);
    ctx.drawImage(attackBackground, 270, 350, 512, 83);
    ctx.drawImage(attackBtn, buttonTwo.x, buttonTwo.y, 110, 32);
    ctx.fillStyle = "black";
    ctx.font = "12px Cursive";
    if (message === "You Win !!!") {
      ctx.drawImage(attackBtn, buttonOne.x, buttonOne.y, 110, 32);
      ctx.fillText("Catch pokemon", buttonOne.x + 15, buttonOne.y + 20);
    }
    ctx.fillText("Return to Game", buttonTwo.x + 15, buttonTwo.y + 20);
    ctx.font = "18px Cursive";
    ctx.fillText(message, 340, 380);
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

  catchPokemon = function() {
    ctx.clearRect(270, 10, 512, 340);
    ctx.drawImage(battleBackground, 270, 10, 512, 340);
   // ctx.drawImage(imageWildPokemon, 0, 0, 56, 56, 604, 121, 112, 112);
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.arc(650, 181, 50, 0, 2 * Math.PI);
    ctx.stroke();
    playerObj.pokemonArray.push(playerObj.wildPokemon);
    console.log("pokemonplayers", playerObj.pokemonArray);
  };

  returnToGame = function() {
    isBattleOn = false;
    
    canvas.removeEventListener("click", battleListener);
    gameObj.loop();
  };
  function battleListener(evt) {
    var mousePos = getMousePos(canvas, evt);
    if (isPlayerTurn && !isFinished) {
      if (isInside(mousePos, buttonTwo)) {
        drawHpOppnonet(Object.values(playerObj.pokemon.attacks)[1]);
        isPlayerTurn = false;
      }
      if (isInside(mousePos, buttonOne)) {
        drawHpOppnonet(Object.values(playerObj.pokemon.attacks)[0]);
        isPlayerTurn = false;
      }
      if (isInside(mousePos, buttonThree)) {
        drawHpOppnonet(Object.values(playerObj.pokemon.attacks)[2]);
        isPlayerTurn = false;
      }
      if (isInside(mousePos, buttonFour)) {
        drawHpOppnonet(Object.values(playerObj.pokemon.attacks)[3]);
        isPlayerTurn = false;
      }
    }
    if (isFinished) {
      if (isInside(mousePos, buttonOne)) {
        catchPokemon();
      }
      if (isInside(mousePos, buttonTwo)) {
        returnToGame();
      }
    }
  }
  canvas.addEventListener("click", battleListener);
};
