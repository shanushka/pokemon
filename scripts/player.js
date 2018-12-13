var Player = function(x, y) {
  this.x = x; 
  this.y = y;
};

Player.prototype = {
  moveTo:function(x, y) {
    /* Gradually moves the player closer to x, y every time moveTo is called. */
    this.x += (x - this.x - scaledSize * 0.5) * 0.05;
    this.y += (y - this.y - scaledSize * 0.5) * 0.05;
  }
};