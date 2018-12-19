var Player = function(x, y, pokemonId) {
  var that= this;
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
  this.getPokemonById = function(pokemonId) {
    return pokemonData.filter(function(val) {
      return(val.id=== parseInt(pokemonId));
    });
  };

  this.pokemon = new Pokemon(this.getPokemonById(that.pokemonId))
  pokemonArray=[];
  pokemonArray.push(this.pokemon)
  console.log('pokemonplayer',pokemonArray)
  this.drawPlayer = function(viewport) {
    this.xPos = Math.floor((this.x + scaledSize * 0.25) / scaledSize) + 1;
    this.yPos = Math.floor((this.y + scaledSize * 0.25) / scaledSize) + 1;
    ctx.drawImage(playerImage,srcX,srcY + 10, 64, 64, Math.round(this.x - viewport.x + width * 0.5 - viewport.w * 0.5),
      Math.round(this.y - viewport.y + height * 0.5 - viewport.h * 0.5), 64, 64);
  };

  this.updateSprite = function(position) {
    this.currentImage++;
    this.currentImage = this.currentImage % this.frameCount;
    srcX = this.currentImage * 64;
    srcY = position * 64;
  };
};

Player.prototype = {
  moveTo: function(dx, dy, map,width,height) {
    if (!this.collideBackground(map, this.xPos + dx, this.yPos + dy)) {
      this.x += dx * size * 0.25;
      this.y += dy * size * 0.25;
    }
    this.collideGrass(map,this.xPos,this.yPos,width,height);
  },

  collideBackground: function(map, xPos, yPos) {
    if(map.mapData[yPos][xPos] == 4 || map.mapData[yPos][xPos] == 30 || map.mapData[yPos][xPos] == 31 ||
      map.mapData[yPos][xPos] == 32 || map.mapData[yPos][xPos] == 35 ||map.mapData[yPos][xPos] == 33 ||
      map.mapData[yPos][xPos] == 34 || map.mapData[yPos][xPos] == 38 || map.mapData[yPos][xPos] == 39 ||
      map.mapData[yPos][xPos] == 36 || map.mapData[yPos][xPos] == 37) {
      return true;
      this.flag = false;
    }
    return false;
  },

  collideGrass:function(map,xPos,yPos){
    var randomNo,randomPokemonId
    if (map.mapData[yPos][xPos] == 1){
      randomNo=Math.floor(Math.random()*(100-0) + 0)
      if(randomNo < 5 )
      {
        randomPokemonId = Math.floor(Math.random()*(5-0) + 0)
        this.wildPokemon = new Pokemon(this.getPokemonById(randomPokemonId));
        console.log('pokemonrand',this.getPokemonById(randomPokemonId));
        ctx.clearRect(0, 0,width,height);
        isBattleOn=true;
      }
    }
  }
};
