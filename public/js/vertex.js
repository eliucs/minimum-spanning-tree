function Vertex(x, y) {
  this.x = x;
  this.y = y;
}

Vertex.prototype = {
  distance: function(that) {
    return Math.sqrt(Math.pow(this.y - that.y, 2) +
                     Math.pow(this.x - that.x, 2));
  }
}
