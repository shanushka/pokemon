

function Pokemon(pokemonObject)
{ 
  this.id = pokemonObject[0].id;
  this.img = pokemonObject[0].image;
  this.name = pokemonObject[0].name;
  this.hp = pokemonObject[0].hp;
  this.level = pokemonObject[0].level;
  this.attacks = pokemonObject[0].attacks;
  this.power = pokemonObject[0].power;
  this.type = pokemonObject[0].type;
  console.log(this.id,this.img);

}