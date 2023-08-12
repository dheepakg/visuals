// To fetch current time

var current_time = new Date();
var formatted_time = current_time.toLocaleTimeString();

var current_secs = current_time.getSeconds();

console.log("Currect Second is ", current_time.getSeconds());

// Build a pie with constant angle
var number_of_arc = current_secs;
//Width and height
var data = Array(12).fill(1);

console.log(data);

// Color Scale

var myColor = d3.scaleLinear().domain([1, 12]).range(["white", "blue"]);

var width = 1000;
var outerRadius = width / 3;
var innerRadius = width / 4;
//Create SVG element
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", width);

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

arcs
  .append("path")
  .attr("d", arc)
  .attr("fill", "blue")
  .transition()
  .duration(3000)
  .attr("fill", "silver");
// .attr("fill", function (d, i) {
//   return myColor(2);
// });

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
