const Viewport = function(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
};

Viewport.prototype = {
  scrollTo: function(x, y) {
    //  scrolling
    this.x += x - this.x - this.w * 0.5;
    this.y += y - this.y - this.h * 0.5;
  }
};
