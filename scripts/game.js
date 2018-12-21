canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var height = document.documentElement.clientHeight;
var width = document.documentElement.clientWidth;
var size = 32;
var pointer = { x: 0, y: 0 }; // The adjusted mouse position

//playerImage.src = "./images/player.png";
var isBattleOn = false;
function Game(pokemonId,preloader) {
  // container.appendChild(scoreBoard);
  var player = new Player(300, 1005, pokemonId,preloader);
  var viewport = new Viewport(0, 0, 800, 800);
  var fps, fpsInterval, startTime, now, then, elapsed;
  this.dirX = 0;
  this.dirY = 0;
  var that = this;
  this.isKeyDown = false;
  this.spriteHeight = 0;
  window.addEventListener("keydown", keyDownEvent);
  window.addEventListener("keyup", keyUpEvent);

  this.startBattle = function() {
    var battle = new Battle(player, that, preloader);
    battle.transitionToBattle();
  };
  // initialize the timer variables and start the animation
  this.startAnimating = function(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    this.loop();
  };
  this.loop = function() {
    var map = new Map(viewport,preloader);
    // ctx.clearRect(0,0,width,height);
    if (isBattleOn) {
      scoreBoard.remove();
      this.startBattle();
      return;
    }
    container.appendChild(scoreBoard);
    requestAnimationFrame(that.loop.bind(this));
    now = Date.now();
    elapsed = now - then;
    // if enough time has elapsed, draw the next frame
    if (elapsed > fpsInterval) {
      // Get ready for next frame by setting then=now, but also adjust for your
      // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
      then = now - (elapsed % fpsInterval);
      var height = document.documentElement.clientHeight;
      var width = document.documentElement.clientWidth;
      /* Resize canvas on every frame */
      canvas.height = height;
      canvas.width = width;
      viewport.scrollTo(player.x, player.y);
      map.drawMap();
      if (this.isKeyDown) {
        player.moveTo(this.dirX, this.dirY, map, canvas.width, canvas.height);
        player.updateSprite(this.spriteHeight);
      }
      player.drawPlayer(viewport);
      ctx.strokeStyle = "#ffffff";
      // ctx.rect(width * 0.5 - viewport.w * 0.5, height * 0.5 - viewport.h * 0.5, viewport.w, viewport.h);
      // ctx.stroke();
    }
  };

  function keyDownEvent() {
    if (!this.isKeyDown) {
      that.isKeyDown = true;
      pressEvent(event);
    }
  }

  function keyUpEvent() {
    (that.dirX = 0), (that.dirY = 0);
    that.isKeyDown = false;
  }

  function pressEvent(event) {
    if (event.keyCode == 37) {
      that.dirX = -1;
      that.spriteHeight = 1;
    }
    if (event.keyCode == 39) {
      that.dirX = 1;
      that.spriteHeight = 2;
    }
    if (event.keyCode == 38) {
      that.dirY = -1;
      that.spriteHeight = 3;
    }
    if (event.keyCode == 40) {
      that.dirY = 1;
      that.spriteHeight = 0;
    }
  }
}
