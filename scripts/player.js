var Player = function(x, y) {
  this.x = x; 
  this.y = y;
  this.currentImage = 0;
  this.frameCount = 4;
  var srcX = 0;
  var srcY = 0;
  this.xPos = 0;
  this.yPos = 0;
  this.flag=true;
  this.drawPlayer=function(viewport){ 
    this.xPos =  Math.floor((this.x + scaledSize * 0.5) / scaledSize) +1;
    this.yPos = Math.floor((this.y + scaledSize * 0.5) / scaledSize) +1 ;
    ;
  // console.log(this.xPos,this.yPos);
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
  moveTo:function(dx, dy, map) {
     /* Gradually moves the player closer to x, y every time moveTo is called. */
    if(!this.collideBackground(map,this.xPos+dx,this.yPos+dy))
    {
      // if()
    this.x += dx * size ;
    this.y += dy * size ;
    
    }

  },

  collideBackground:function(map,xPos,yPos){
  //  console.log(this.xPos,this.yPos)

      if(map.mapData[yPos][xPos] == 4 || map.mapData[yPos][xPos] == 30 || map.mapData[yPos][xPos] == 31 ||
        map.mapData[yPos][xPos] == 32 || map.mapData[yPos][xPos] == 35
        || map.mapData[yPos][xPos] == 33 || map.mapData[yPos][xPos] == 34 ||  map.mapData[yPos][xPos] == 38 ||
        map.mapData[yPos][xPos] == 39 ||  map.mapData[yPos][xPos] == 36  || map.mapData[yPos][xPos] == 37  )
      {
        return true;
        this.flag= false;
      }
      return false;
}
};
