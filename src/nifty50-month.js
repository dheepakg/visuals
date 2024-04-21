// Set dimensions & margins

const margin = { top: 70, right: 30, bottom: 40, left: 80};
const width = 1200 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom ;

// Set up x & y scales

const x = d3.scaleTime()
    .range([0,width]);




const y = d3.scaleLinear()
    .range([2*height, height/2]);

const close_y = d3.scaleLinear()
    .range([2*height, height/2]);

// Create SVF element and append it to the chart container


const svg = d3.select(".canvas")
            .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', 2*height + margin.top + margin.bottom)
            .append('g')
                // .attr("transform", `translate(${margin.left}, ${margin.top})`);
                .attr("transform", `translate(${margin.left}, -75)`);
// Import data

d3.csv("../data/nifty50_2022.csv").then(function(data){
    const parseDate = d3.timeParse("%Y-%m-%d");
    data.forEach(d => {
        d.date = parseDate(d.Date);
        d.YTM_perc = +d.YTM_perc;
        d.close = +d.Close;
        console.log(d3.timeFormat('%b')(d.Date), d.YTM_perc)
    })

console.log(data)




// const data = [
//     {date:new Date("2022-01-01"), YTM_perc:0},
//     {date:new Date("2022-01-31"), YTM_perc:-1.62},
//     {date:new Date("2022-02-28"), YTM_perc:-4.72},
//     {date:new Date("2022-03-31"), YTM_perc:-0.91},
//     {date:new Date("2022-04-29"), YTM_perc:-2.97},
//     {date:new Date("2022-05-31"), YTM_perc:-5.91},
//     {date:new Date("2022-06-30"), YTM_perc:-10.47},
//     {date:new Date("2022-07-29"), YTM_perc:-2.65},
//     {date:new Date("2022-08-30"), YTM_perc:0.76},
//     {date:new Date("2022-09-30"), YTM_perc:-3.01},
//     {date:new Date("2022-10-31"), YTM_perc:2.19},
//     {date:new Date("2022-11-30"), YTM_perc:6.43},
//     {date:new Date("2022-12-30"), YTM_perc:2.72},
// ];

// Define x & y domains

console.log(d3.extent(data, d=> d.date))
console.log(d3.extent(data, d=>d.YTM_perc))

x.domain(d3.extent(data, d=> d.date));
y.domain(d3.extent(data, d=>d.YTM_perc));

close_y.domain(d3.extent(data, d=>d.close));

console.log(x(d3.timeFormat('%Y-%m-%d')('2022-10-31')))

// add x-axis
svg.append('g')
    .attr('transform', `translate(0,${y(0)})`)
    .call(d3.axisBottom(x)
        .ticks(d3.timeDay.every(31))
        .tickFormat(d3.timeFormat("%d-%b")));



// add y-axis
svg.append('g')
    .call(d3.axisLeft(y));


// Create line generator
const YTM_line = d3.line()
                .x(d=> x(d.date))
                .y(d=> y(d.YTM_perc));


// Another line for daily close

const close_line = d3.line()
                .x(d => x(d.date))
                .y( d=> close_y(d.close));


// Add line path to the SVG element

// svg.append('path')
//     .datum(data)
//     .attr('fill','none')
//     .attr('stroke', 'steelblue')
//     .attr('stroke-width',1)
//     .attr('d', YTM_line)

svg.append('path')
    .datum(data)
    .attr('fill','none')
    .attr('stroke', 'grey')
    .attr('stroke-width',1)
    .attr('d', close_line)


svg.append("text")
    .attr("class", "chart-title")
    .attr("x", margin.left + 200)
    .attr("y", 150)
    .style("font-size", "24px")
    .style("font-weight", "bold")
    .style("font-family","sans-serif")
    .text("Nifty 50 Index movement of 2022 over months")

    })
