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

  // console.log(vertices);

  if (algo == PRIM) {
    primsAlgorithm(vertices, function(mst) {
      if (!mst) {
        console.log('No nodes on the screen.');
        return;
      } else if (typeof mst == 'undefined') {
        console.log('Cannot make minimum spanning tree with 1 point.');
        return;
      }

      mst.forEach(function(edge) {
        var a = new Point(edge.a.x, edge.a.y);
        var b = new Point(edge.b.x, edge.b.y);
        var mstPath = new Path.Line(a, b);
        mstPath.strokeColor = '#98FB98';
        mstPath.strokeWidth = 3;
      });

      // console.log(mst);
    });
  } else if (algo == KRUSKAL) {
    kruskalsAlgorithm(vertices, function(mst) {

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
  var mst = []; // array of Edge
  var mstVertices = []; // array of Vertex

  // Initialize all adjacency lists
  for (var i = 0; i < vertices.length; i++) {
    var current = vertices[i];
    for (var j = 0; j < vertices.length; j++) {
      if (j == i) {
        continue;
      }
      current.addToAdj(new Edge(current, vertices[j]));
    }
  }

  console.log(vertices);

  // Find arbitrary vertex to start the algorithm, add to the minimum
  // spanning tree
  mstVertices.push(vertices[0]);

  while (mstVertices.length != vertices.length) {
    var minEdge = false;
    var minEdgeWeight = Number.MAX_VALUE;

    for (var i = 0; i < mstVertices.length; i++) {
      for (var j = 0; j < mstVertices[i].adj.length; j++) {
        var edge = mstVertices[i].adj[j];
        var vertex = edge.b;

        // Found smaller edge weight
        if (edge.weight() < minEdgeWeight) {
          // Make sure that vertex not already in MST
          if (includesVertex(mstVertices, vertex)) {
            continue;
          }

          minEdge = edge;
          minEdgeWeight = edge.weight();
        }
      }
    }

    mstVertices.push(minEdge.b);
    mst.push(minEdge);
  }

  callback(mst);
  return;
}

function kruskalsAlgorithm(vertices, callback) {
  var edges = [];

  callback(edges);
}

function includesVertex(vertices, vertex) {
  for (var i = 0; i < vertices.length; i++) {
    if (vertices[i].equals(vertex)) {
      return true;
    }
  }
  return false;
}

function includesEdge(edges, edge) {
  for (var i = 0; i < edges.length; i++) {
    if (edges[i].contains(edge.a) && edges[i].contains(edge.b)) {
      return true;
    }
  }
  return false;
}
