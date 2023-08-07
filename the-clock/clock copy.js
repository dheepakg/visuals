// create svg element:
var svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", 800)
  .attr("height", 800);

const the_background = svg.append("g").attr("width", 600).attr("height", 600);

const margin = { top: 20, right: 20, bottom: 100, left: 100 };

const CIRCLE_VALUES = {
  dial_radius: 200,
  center_x: 500,
  center_y: 500,
  margin_circ_radius: 180,
};

the_background
  .append("rect")
  .attr("x", 100)
  .attr("y", 100)
  .attr("width", 700)
  .attr("height", 700)
  .attr("fill", "#fff1e5")
  .attr("stroke", "black")
  .attr("stroke-width", 3);

const dial_face = the_background
  .append("circle")
  .attr("cx", CIRCLE_VALUES.center_x)
  .attr("cy", CIRCLE_VALUES.center_y)
  .attr("r", CIRCLE_VALUES.dial_radius)
  .attr("stroke", "black")
  .attr("fill", "#f8f8ff");

const boundary_for_number = the_background
  .append("circle")
  .attr("cx", CIRCLE_VALUES.center_x)
  .attr("cy", CIRCLE_VALUES.center_y)
  .attr("r", CIRCLE_VALUES.margin_circ_radius)
  .attr("fill", "#f8f8ff")
  .attr("stroke", "#f88888");

const seconds_marker_60 = the_background
  .append("text")
  .text("+")
  .attr("x", CIRCLE_VALUES.center_x)
  .attr("y", CIRCLE_VALUES.center_y - CIRCLE_VALUES.dial_radius + 15)
  .attr("font-size", 20)
  .attr("text-anchor", "middle");

const seconds_marker_30 = the_background
  .append("text")
  .text("+")
  .attr("x", CIRCLE_VALUES.center_x)
  .attr("y", CIRCLE_VALUES.center_y + CIRCLE_VALUES.dial_radius - 5)
  .attr("font-size", 20)
  .attr("text-anchor", "middle");

const seconds_marker_15 = the_background
  .append("text")
  .text("+")
  .attr("x", CIRCLE_VALUES.center_x + CIRCLE_VALUES.dial_radius - 10)
  .attr("y", CIRCLE_VALUES.center_y + 5)
  .attr("font-size", 20)
  .attr("text-anchor", "middle");

const seconds_marker_45 = the_background
  .append("text")
  .text("+")
  .attr("x", CIRCLE_VALUES.center_x - CIRCLE_VALUES.dial_radius + 10)
  .attr("y", CIRCLE_VALUES.center_y + 5)
  .attr("font-size", 20)
  .attr("text-anchor", "middle");

// Below lines for setting margins for my understanding; remove after completing

const grid_vertical = the_background
  .append("line")
  .attr("x1", CIRCLE_VALUES.center_x)
  .attr("x2", CIRCLE_VALUES.center_x)
  .attr("y1", CIRCLE_VALUES.center_y - CIRCLE_VALUES.dial_radius - 50)
  .attr("y2", CIRCLE_VALUES.center_y + CIRCLE_VALUES.dial_radius + 50)
  .attr("stroke", "#add8e6")
  .attr("stroke-width", 3);

const grid_hori = the_background
  .append("line")
  .attr("x1", CIRCLE_VALUES.center_x - CIRCLE_VALUES.dial_radius - 50)
  .attr("x2", CIRCLE_VALUES.center_x + CIRCLE_VALUES.dial_radius + 50)
  .attr("y1", CIRCLE_VALUES.center_y)
  .attr("y2", CIRCLE_VALUES.center_y)
  .attr("stroke", "#add8e6")
  .attr("stroke-width", 3);
