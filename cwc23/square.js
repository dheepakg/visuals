const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", 1000)
  .attr("height", 600);

const backGroundWidth = 1000;
const backGroundHeight = 500;

const graph = svg.append("g").attr("width", 1000).attr("height", 600);

graph
  .append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", backGroundWidth)
  .attr("height", backGroundHeight + 50)
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

function semiMatchesPosition(team_match_num) {
  if (team_match_num <= 9) {
    // League matches
    return 0;
  } else if (team_match_num === 10) {
    return 20;
  } else {
    return 30;
  }
}

d3.json("cwc23.json").then((data) => {
  const baseLine = graph.selectAll("line").data(data);
  const roundRobinMarker = graph.selectAll("line").data(data);
  const boundaryLine = graph.selectAll("line").data(data); // Remove this at the end
  const teamName = graph.selectAll("text").data(data);

  const matchResultOval = graph.selectAll("ellipse").data(data);
  const matchResultsquare = graph.selectAll("rect").data(data);
  const tablePosition = graph.selectAll("text").data(data);
  const legendMatchResult = graph.selectAll("rect").data(data);
  const legendDesc = graph.selectAll("text").data(data);
  const semiMatches = graph.selectAll("rect").data(data);

  // Scale
  const xScale = d3
    .scaleLinear()
    .domain([0, 9])
    .range([75, backGroundWidth - 75]);

  baseLine
    .enter()
    .append("line")
    .attr("x1", 55)
    .attr("y1", backGroundHeight - 50)
    .attr("x2", backGroundWidth - 30)
    .attr("y2", backGroundHeight - 50)
    .attr("stroke", "#add8e6")
    .attr("stroke-width", 1);

  legendMatchResult
    .enter()
    .append("rect")
    .attr("height", 20)
    .attr("width", 20)
    .attr("x", 10)
    .attr("y", 500)
    .attr("fill", "#e60000")
    .attr("stroke-width", 1)
    .attr("stroke", "cyan");

  legendDesc
    .enter()
    .append("text")
    .text("Each box indicates a match. Lost match is filled with red")
    .attr("x", 50)
    .attr("y", 515)
    // .attr("font", "lato")
    .attr("font", "Lato")
    .attr("font-size", 15);

  legendDesc
    .enter()
    .append("text")
    .text("Round 1")
    .attr("x", 20)
    .attr("y", backGroundHeight - 60)
    .attr("font", "lato")
    .attr("font-size", 10);

  console.log();

  for (i = 0; i < data.length; i++) {
    // console.log(data[i].short_name, data[i].jersey);
    const team1 = data[i].team;
    console.log(team1);
    teamName
      .enter()
      .append("text")
      .text(data[i].short_name)
      .attr("x", xScale(i) + 5 - 3)
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

      if (data[i].matches[j].team_match_num <= 9) {
        matchResultsquare
          .enter()
          .append("a")
          .attr("xlink:href", url)
          .attr("target", "_blank")
          .append("rect")
          .attr("x", xScale(i) + 5 - 3)
          .attr("y", backGroundHeight - 72 - j * 20)
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
      } else if (data[i].matches[j].team_match_num == 10) {
        matchResultsquare
          .enter()
          .append("a")
          .attr("xlink:href", url)
          .attr("target", "_blank")
          .append("rect")
          .attr("x", xScale(i) + 5 - 15)
          .attr("y", backGroundHeight - 70 - j * 20 - 52)
          .attr("height", 50)
          .attr("width", 50)
          .attr(
            "fill",
            resultColorPicker(data[i].matches[j].result) === 0
              ? data[i].jersey
              : resultColorPicker(data[i].matches[j].result)
          )
          .attr("stroke-width", 1)
          .attr("stroke", "cyan")
          .on("mouseover", function (event, d) {
            d3.select(this).attr("height", 50).attr("width", 50);
            tip
              .style("opacity", 1)
              .style("left", event.pageX - 20 + "px")
              .style("top", event.pageY - 75 + "px");
          })
          .on("mouseout", function (d) {
            d3.select(this).attr("height", 50).attr("width", 50);
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
    }
    tablePosition
      .enter()
      .append("text")
      .text(data[i].position)
      .attr("x", xScale(i) + 10)
      .attr("y", backGroundHeight - 240)
      .attr("fill", tablePositionColor(data[i].position))
      .attr("font-weight", "bold")
      .attr("font-size", 10);
  }

  roundRobinMarker
    .enter()
    .append("line")
    .attr("x1", 65)
    .attr("y1", backGroundHeight - 250)
    .attr("x2", backGroundWidth - 30)
    .attr("y2", backGroundHeight - 250)
    .attr("stroke", "#add8e6")
    .attr("stroke-width", 1);
  roundRobinMarker
    .enter()
    .append("line")
    .attr("x1", 65)
    .attr("y1", backGroundHeight - 235)
    .attr("x2", backGroundWidth - 30)
    .attr("y2", backGroundHeight - 235)
    .attr("stroke", "#add8e6")
    .attr("stroke-width", 1);

  // Tooltip

  var tip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
});
