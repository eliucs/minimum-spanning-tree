function Edge(a, b) {
  this.a = a;
  this.b = b;
}

Edge.prototype = {
  weight: function() {
    return Math.sqrt(Math.pow(this.a.y - this.b.y, 2) +
                     Math.pow(this.a.x - this.b.x, 2));
  }
};
