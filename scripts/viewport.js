const Viewport = function(x, y, w, h) {
  this.x = x;
  this.y = y; 
  this.w = w; 
  this.h = h;
  this.maxX = columns * scaledSize - width;
  this.maxY = rows * scaledSize - height;

};

Viewport.prototype = {
  scrollTo:function(x, y) {
    // this.x = x - this.w * 0.5;// Rigid scrolling
    // this.y = y - this.w * 0.5;

    // Smooth scrolling 
    this.x += (x - this.x - this.w * 0.5) * 0.05;
    this.y += (y - this.y - this.h * 0.5) * 0.05;
    
    // this.x = Math.max(0, Math.min(this.x, this.maxX));
    // this.y = Math.max(0, Math.min(this.y, this.maxY));
  }
};

