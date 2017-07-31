function Edge(a, b) {
  this.a = a;
  this.b = b;
}

Edge.prototype = {
  weight: function() {
    return Math.sqrt(Math.pow(this.a.y - this.b.y, 2) +
                     Math.pow(this.a.x - this.b.x, 2));
  },
  contains: function(c) {
    return this.a.equals(c) || this.b.equals(c);
  },
  getA: function() {
    return this.a;
  },
  getB: function() {
    return this.b;
  }
};
