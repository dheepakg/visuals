// Set dimensions & margins

const margin = { top: 70, right: 30, bottom: 40, left: 80};
const width = 1200 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// Set up x & y scales

const x = d3.scaleTime()
    .range([0,width]);


const y = d3.scaleLinear()
    .range([height, 0]);

// Create SVF element and append it to the chart container


const svg = d3.select(".canvas")
            .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
            .append('g')
                .attr("transform", `translate(${margin.left}, ${margin.top})`);
// Create fake dataset

d3.csv('../data/nifty50_2022.csv',

    function(d){
    return { //date : d3.timeParse("%Y-%m-%d")(d.Date),
            YTM_perc : d3.format(',.2f')(d.YTM_perc),
            YearMonth :d3.timeParse("%Y%m")(d.YearMonth),
            Close:d3.format(',.2f')(d.Close)
         }
     },


).then(

      function(d) {
     console.log(d)

// Define x & y domains
        x.domain(d3.extent(d,  d=> d.YearMonth));
        y.domain(d3.extent([2.72, 6.43, 2.19, -3.01, 0.76, -2.65,
                            -10.47, -5.91, -2.97, -0.91, -4.72, -1.62, 0.0 ]));


        // y.domain(d3.extent(d, d=> d.Close));


// add x-axis

svg.append('g')
    .attr("transform", `translate(0,148)`)
    .call(d3.axisBottom(x)
        .ticks(d3.timeMonth.every(1))
        .tickFormat(d3.timeFormat("%b")));

// add y-axis
svg.append('g')
    .attr("transform", `translate(0,148)})`)
    .call(d3.axisLeft(y))

// Create line generator

const line = d3.line()
            .x(d => x(d.YearMonth))
            .y(d => y(d.YTM_perc))

console.log(line)
// Add line path to the SVG element

svg.append('path')
    .datum(d)
    .attr('fill','none')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 1)
    .attr('d', line);

    }

);









