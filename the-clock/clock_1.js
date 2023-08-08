// Build a pie with constant angle

//Width and height
var data = Array(60).fill(1);

console.log(data);

var width = 1000;
var height = 1000;
var outerRadius = width / 2;
var innerRadius = width / 2.2;
//Create SVG element
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// pie layout function
var pie = d3.pie();
var piedata = pie(data);
//Set up pie groups
var arcs = svg
  .selectAll("g")
  .data(piedata)
  .enter()
  .append("g")
  .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");
// Create arc function with parameters
var arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
// Draw arc paths
arcs.append("path").attr("d", arc);

// Fill color

arcs.append("path").attr("d", arc).attr("fill", "grey");

// Fill values

arcs
  .append("text")
  .attr("transform", function (d) {
    return "translate(" + arc.centroid(d) + ")";
  })
  .attr("text-anchor", "end")
  .text(function (d, i) {
    return i + 1;
  });
