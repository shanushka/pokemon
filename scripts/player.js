var Player = function(x, y) {
  this.x = x; 
  this.y = y;
  this.currentImage = 0;
  this.frameCount = 4;
  var srcX = 0;
  var srcY = 0;

  this.drawPlayer=function(viewport){ 

  ctx.drawImage(playerImage, srcX, srcY+10, 64,64, Math.round(this.x - viewport.x + width * 0.5 - viewport.w * 0.5), Math.round(this.y - viewport.y + height * 0.5 - viewport.h * 0.5), 64, 64);
  }
 
  this.updateSprite=function(position){

      this.currentImage++;
      this.currentImage = this.currentImage % this.frameCount;
      srcX = this.currentImage * 64;
      srcY = position * 64;
  }

};


Player.prototype = {
  moveTo:function(dx, dy) {
     /* Gradually moves the player closer to x, y every time moveTo is called. */
    this.x += dx * size ;
    this.y += dy * size ;
  }};
