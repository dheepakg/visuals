const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", 1000)
  .attr("height", 800);

const LINE_ORIGIN = 70;
const TEXT_ORIGIN = 20;

const graph = svg.append("g").attr("width", 500).attr("height", 400);

graph
  .append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", 1000)
  .attr("height", 500)
  .attr("fill", "#fff1e5")
  .attr("stroke", "black")
  .attr("stroke-width", 3);

function dayOfTheYear(dat) {
  dt = new Date(dat);
  return (
    (Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate()) -
      Date.UTC(dt.getFullYear(), 0, 0)) /
    24 /
    60 /
    60 /
    1000
  );
}

function currentYear() {
  let currentTime = new Date();
  return currentTime.getFullYear();
}

function yearCompleted(input_year) {
  dt = new Date();
  //   console.log("inside func", input_year, dt.getFullYear());
  if (input_year === dt.getFullYear()) {
    return dayOfTheYear(dt);
  } else {
    return 365;
  }
}

d3.json("details.json").then((data) => {
  // Defines the year line
  const yScale = d3
    .scaleBand()
    .domain(data.map((item) => item.year))
    .range([50, 500])
    .paddingInner(0.2)
    .paddingOuter(0.2);
  const xScale = d3.scaleLinear().domain([1, 365]).range([LINE_ORIGIN, 730]);

  const lines = graph.selectAll("line").data(data);
  const texts = lines.select("text").data(data);
  const today_text = lines.select("text").data(data);
  const circles = lines.select("circle").data(data);

  var tip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  console.log(data.length);

  for (i = 0; i < data.length; i++) {
    var var_year = data[i].year;
    console.log(var_year);

    texts
      .enter()
      .append("text")
      .text(var_year)
      .attr("x", TEXT_ORIGIN)
      .attr("y", yScale(var_year) + 5)
      .attr("font-size", 18)
      .attr("font-weight", "Bold");
    console.log("printed var_year");
    lines
      .enter()
      .append("line")
      .attr("x1", LINE_ORIGIN)
      .attr("y1", yScale(var_year))
      .attr("x2", xScale(0))
      .attr("y2", yScale(var_year))
      .attr("stroke", "#add8e6")
      .attr("stroke-width", 10)
      .transition()
      .duration(1200)
      .attr("x2", xScale(yearCompleted(var_year)) * 1.0)
      .attr("stroke-width", 2);
    console.log("printed line");
    today_text
      .enter()
      .append("text")
      .transition()
      .duration(1200)
      .text("Today")
      .attr("x", xScale(yearCompleted(currentYear())))
      .attr("y", yScale(currentYear()) - 10)
      .attr("text-anchor", "middle")
      .attr("font-family", "monospace")
      .attr("font-size", 10);
    console.log("printed today_text");
    texts
      .enter()
      .append("a")
      .attr("xlink:href", "https://dheepakg.github.io/year/" + var_year)
      .attr("target", "_blank")
      .append("text")
      .text(data[i].posts.length)
      .attr("x", TEXT_ORIGIN + 730)
      .attr("y", yScale(var_year) + 5)
      .attr("fill", "#0000EE")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .append("title")
      .text("Posts published in " + var_year);

    console.log("printed count");

    for (j = 0; j < data[i].posts.length; j++) {
      //   console.log(data[i].posts[j]["pub_on"]);
      console.log(data[i].posts[j]["title"]);
      var var_tile = data[i].posts[j]["title"];
      var var_pub_on = data[i].posts[j]["pub_on"];
      var var_cat = data[i].posts[j]["category"];
      circles
        .enter()
        .append("a")
        .attr("xlink:href", data[i].posts[j]["url"])
        .attr("target", "_blank")
        .append("circle")
        .attr("r", 3)
        .attr("cx", xScale(dayOfTheYear(data[i].posts[j]["pub_on"])))
        .attr("cy", yScale(data[i].year))
        .attr("fill", "white")
        .attr("stroke", "black")
        .attr("class", "cat_" + data[i].posts[j]["category"])
        .on("mouseover", function (event) {
          d3.select(this).attr("r", 6).attr("fill", "green");

          tip
            .style("opacity", 1)
            .style("left", event.pageX - 20 + "px")
            .style("top", event.pageY - 75 + "px")
            // .style("display", "inline-block")
            .html(
              var_tile +
                "<br>Published on: " +
                var_pub_on +
                "<br>Category: " +
                var_cat
            );
        })

        .on("mouseout", function (d) {
          d3.select(this).attr("r", 3).attr("fill", "white");
          tip.style("opacity", 0);
        });
    }
  }
});
