// Minimum Spanning Tree
// Demonstration of Prim's algorithm and Kruskal's algorithm to
// compute the minimum spanning tree of a graph.
// Source code: https://github.com/eliucs/minimum-spanning-tree
// Website: http://ericliu.cs
// Author: Eric Liu

var path;

var vertices = [];
var verticesLayer = new Layer();
var edgesLayer = new Layer();

function onMouseDown(event) {
  verticesLayer.activate();
  path = new Path();
  path.strokeColor = 'white';

  var circle = new Path.Circle({
    center: event.point,
    radius: 7
  });

  circle.strokeColor = 'black';
	circle.fillColor = 'white';

  vertices.push(new Vertex(event.point.x, event.point.y));
};

// edgesLayer.activate();
// edgesLayer.removeChildren();

$('#btn-compute').click(function() {
  var algo = $('#select-algo option:selected').val();

  if (typeof algo == 'undefined' || !algo) {
    return;
  }

  console.log(vertices);

  if (algo == PRIM) {
    primsAlgorithm(vertices, function(edges) {
      // console.log(edges);

    });
  } else if (algo == KRUSKAL) {
    kruskalsAlgorithm(vertices, function(edges) {

    });
  }
});

$('#btn-reset').click(function() {
  verticesLayer.removeChildren();
  edgesLayer.removeChildren();
  paper.view.draw();
  vertices = [];
  edges = [];
});

function primsAlgorithm(vertices, callback) {
  var edges = [];
  var mst = []; // array of edges that correspond to building the MST in order
  var mstVertices = [];

  // Initialize all edges
  for (var i = 0; i < vertices.length; i++) {
    var current = vertices[i];

    for (var j = 0; j < vertices.length; j++) {
      if (j == i) {
        continue;
      }

      var contains = false;
      edges.forEach(function(edge) {
        if (edge.contains(current) && edge.contains(vertices[j])) {
          contains = true;
        }
      });

      if (!contains) {
        edges.push(new Edge(current, vertices[j]));
      }
    }
  }

  // Find least weight edge
  var minEdge = edges[0];
  var min = 0;
  for (var i = 1; i < edges.length; i++) {
    if (edges[i].weight() < minEdge.weight()) {
      minEdge = edges[i];
      min = i;
    }
  }
  edges.splice(min, 1);

  mst.push(minEdge);
  mstVertices.push(minEdge.getA());
  mstVertices.push(minEdge.getB());

  console.log("mst");
  console.log(mst);

  console.log("mst vertices");
  console.log(mstVertices);

  while (mstVertices.length != vertices.length) {
    // Find next smallest edge
    var minNextEdge = false;
    var minNext = 0;
    for (var i = 0; i < edges.length; i++) {
      for (var j = 0; j < mstVertices.length; j++) {
        if (!minNextEdge && edges[i].contains(mstVertices[j])) {
          minNextEdge = edges[i];
          minNext = i;
        } else if (edges[i].contains(mstVertices[j]) && edges[i].weight() < minNextEdge.weight()) {
          minNextEdge = edges[i];
          minNext = i;
        }
      }
    }

    edges.splice(min, 1);
    mst.push(minNextEdge);

    var alreadyContains = false;
    for (var i = 0; i < mstVertices.length; i++) {
      if (minNextEdge.getA().equals(mstVertices[i])) {
        alreadyContains = true;
      }
    }
    if (!alreadyContains) {
      mstVertices.push(minNextEdge.getA());
    }

    var alreadyContains = false;
    for (var i = 0; i < mstVertices.length; i++) {
      if (minNextEdge.getB().equals(mstVertices[i])) {
        alreadyContains = true;
      }
    }
    if (!alreadyContains) {
      mstVertices.push(minNextEdge.getB());
    }
  }

  callback(edges);
}

function kruskalsAlgorithm(vertices, callback) {
  var edges = [];

  callback(edges);
}
