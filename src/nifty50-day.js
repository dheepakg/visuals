// Set dimensions & margins

const margin = { top: 70, right: 30, bottom: 40, left: 80};
const width = 1200 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom ;

// Set up x & y scales

const x = d3.scaleTime()
    .range([0,width]);


const y = d3.scaleLinear()
    .range([2*height, height/2]);


// Create SVF element and append it to the chart container


const svg = d3.select(".canvas")
            .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', 2*height + margin.top + margin.bottom)
            .append('g')
                // .attr("transform", `translate(${margin.left}, ${margin.top})`);
                .attr("transform", `translate(${margin.left}, -75)`);

// Create tooltip div

const tooltip = d3.select("body")
                .append("div")
                .attr("class", "tooltip");


// Import data

d3.csv("../data/N50_daily.csv").then(function(data){
    const parseDate = d3.timeParse("%d-%m-%Y");
    data.forEach(d => {
        d.date = parseDate(d.Date);
        d.close = +d.Close;
        d.sharesTraded = +d.SharesTraded;
    })


// Define x & y domains
x.domain(d3.extent(data, d=> d.date));

// y.domain(d3.extent(data, d=>d.close));
y.domain([15000, d3.max(data, d=>d.close)+1000]);



// add x-axis
svg.append('g')
    .attr('transform', `translate(0,${2*height})`)
    .style("font-size", "14px")
    .call(d3.axisBottom(x)
        .tickValues(x.ticks(d3.timeMonth.every(1)))
        .tickFormat(d3.timeFormat("%b")))
    .call(g => g.select(".domain").remove())
    .selectAll(".tick line")
    .style("stroke-opacity",0)
svg.selectAll(".tick text")
    .attr("fill", "#777");




// add y-axis: tickFormat to have k instead of 1000
svg.append('g')
    .style("font-size", "14px")
    .call(d3.axisLeft(y)
        .ticks((d3.max(data, d=> d.close)/3000))
        .tickFormat(d => {
            return `${(d/1000).toFixed(0)}k`;
        })
        .tickSize(0)
        .tickPadding(10))
    .call(g => g.select(".domain").remove())
    .selectAll(".tick text")
    .style("fill", "#777")
    .style("visibility", (d,i,nodes) => {
        if ( i === 0){
            return "hidden";
        } else {
            return "visible";
        }
    });


// Add vertical gridlines

svg.selectAll("xGrid")
    .data(x.ticks().slice(0))
    .join("line")
    .attr("x1", d => x(d))
    .attr("x2", d => x(d))
    .attr("y1", height/2)
    .attr("y2", 2*height)
    .attr("stroke", "#e0e0e0")
    .attr("stroke-width", .5)

// Adding horizontal grid lines

svg.selectAll("yGrid")
    .data(y.ticks().slice(1))
    .join("line")
    .attr("x1", 0)
    .attr("x2", width)
    .attr("y1", d => y(d))
    .attr("y2", d => y(d))
    .attr("stroke", "#e0e0e0")
    .attr("stroke-width", .5)


// Add y-axis label

svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left +20)
    .attr("x", 0 - (height) - 60)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("font-size", "14px")
    .style("fill", "#777")
    .style("font-family",'sans-serif')
    .text("Nifty 50 Index")

// Create line generator

const close_line = d3.line()
                .x(d => x(d.date))
                .y( d=> y(d.close));


// Add line path to the SVG element

svg.append('path')
    .datum(data)
    .attr('fill','none')
    .attr('stroke', 'grey')
    .attr('stroke-width',1)
    .attr('d', close_line)


// Add circle element

const circle = svg.append('circle')
                .attr("r", 0)
                .attr("fill", "steelblue")
                .attr("stroke", "white")
                .attr("opacity", .70)
                .style("pointer-events", "none");

// Create the svg element and append it to the chart container

const listeningRect = svg.append('rect')
                        .attr("width", 1200)
                        .attr("height", 400)
                        .attr("stroke", "black");

listeningRect.on("mousemove", function(event){
    const [xCoord] = d3.pointer(event, this);
    const bisectDate = d3.bisector(d => d.date).left;
    const x0 = x.invert(xCoord);
    const i = bisectDate(data, x0, 1);
    const d0 = data[i - 1];
    const d1 = data[i];
    const d = x0 - d0.date > d1.date - x0 ? d1 : d0;
    const xPos = x(d.date);
    const yPos = y(d.close);

    console.log(xPos);
    // Update the circle position

    circle.attr("cx", xPos)
        .attr("cy", yPos);

// Add tranisition to circle
    circle.transition()
    .duration(50)
    .attr("r", 5)

// Add our tooltip

tooltip
    .style("display", "block")
    .style("left", `${xPos}px`)
    .style("top", `${yPos}px`)
    .html(`<strong> Date: </strong> ${d.date.toLocaleDateString()} </br> <strong> Index: </strong> ${d.close} `)

});

// Listening rectangle leave function

listeningRect.on("mouseleave", function(){
    circle.transition()
        .duration(50)
        .attr("r", 1);

tooltip.style("display", "none");
});




// Chart Title

svg.append("text")
    .attr("class", "chart-title")
    .attr("x", margin.left + 200)
    .attr("y", 150)
    .style("font-size", "30px")
    .style("font-weight", "bold")
    .style("font-family","sans-serif")
    .text("Nifty 50 Index movement - 2022")


// Add source Element

svg.append("text")
    .attr("class", "source-credit")
    .attr("x", width - 1125)
    .attr("y", 2* height + margin.bottom )
    .style("font-size", "9px")
    .style("font-family", "sans-serif")
    .text("Source: https://www.nseindia.com/reports-indices-historical-index-data")

    })
