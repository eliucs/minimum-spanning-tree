// Minimum Spanning Tree
// Demonstration of Prim's algorithm and Kruskal's algorithm to
// compute the minimum spanning tree of a graph.
// Source code: https://github.com/eliucs/minimum-spanning-tree
// Website: http://ericliu.cs
// Author: Eric Liu

var path;

var nodes = [];
var nodeLayer = new Layer();
var edgesLayer = new Layer();

function onMouseDown(event) {
  nodeLayer.activate();
  path = new Path();
  path.strokeColor = 'white';

  var node = new Path.Circle({
    center: event.point,
    radius: 7
  });

  node.strokeColor = 'black';
	node.fillColor = 'white';

  nodes.push({
    x: event.point.x,
    y: event.point.y,
    equals: function(that) {
      return this.x == that.x && this.y == that.y
    }
  });
};

// edgesLayer.activate();
// edgesLayer.removeChildren();

$('#btn-compute').click(function() {
  var algo = $('#select-algo option:selected').val();

  if (typeof algo == 'undefined' || !algo) {
    return;
  }

  console.log(algo);
});

$('#btn-reset').click(function() {
  nodeLayer.removeChildren();
  edgesLayer.removeChildren();
  paper.view.draw();
  nodes = [];
});

function primsAlgorithm(vertices, callback) {

}

function kruskalsAlgorithm(vertices, callback) {

}
