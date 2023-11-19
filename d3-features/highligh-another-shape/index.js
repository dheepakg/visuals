const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", 1000)
  .attr("height", 700);

const backGroundWidth = 1000;
const backGroundHeight = 600;

const graph = svg.append("g").attr("width", 1000).attr("height", 600);
const round = svg
  .append("circle")
  .attr("cx", 150)
  .attr("cy", 300)
  .attr("r", 100)
  .attr("id", "id_circ")
  .classed("round", true);

const round1 = svg
  .append("circle")
  .attr("cx", 500)
  .attr("cy", 200)
  .attr("r", 100)
  .attr("fill", "cyan")
  .classed("round", true);

const round2 = svg
  .append("circle")
  .attr("cx", 700)
  .attr("cy", 400)
  .attr("r", 100)
  .attr("fill", "magenta")
  .classed("round", true);

const square1 = svg
  .append("rect")
  .attr("x", 100)
  .attr("y", 100)
  .attr("height", 50)
  .attr("width", 60)
  .attr("fill", "cyan")
  .attr("id", "id_square");

const square2 = svg
  .append("rect")
  .attr("x", 600)
  .attr("y", 500)
  .attr("height", 50)
  .attr("width", 60)
  .attr("fill", "magenta")
  .attr("id", "id_square");

graph
  .append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", backGroundWidth)
  .attr("height", backGroundHeight)
  .attr("fill", "#fff1e5")
  .attr("stroke", "black")
  .attr("stroke-width", 3);
