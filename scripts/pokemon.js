function Pokemon(pokemonObject, posX, posY) {
  this.id = pokemonObject[0].id;
  this.img = pokemonObject[0].image;
  this.name = pokemonObject[0].name;
  this.hp = pokemonObject[0].hp;
  this.level = pokemonObject[0].level;
  this.attacks = pokemonObject[0].attacks;
  this.type = pokemonObject[0].type;
  this.posX = posX;
  this.originalPosX = posX;
  this.posY = posY;
  let spritePokemon = 56;
  let scaledPokemon = 142;
  this.imagePokemon = new Image();
  this.imagePokemon.src = this.img;

  this.drawPokemon = function(dx) {
    ctx.drawImage(
      this.imagePokemon,
      dx,
      0,
      spritePokemon,
      spritePokemon,
      this.posX,
      this.posY,
      scaledPokemon,
      scaledPokemon
    );
  };

  this.animatePokemon = function() {
    let dir = 1;
    if (this.posX == this.originalPosX + 10) {
      dir = -1;
    } else if (this.posX < this.originalPosX) {
      dir = 1;
    }
    this.posX += dir;
  };
}
