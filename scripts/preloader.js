function Preloader() {
  var that = this;
  this.images = {};
  this.imagesLoaded = 0;

  this.init = function() {
    this.loadImage('pikachu', './images/pikachu.png');
    this.loadImage('balbasur', './images/balbasur.png');
    this.loadImage('squirtel', './images/sqirtel.png');
    this.loadImage('tileSheet', './images/new-map.png');
    this.loadImage('playerImage', './images/player.png');
    this.loadImage('squirtelSprite', './images/squirtelSprite.png');
    this.loadImage('eeveeSprite', './images/eeveeSprite.png');
    this.loadImage('caterpie', './images/caterpieSprite.png');
    this.loadImage('pikachuSprite', './images/pokemonSprite.png');
    this.loadImage('balbasurSprite', './images/balbasurSprite.png');
    this.loadImage('battleBackground', './images/battleBackground.png');
    this.loadImage('hpOpponent', './images/hp_opponent.png');
    this.loadImage('hpPlayer', './images/hp_trainer.png');
    this.loadImage('attackBackground', './images/btn.jpg');
    this.loadImage('attackBtn', './images/attack.png');
  };

  this.loadImage = function(key, source) {
    var image = new Image();
    image.onload = function() {
      that.imagesLoaded += 1;
    };
    image.src = source;
    that.images[key] = image;
  };

  this.preloaderInterval = setInterval(function() {
    if (that.imagesLoaded == that.checkLoadedImages(that.images)) {
      var start = new Start(that);
      start.startPage();
      clearInterval(that.preloaderInterval);
    }
  });

  this.getImage = function(key) {
    return that.images[key];
  };

  this.checkLoadedImages = function(object) {
    let count = 0;
    Object.keys(object).forEach(function(element) {
      count += 1;
    });
    return count;
  };
  this.init();
}

var preloader = new Preloader();
