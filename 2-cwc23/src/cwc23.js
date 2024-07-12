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
  .attr("fill", "#1110")
  .attr("stroke", "#1111")
  .attr("stroke-width", 3);

function resultColorPicker(match_result) {
  if (match_result === "lost") {
    // return "#E22a09";
    // return "#e60000";
    return "#D1D6D8";
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
  } else if (team_match_num === 11) {
    return 30;
  } else {
    return 60;
  }
}

d3.json("./data/cwc23.json").then((data) => {
  const baseLine = graph.selectAll("line").data(data);
  const roundRobinMarker = graph.selectAll("line").data(data);
  const teamName = graph.selectAll("text").data(data);

  const matchResultsquare = graph.selectAll("rect").data(data);
  const tablePosition = graph.selectAll("text").data(data);
  const legendMatchResult = graph.selectAll("rect").data(data);
  const legendDesc = graph.selectAll("text").data(data);
  const semiMarker = graph.selectAll("text").data(data);

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
    .attr("fill", resultColorPicker("lost"))
    .attr("stroke-width", 1)
    .attr("stroke", "cyan");

  legendDesc
    .enter()
    .append("text")
    .text("Each box indicates a match. Lost match is in grey")
    .attr("x", 50)
    .attr("y", 515)
    // .attr("font", "lato")
    .attr("font", "Lato")
    .attr("font-size", 15);

  svg
    .append("text")
    .attr("x", 40)
    .attr("y", backGroundHeight - 230)
    .attr("font-size", 10)
    .attr("id", "title")
    .style("fill", "black")
    .attr("transform", "translate(20,0)")
    .attr("text-anchor", "middle")
    .selectAll("tspan")
    .data("LEAGUE  MATCHES".split(""))
    .enter()
    .append("tspan")
    .attr("x", 0)
    .attr("dy", "0.8em")
    .text(function (d) {
      return d;
    });

  svg
    .append("text")
    .attr("x", 40)
    .attr("y", backGroundHeight - 300)
    .attr("font-size", 10)
    .attr("id", "title")
    .style("fill", "black")
    .attr("transform", "translate(20,0)")
    .attr("text-anchor", "middle")
    .selectAll("tspan")
    .data("SEMIS".split(""))
    .enter()
    .append("tspan")
    .attr("x", 0)
    .attr("dy", "0.8em")
    .text(function (d) {
      return d;
    });

  legendDesc
    .enter()
    .append("text")
    .text("Round 1")
    .attr("x", 20)
    .attr("y", backGroundHeight - 60)
    // .attr("font", "lato")
    .attr("font-size", 10)
    .attr("dy", "0.8em");

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
      } else if (data[i].matches[j].team_match_num == 11) {
        matchResultsquare
          .enter()
          .append("a")
          .attr("xlink:href", url)
          .attr("target", "_blank")
          .append("rect")
          .attr("x", xScale(i) + 5 - 25)
          // .attr("y", backGroundHeight - 70 - j * 20 - 42)
          .attr("y", 117)
          .attr("height", 75)
          .attr("width", 75)
          .attr(
            "fill",
            resultColorPicker(data[i].matches[j].result) === 0
              ? data[i].jersey
              : resultColorPicker(data[i].matches[j].result)
          )
          .attr("stroke-width", 1)
          .attr("stroke", "cyan")
          .on("mouseover", function (event, d) {
            d3.select(this).attr("height", 75).attr("width", 75);
            tip
              .style("opacity", 1)
              .style("left", event.pageX - 20 + "px")
              .style("top", event.pageY - 75 + "px");
          })
          .on("mouseout", function (d) {
            d3.select(this).attr("height", 75).attr("width", 75);
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

  semiMarker
    .enter()
    .append("line")
    .attr("stroke", "#add8e6")
    .attr("stroke-width", 1)
    .attr("x1", 65)
    .attr("y1", backGroundHeight - 305)
    .attr("x2", backGroundWidth - 30)
    .attr("y2", backGroundHeight - 305);
  // Tooltip

  var tip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
});
