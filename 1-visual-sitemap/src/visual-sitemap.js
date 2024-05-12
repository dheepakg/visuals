const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", 900)
  .attr("height", 600);

const LINE_ORIGIN = 70;
const TEXT_ORIGIN = 20;

const graph = svg.append("g").attr("width", 500).attr("height", 400);

graph
  .append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", 800)
  .attr("height", 500)
  .attr("fill", "#1110")
  .attr("stroke", "#1111")
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
d3.json("./data/visual-sitemap.json").then((data) => {
  // Sclaing
  // Defines the year line
  const yScale = d3
    .scaleBand()
    .domain(data.map((item) => item.year))
    .range([50, 500])
    .paddingInner(0.2)
    .paddingOuter(0.2);

  // Defines position of dot
  const xScale = d3.scaleLinear().domain([1, 365]).range([LINE_ORIGIN, 730]);

  const lines = graph.selectAll("line").data(data);
  const texts = lines.select("text").data(data);
  const today_text = lines.select("text").data(data);
  const circles = lines.select("circle").data(data);

  texts
    .enter()
    .append("text")
    .text((d) => d.year)
    .attr("x", TEXT_ORIGIN)
    .attr("y", (d) => yScale(d.year) + 5)
    .attr("font-size", 18)
    .attr("font-weight", "Bold");


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

  // Below texts are for right side text showing count of posts per year
  texts
    .enter()
    .append("a")
    .attr("xlink:href", (d) => "https://dheepakg.github.io/year/" + d.year)
    .attr("target", "_blank")
    .append("text")
    .text((d) => d.yearly_count + "")
    .attr("x", TEXT_ORIGIN + 730)
    .attr("y", (d) => yScale(d.year) + 5)
    .attr("fill", "#0000EE")
    .attr("font-size", 10)
    .attr("text-anchor", "end")
    .append("title")
    .text((d) => "Posts published in " + d.year);

  lines
    .enter()
    .append("line")
    .attr("x1", LINE_ORIGIN)
    .attr("y1", (d) => yScale(d.year))
    .attr("x2", xScale(0))
    .attr("y2", (d) => yScale(d.year))
    .attr("stroke", "#add8e6")
    .attr("stroke-width", 10)
    .transition()
    .duration(1200)
    .attr("x2", (d) => xScale(yearCompleted(d.year)) * 1.0)
    .attr("stroke-width", 2);

  circles
    .enter()
    .append("a")
    .attr("xlink:href", (d) => d.url)
    .attr("target", "_blank")
    .append("circle")
    .attr("r", 3)
    .attr("cx", (d) => xScale(dayOfTheYear(d.pub_on)))
    .attr("cy", (d) => yScale(d.year))
    .attr("fill", "#0000EE")
    .on("mouseover", function (event, d) {
      d3.select(this).attr("r", 6).attr("fill", "green");

      tip
        .style("opacity", 1)
        .style("left", event.pageX - 20 + "px")
        .style("top", event.pageY - 75 + "px")
        // .style("display", "inline-block")
        .html(
          d.title +
            "<br>Published on: " +
            d.pub_on +
            "<br>Category: " +
            d.category
        );
    })

    .on("mouseout", function (d) {
      d3.select(this).attr("r", 3).attr("fill", "#0000EE");
      tip.style("opacity", 0);
    });

  // Tooltip

  var tip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
});
