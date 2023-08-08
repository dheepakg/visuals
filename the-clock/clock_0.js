// create svg element:
var svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", 800)
  .attr("height", 800);

const the_background = svg.append("g").attr("width", 800).attr("height", 800);

const margin = { top: 20, right: 20, bottom: 100, left: 100 };

the_background
  .append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", 800)
  .attr("height", 800)
  .attr("fill", "#fff1e5")
  .attr("stroke", "black")
  .attr("stroke-width", 3);

const dial_face = the_background
  .append("circle")
  .attr("cx", 500)
  .attr("cy", 500)
  .attr("r", 200)
  .attr("stroke", "black")
  .attr("fill", "#f8f8ff");

const boundary_for_number = the_background
  .append("circle")
  .attr("cx", 500)
  .attr("cy", 500)
  .attr("r", 180)
  .attr("fill", "#f8f8ff")
  .attr("stroke", "#f88888");

const center = the_background
  .append("circle")
  .attr("cx", 500)
  .attr("cy", 500)
  .attr("r", 2)
  .attr("fill", "black")
  .attr("stroke", "black");

const seconds_marker_60 = the_background
  .append("text")
  .text("60")
  .attr("x", 500)
  .attr("y", 500 - 200 + 20)
  .attr("font-size", 20)
  .attr("text-anchor", "middle");

const seconds_marker_30 = the_background
  .append("text")
  .text("30")
  .attr("x", 500)
  .attr("y", 500 + 200 - 5)
  .attr("font-size", 20)
  .attr("text-anchor", "middle");

const seconds_marker_15 = the_background
  .append("text")
  .text("15")
  .attr("x", 500 + 200 - 10)
  .attr("y", 500 + 3)
  .attr("font-size", 20)
  .attr("text-anchor", "middle");

const seconds_marker_45 = the_background
  .append("text")
  .text("45")
  .attr("x", 500 - 200 + 10)
  .attr("y", 500 + 3)
  .attr("font-size", 20)
  .attr("text-anchor", "middle");

const grid_vertical = the_background
  .append("line")
  .attr("x1", 500)
  .attr("x2", 500)
  .attr("y1", 300 - 50)
  .attr("y2", 700 + 50)
  .attr("stroke", "#add8e6")
  .attr("stroke-width", 3);

const grid_hori = the_background
  .append("line")
  .attr("x1", 500 - 200 - 50)
  .attr("x2", 500 + 200 + 50)
  .attr("y1", 500)
  .attr("y2", 500)
  .attr("stroke", "#add8e6")
  .attr("stroke-width", 3);
