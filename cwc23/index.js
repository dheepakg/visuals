const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", 1000)
  .attr("height", 800);

const backGroundWidth = 1000;
const backGroundHeight = 600;

const graph = svg.append("g").attr("width", 1000).attr("height", 600);

graph
  .append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", backGroundWidth)
  .attr("height", backGroundHeight)
  .attr("fill", "#fff1e5")
  .attr("stroke", "black")
  .attr("stroke-width", 3);

d3.json("cwc23.json").then((data) => {
  const baseLine = graph.selectAll("line").data(data);
  const boundaryLine = graph.selectAll("line").data(data); // Remove this at the end
  const teamName = graph.selectAll("text").data(data);
  const matchResult = graph.selectAll("rect").data(data);

  // Scale
  const xScale = d3
    .scaleLinear()
    .domain([0, 9])
    .range([75, backGroundWidth - 75]);

  console.log(xScale(0), xScale(2));

  baseLine
    .enter()
    .append("line")
    .attr("x1", 0 + 30)
    .attr("y1", backGroundHeight - 50)
    .attr("x2", backGroundWidth - 30)
    .attr("y2", backGroundHeight - 50)
    .attr("stroke", "#add8e6")
    .attr("stroke-width", 1);

  boundaryLine
    .enter()
    .append("line")
    .attr("x1", 35)
    .attr("y1", backGroundHeight - 55)
    .attr("x2", 35)
    .attr("y2", backGroundHeight - 45)
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

  console.log(data[0].team);

  for (i = 0; i < data.length; i++) {
    console.log(data[i].short_name);

    teamName
      .enter()
      .append("text")
      .text(data[i].short_name)
      .attr("x", xScale(i))
      .attr("y", backGroundHeight - 40)
      .attr("fill", "#0000EE")
      .attr("font-size", 10);

    for (j = 0; j < data[i].matches.length; j++) {
      console.log(data[i].matches[j].M1);
    }
    matchResult
      .enter()
      .append("rect")
      .attr("x", xScale(i) - 10)
      .attr("y", backGroundHeight - 80)
      .attr("width", 45)
      .attr("height", 30)
      .attr("fill", "silver")
      .attr("stroke", "black");
  }
});
