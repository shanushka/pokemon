var battleBackground = new Image();
var imagePokemonPlayer =new Image();
var imageWildPokemon =new Image();
var hpPlayer =new Image();
var hpOpponent = new Image();
var attackBackground= new Image();
var attackBtn = new Image();
battleBackground.src= './images/battleBackground.png';
Battle = function(playerObj) {

  console.log('playerBattle',playerObj.pokemon.img);


 // console.log('d',imagePokemonPlayer.src)
  this.createBattle=function()
  {  
    imagePokemonPlayer.src = playerObj.pokemon.img;
    imageWildPokemon.src =playerObj.wildPokemon.img;
    hpOpponent.src = './images/hp_opponent.png';
    hpPlayer.src = './images/hp_trainer.png';
    attackBackground.src = './images/attackrect.png';
    attackBtn.src ='./images/attack.png';
    imagePokemonPlayer.onload =function(){
    ctx.drawImage(battleBackground,270,10,512,340);
    ctx.drawImage(imageWildPokemon,0,0,56,56,604,121,112,112);
    ctx.drawImage(imagePokemonPlayer,114,0,56,56,355,230,112,112);
    ctx.drawImage(hpPlayer,504,270,249,73);
    ctx.drawImage(hpOpponent,284,110,249,73);
    ctx.drawImage(attackBackground,270,350,512,83);
    ctx.drawImage(attackBtn,534,358,110,32);
    ctx.drawImage(attackBtn,534,392,110,32);
    ctx.drawImage(attackBtn,650,358,110,32);
    ctx.drawImage(attackBtn,650,392,110,32);



    ctx.font = "14px Comic Sans MS";
    // ctx.fillStyle = "red";
    ctx.fillText('Opponent : ' + playerObj.wildPokemon.name, 288, 140);
    ctx.fillText('Player : ' + playerObj.pokemon.name, 536, 297);
    ctx.fillText('What will ' + playerObj.pokemon.name + ' do ?', 300, 380);
    ctx.fillText(playerObj.wildPokemon.level, 458, 145);
    ctx.fillText(playerObj.pokemon.level, 716, 299);
    ctx.fillText(playerObj.pokemon.attacks[0], 564, 380);
    ctx.fillText(playerObj.pokemon.attacks[1], 680, 380);
    ctx.fillText(playerObj.pokemon.attacks[2], 680, 414);

    // ctx.fillText(playerObj.pokemon.level, 716, 299);



    }

  }


}