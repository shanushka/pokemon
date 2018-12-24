canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var isBattleOn = false;
var height = document.documentElement.clientHeight;
var width = document.documentElement.clientWidth;
var scaledSize = 32;

function Game(pokemonId, preloader) {
  const KEY_LEFT = 37;
  const KEY_RIGHT = 39;
  const KEY_UP = 38;
  const KET_DOWN = 40;
  var audio = new Audio('./songs/Opening.mp3');
  var hpTitle = document.createElement('div');
  var leftBorder = document.createElement('div');
  var rightBorder = document.createElement('div');
  leftBorder.setAttribute('class', 'leftBorder');
  rightBorder.setAttribute('class', 'rightBorder');
  container.appendChild(leftBorder);
  container.appendChild(rightBorder);
  hpTitle.setAttribute('class', 'hpTitle');
  var noPokemonTitle = document.createElement('div');
  noPokemonTitle.setAttribute('class', 'noPokemonTitle');
  scoreBoard.appendChild(hpTitle);
  scoreBoard.appendChild(noPokemonTitle);
  canvas.height = height;
  canvas.width = width;
  var fpsInterval, now, then, elapsed;
  this.dirX = 0;
  this.dirY = 0;
  var that = this;
  this.isKeyDown = false;
  this.spriteHeight = 0;

  var player = new Player(500, 1440, pokemonId, preloader, that);
  var viewport = new Viewport(0, 0, 1120, 800);
  if (!isBattleOn) {
    window.addEventListener('keydown', keyDownEvent);
    window.addEventListener('keyup', keyUpEvent);
  }
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
  /*Game loop*/
  this.loop = function() {
    audio.play();
    var map = new Map(viewport, preloader);
    if (isBattleOn) {
      audio.pause();
      scoreBoard.remove();
      this.startBattle();
      return;
    }
    container.appendChild(scoreBoard);
    hpTitle.innerHTML = 'Hit Point(HP) : ' + player.pokemon.hp;
    noPokemonTitle.innerHTML = 'Number of Pokemons Collected : ' + player.pokemonArray.length;
    this.myRequest = requestAnimationFrame(that.loop.bind(this));
    now = Date.now();
    elapsed = now - then;
    // if enough time has elapsed, draw the next frame
    if (elapsed > fpsInterval) {
      // Get ready for next frame by setting then=now,
      then = now - (elapsed % fpsInterval);
      viewport.scrollTo(player.x, player.y);
      map.drawMap();
      if (this.isKeyDown) {
        player.moveTo(this.dirX, this.dirY, map);
        player.updateSprite(this.spriteHeight);
      }
      player.drawPlayer(viewport);
    }
  };

  function keyDownEvent() {
    if (!this.isKeyDown) {
      pressEvent(event);
      that.isKeyDown = true;
    }
  }

  function keyUpEvent() {
    that.dirX = 0;
    that.dirY = 0;
    that.isKeyDown = false;
  }

  function pressEvent(event) {
    switch (event.keyCode) {
      case KEY_LEFT:
        that.dirX = -1;
        that.spriteHeight = 1;
        break;
      case KEY_RIGHT:
        that.dirX = 1;
        that.spriteHeight = 2;
        break;
      case KEY_UP:
        that.dirY = -1;
        that.spriteHeight = 3;
        break;
      case KET_DOWN:
        that.dirY = 1;
        that.spriteHeight = 0;
        break;
    }
  }
}
