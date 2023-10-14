d3.json("cwc23.json").then((data) => {
  const baseLine = graph.selectAll("line").data(data);
  const boundaryLine = graph.selectAll("line").data(data); // Remove this at the end

  baseLine
    .enter()
    .append("line")
    .attr("x1", 0 + 30)
    .attr("y1", backGroundHeight - 50)
    .attr("x2", backGroundWidth - 30)
    .attr("y2", backGroundHeight - 50)
    .attr("stroke", "#add8e6")
    .attr("stroke-width", 3);

  boundaryLine
    .enter()
    .append("line")
    .attr("x1", 35)
    .attr("y1", 545)
    .attr("x2", 35)
    .attr("y2", 555)
    .attr("stroke", "black")
    .attr("stroke-width", 1);

  boundaryLine
    .enter()
    .append("line")
    .attr("x1", backGroundWidth - 35)
    .attr("y1", backGroundHeight - 55) //545
    .attr("x2", backGroundWidth - 35)
    .attr("y2", backGroundHeight - 45) //555
    .attr("stroke", "black")
    .attr("stroke-width", 1);
});
