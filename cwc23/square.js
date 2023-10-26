const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", 1000)
  .attr("height", 700);

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

function resultColorPicker(match_result) {
  if (match_result === "lost") {
    // return "#E22a09";
    return "#e60000";
  } else if (match_result === "") {
    // Not completed
    return "white";
  } else if (match_result === "tie") {
    return "#808080";
  } else {
    return 0;
    // return data[i].jersey;
  }
}

function tablePositionColor(position) {
  if (position <= 4) {
    return "black";
  } else {
    return "#a6a6a6";
  }
}

d3.json("cwc23.json").then((data) => {
  const baseLine = graph.selectAll("line").data(data);
  const roundRobinMarker = graph.selectAll("line").data(data);
  const boundaryLine = graph.selectAll("line").data(data); // Remove this at the end
  const teamName = graph.selectAll("text").data(data);
  const endOfGroupStage = graph.selectAll("text").data(data);
  const matchResult = graph.selectAll("rect").data(data);
  const matchResultOval = graph.selectAll("ellipse").data(data);
  const matchResultsquare = graph.selectAll("rect").data(data);
  const tablePosition = graph.selectAll("text").data(data);

  // Scale
  const xScale = d3
    .scaleLinear()
    .domain([0, 9])
    .range([75, backGroundWidth - 75]);

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

  console.log();

  for (i = 0; i < data.length; i++) {
    // console.log(data[i].short_name, data[i].jersey);
    const team1 = data[i].team;
    console.log(team1);
    teamName
      .enter()
      .append("text")
      .text(data[i].short_name)
      .attr("x", xScale(i))
      .attr("y", backGroundHeight - 40)
      .attr("fill", "black")
      .attr("font-size", 10);

    for (j = 0; j < data[i].matches.length; j++) {
      // console.log(data[i].matches);
      const against = data[i].matches[j].against;
      const venue = data[i].matches[j].at;
      const matchNum = data[i].matches[j].tour_match_num;
      const heldOn = data[i].matches[j].held_on;
      const url = data[i].matches[j].url;

      matchResultsquare
        .enter()
        .append("a")
        .attr("xlink:href", url)
        .attr("target", "_blank")
        .append("rect")
        .attr("x", xScale(i) + 5 - 3)
        .attr("y", backGroundHeight - 70 - j * 20)
        .attr("height", 20)
        .attr("width", 20)
        // .attr("fill", resultColorPicker(data[i].matches[j].result))
        .attr(
          "fill",
          resultColorPicker(data[i].matches[j].result) === 0
            ? data[i].jersey
            : resultColorPicker(data[i].matches[j].result)
        )
        .attr("stroke-width", 1)
        .attr("stroke", "cyan")
        .on("mouseover", function (event, d) {
          d3.select(this).attr("height", 25).attr("width", 25);
          tip
            .style("opacity", 1)
            .style("left", event.pageX - 20 + "px")
            .style("top", event.pageY - 75 + "px");
        })
        .on("mouseout", function (d) {
          d3.select(this).attr("height", 20).attr("width", 20);
          tip
            .style("opacity", 0)
            .html(
              "Against:  " +
                against +
                " <br>" +
                "Match No:" +
                matchNum +
                " <br>" +
                "On: " +
                heldOn +
                " <br>" +
                "At: " +
                venue
            );
        });
    }

    tablePosition
      .enter()
      .append("text")
      .text(data[i].position)
      .attr("x", xScale(i) + 10)
      .attr("y", backGroundHeight - 248)
      .attr("fill", tablePositionColor(data[i].position))
      .attr("font-weight", "bold")
      .attr("font-size", 10);
  }

  roundRobinMarker
    .enter()
    .append("line")
    .attr("x1", 0 + 75)
    .attr("y1", backGroundHeight - 260)
    .attr("x2", backGroundWidth - 50)
    .attr("y2", backGroundHeight - 260)
    .attr("stroke", "#add8e6")
    .attr("stroke-width", 1);
  roundRobinMarker
    .enter()
    .append("line")
    .attr("x1", 0 + 75)
    .attr("y1", backGroundHeight - 240)
    .attr("x2", backGroundWidth - 50)
    .attr("y2", backGroundHeight - 240)
    .attr("stroke", "#add8e6")
    .attr("stroke-width", 1);

  // Tooltip

  var tip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
});
