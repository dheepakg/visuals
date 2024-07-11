var w = 300;
var h = 300;
var svg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

//arrow
svg.append("svg:defs").append("svg:marker")
    .attr("id", "triangle")
    .attr("refX", 6)
    .attr("refY", 6)
    .attr("markerWidth", 30)
    .attr("markerHeight", 30)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 12 6 0 12 3 6")
    .style("fill", "black");

//line
svg.append("line")
  .attr("x1", 100)
  .attr("y1", 100)
  .attr("x2", 200)
  .attr("y2", 100)
  .attr("stroke-width", 1)
  .attr("stroke", "black")
  .attr("marker-end", "url(#triangle)");

// MArker 2

svg.append("svg:defs").append("svg:marker")
    .attr("id", "triangle1")
    .attr("refX", 5)
    .attr("refY", 5)
    .attr("markerWidth", 12)
    .attr("markerHeight", 12)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 12 5 0 12 2 5")
    .style("fill", "blue");

//line
svg.append("line")
  .attr("x1", 100)
  .attr("y1", 200)
  .attr("x2", 200)
  .attr("y2", 200)
  .attr("stroke-width", 1)
  .attr("stroke", "black")
  .attr("marker-end", "url(#triangle1)");
