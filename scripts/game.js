var ctx = document.getElementById("myCanvas").getContext("2d");
/* The width and height of the inside of the browser window */
var height = document.documentElement.clientHeight;
var width  = document.documentElement.clientWidth;

var pointer = { x:0, y:0 };// The adjusted mouse position
function Game(){
  var player = new Player(700, 500);
  var viewport = new Viewport(0, 0, 300, 300);

this.loop =function() {// The game loop
  var that=this;

  requestAnimationFrame(that.loop.bind(this));
    var height = document.documentElement.clientHeight;
    var width  = document.documentElement.clientWidth;
    /* Resize canvas on every frame */
    ctx.canvas.height = height;
    ctx.canvas.width  = width;
    player.moveTo(pointer.x, pointer.y);
    viewport.scrollTo(player.x, player.y);
    /* Get the min and max column and row in the map to draw. */
    var xMin = Math.floor(viewport.x / scaledSize);
    var yMin = Math.floor(viewport.y / scaledSize);
    var xMax = Math.ceil((viewport.x + viewport.w) / scaledSize);
    var yMax = Math.ceil((viewport.y + viewport.h) / scaledSize);

    /* the min and max column and row values cannot go beyond the boundaries
    of the map. Those values are 0 and the number of columns and rows in the map. */
    if (xMin < 0) xMin = 0;
    if (yMin < 0) yMin = 0;
    if (xMax> columns) xMax = columns;
    if (yMax > rows) yMax = rows;
    var map =new Map(xMin,yMin,xMax,yMax,viewport);
    map.drawMap()
    ctx.drawImage(playerImage, 10, 0, 64,64, Math.round(player.x - viewport.x + width * 0.5 - viewport.w * 0.5), Math.round(player.y - viewport.y + height * 0.5 - viewport.h * 0.5), 64, 64);
    /* Draw the viewport rectangle. */

    ctx.strokeStyle = "#ffffff";
    ctx.rect(width * 0.5 - viewport.w * 0.5, height * 0.5 - viewport.h * 0.5, viewport.w, viewport.h);
    ctx.stroke();
  }

  ctx.canvas.addEventListener('keydown',pressEvent)

  ctx.canvas.addEventListener("click", (event) => {
    pointer.x = event.pageX + viewport.x - width * 0.5 + viewport.w * 0.5;
    pointer.y = event.pageY + viewport.y - height * 0.5 + viewport.h * 0.5;
    });
  }

    function pressEvent(event) {
      //if (event.keyCode >= 65) {
        console.log('p');

      //}
  
}
var tileSheet = new Image();

tileSheet.addEventListener("load", (event) => { 
  
  var game=new Game();
  game.loop(); 

});

tileSheet.src = "./images/new-map.png";
var playerImage = new Image();
playerImage.src="./images/player.png";


