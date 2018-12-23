var Player = function(x, y, pokemonId, preloader, gameObj) {
  var that = this;
  this.x = x;
  this.y = y;
  this.pokemonId = pokemonId;
  this.currentImage = 0;
  this.frameCount = 4;
  var srcX = 0;
  var srcY = 0;
  this.xPos = 0;
  this.yPos = 0;
  this.flag = true;
  var wildPokemonPosX = 724;
  var wildPokemonPosY = 140;
  var pokemonPosX = 395;
  var pokemonPosY = 268;
  var playerImage = preloader.getImage('playerImage');
  this.getPokemonById = function(pokemonId) {
    return pokemonData.filter(function(val) {
      return val.id === parseInt(pokemonId);
    });
  };
  this.pokemon = new Pokemon(this.getPokemonById(that.pokemonId), pokemonPosX, pokemonPosY);
  const totalPokemonHp = this.pokemon.hp;
  this.pokemonArray = [];
  this.pokemonArray.push(this.pokemon);
  this.drawPlayer = function(viewport) {
    this.xPos = Math.floor((this.x + scaledSize * 0.25) / scaledSize) + 1;
    this.yPos = Math.floor((this.y + scaledSize * 0.25) / scaledSize) + 1;
    ctx.drawImage(
      playerImage,
      srcX,
      srcY + 10,
      64,
      64,
      Math.round(this.x - viewport.x + width * 0.5 - viewport.w * 0.5),
      Math.round(this.y - viewport.y + height * 0.5 - viewport.h * 0.5),
      64,
      64
    );
  };

  this.updateSprite = function(position) {
    this.currentImage++;
    this.currentImage = this.currentImage % this.frameCount;
    srcX = this.currentImage * 64;
    srcY = position * 64;
  };

  this.healHouse = function(map, xPos, yPos) {
    if (map.mapData[yPos][xPos] == 54) {
      if (this.pokemon.hp <= 10) {
        this.pokemon.hp = totalPokemonHp;
        cancelAnimationFrame(gameObj.myRequest);
        ctx.fillStyle = 'rgba(225,225,225,0.7)';
        ctx.fillRect(0, 0, width, height);
        setTimeout(function() {
          gameObj.loop();
          ctx.clearRect(0, 0, width, height);
        }, 2000);
      }
    }
  };

  this.collideGrass = function(map, xPos, yPos) {
    var randomNo, randomPokemonId;
    if (map.mapData[yPos][xPos] == 1) {
      randomNo = Math.floor(Math.random() * (100 - 0) + 0);
      if (randomNo < 5 && this.pokemon.hp > 10) {
        randomPokemonId = Math.floor(Math.random() * (5 - 0) + 0);
        this.wildPokemon = new Pokemon(this.getPokemonById(randomPokemonId), wildPokemonPosX, wildPokemonPosY);
        ctx.clearRect(0, 0, width, height);
        isBattleOn = true;
      }
    }
  };
};

Player.prototype = {
  moveTo: function(dx, dy, map, width, height) {
    if (this.collideBackground(map, this.xPos + dx, this.yPos + dy)) {
      this.x += dx * scaledSize * 0.25;
      this.y += dy * scaledSize * 0.25;
    }
    this.collideGrass(map, this.xPos, this.yPos, width, height);
    this.healHouse(map, this.xPos, this.yPos);
  },

  collideBackground: function(map, xPos, yPos) {
    if (
      map.mapData[yPos][xPos] == 1 ||
      map.mapData[yPos][xPos] == 2 ||
      map.mapData[yPos][xPos] == 6 ||
      map.mapData[yPos][xPos] == 8 ||
      map.mapData[yPos][xPos] == 9 ||
      map.mapData[yPos][xPos] == 10 ||
      map.mapData[yPos][xPos] == 11 ||
      map.mapData[yPos][xPos] == 12 ||
      map.mapData[yPos][xPos] == 54 ||
      map.mapData[yPos][xPos] == 23 ||
      map.mapData[yPos][xPos] == 27 ||
      map.mapData[yPos][xPos] == 25
    ) {
      return true;
    }
    return false;
  }
};
