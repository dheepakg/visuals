// create svg element:
var svg = d3.select(".canvas-right").append("svg").attr("width", 2000).attr("height", 500)


width = { 'square': 20, 'rect':10, 'long': 50}

let ENABLE_CHART = true;

// Tooltip

let tip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip-right")
    .style("opacity", 0);

