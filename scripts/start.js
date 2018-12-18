var container = document.getElementsByClassName("container")[0];
var pressed = document.createElement('div');
var logo = document.getElementsByClassName('logo')[0];
var canvas = document.getElementById("myCanvas")
var scoreBoard=document.getElementsByClassName("ScoreBoard")[0];

function Start(){
  var that = this;
  canvas.remove();
  scoreBoard.remove();
  pressed.setAttribute('class','pressed')
  pressed.innerHTML="Press any key to start a new game";
  container.appendChild(pressed);
  var selectPlayer = document.createElement('div');
  var selectPlayerTitle =document.createElement('div');
  selectPlayer.setAttribute('class','selectSection clearfix');
  selectPlayerTitle.setAttribute('class','pressed');
  selectPlayerTitle.innerHTML="Select Your Pokemon" ;
  selectPlayer.appendChild(selectPlayerTitle);
  var pokemon = document.createElement('div');
  selectPlayer.appendChild(pokemon);
  pokemon.setAttribute('class','pokemonContainer clearfix')
  var ulPokemon = document.createElement('ul');
  pokemon.appendChild(ulPokemon);
  allPokemon =['./images/pikachu.png','./images/balbasur.png','./images/sqirtel.png']
  names=['Pikachu','Balbasur','Squirtel'];
  this.isGame = false ;
  this.createPokemonList = function(){
    for(i = 0;i< allPokemon.length;i++){
      var liPokemon = document.createElement('li');
      var imagePokemon = document.createElement('img');
      var imageTitle=document.createElement('div');
      imagePokemon.setAttribute('id',i)
      imageTitle.innerHTML = names[i];
      imagePokemon.src =allPokemon[i];
      liPokemon.style.position='relative';
      imageTitle.style.position='absolute';
      liPokemon.setAttribute('class',names[i]);
      imagePokemon.setAttribute('class',names[i]);
      imageTitle.style.top='2px';
      imagePokemon.style.position='absolute';
      imagePokemon.style.top='15px';
      imagePokemon.style.left='0';
      imageTitle.style.left='35px';
      liPokemon.appendChild(imagePokemon); 
      liPokemon.appendChild(imageTitle);
      liPokemon.setAttribute('class',i )
      liPokemon.setAttribute('id' , i)
      ulPokemon.appendChild(liPokemon);
      this.pokemonId =0 ;

      liPokemon.addEventListener('click',function select(event){ 
        if(event.target.id){
          that.isGame = true;
          removeFirstPage();
          scoreBoard.innerHTML += event.target.className;
          that.pokemonId = event.target.id;
          this.removeEventListener('click',select);
          var game=new Game(that.pokemonId);
          game.startAnimating(30); 
        
        }
      })
    }
  }
  var removeFirstPage=function(){
    selectPlayer.innerHTML='';
    logo.remove();
    container.appendChild(canvas);
    container.appendChild(scoreBoard);
  }

  this.startPage=function(){
    this.createPokemonList();
    document.addEventListener("keydown",function(){
      pressed.remove();
      container.appendChild(selectPlayer);
    });
  }
  tileSheet.addEventListener("load",function (event) { 
  //   var game=new Game();
  //   console.log('d',that.pokemonId);
  //  game.startAnimating(30); 
  });
}

var start =new Start();
start.startPage();


