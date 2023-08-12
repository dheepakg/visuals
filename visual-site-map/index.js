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

var uniq_cat;
d3.json("details.json").then((data) => {
  // Listing categories
  var cat_list = [];
  for (i = 0; i < data.length; i++) {
    cat_list.push(data[i].category);
  }
  // Unique Categories
  uniq_cat = [...new Set(cat_list)].sort();

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
  const categories = graph.selectAll("text").data(uniq_cat);

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
    // .attr("transform", `rotate(30)`)
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
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("class", (d) => "cat_" + d.category)
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
      d3.select(this).attr("r", 3).attr("fill", "white");
      tip.style("opacity", 0);
    });
  // Tooltip

  var tip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  // Chart separator
  lines
    .enter()
    .append("line")
    .attr("x1", 760)
    .attr("y1", (d) => yScale(2023) - 20)
    .attr("x2", 760)
    .attr("y2", (d) => yScale(2017) + 20)
    .attr("stroke", "silver")
    .attr("stroke-width", 2);

  // Categories heading
  texts
    .enter()
    .append("text")
    .text("Category")
    .attr("x", 850)
    .attr("y", (d) => yScale(2023) - 30)
    .attr("text-anchor", "middle")
    .attr("font-family", "monospace")
    .attr("font-size", 22);

  // Categories values

  for (i = 0; i < uniq_cat.length; i++) {
    categories
      .enter()
      .append("text")
      .text(uniq_cat[i])
      .attr("x", 780)
      .attr("y", (d) => yScale(2023) + i * 30)
      .attr("font-family", "monospace")
      .attr("class", (d) => "cat_" + uniq_cat[i])
      .attr("font-size", 15);
  }
});
