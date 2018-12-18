var battleBackground = new Image();
var imagePokemonPlayer =new Image();
var imageWildPokemon =new Image();
var hpPlayer =new Image();
var hpOpponent = new Image();
var attackBackground= new Image();
var attackBtn = new Image();

hpOpponent.src = './images/hp_opponent.png';
hpPlayer.src = './images/hp_trainer.png';
attackBackground.src = './images/attackrect.png';
attackBtn.src ='./images/attack.png';


function preloader(){
var imgs = [battleBackground,imagePokemonPlayer,imageWildPokemon,hpPlayer,hpOpponent,attackBackground,attackBtn]
  var len = imgs.length
  console.log(imgs.length)
   var  counter = 0;

   this.startPreloader=function(){
    [].forEach.call( imgs, function( img ) {
      img.addEventListener( 'load', incrementCounter, false );
      } );

      
   }

   incrementCounter=function() {
    counter++;
    if ( counter === len ) {
    console.log( 'All images loaded!' );
      }
    }
}

var preloader = new preloader();
preloader.startPreloader();

//preloader.incrementCounter();

