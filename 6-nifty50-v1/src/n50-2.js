// create svg element:
var svg = d3.select(".canvas").append("svg").attr("width", 2000).attr("height", 5650)


width = { 'square': 20, 'rect':10, 'long': 50}

let ENABLE_CHART = true;

// Tooltip

let tip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


d3.csv('./data/nifty_50_2023.csv').then((data) => {

    for (let row =0; row < data.length; row++){

    // console.log(data[row])

    let dt = data[row]['date'].split("-");
    year = parseInt(dt[2])
    let cnt = parseInt(data[row]['day_count']);
    let open = parseFloat(data[row]['OPEN']);
    let close = parseFloat(data[row]['CLOSE']);
    let change = parseFloat( data[row]['daily_change_perc'] );

   // Header - years
        svg.append('text')
        .text(year)
        .attr('x', 5 + (year - 2019) * 20)
        .attr('y', 20)
        .attr('font-size',15)
        .attr('font-family','monospace');

    // // Y Axis - Days
    // svg.append('text')
    //     .text(cnt)
    //     .attr('x', 10)
    //     .attr('y', 75 + (row * 22) )
    //     .attr('font-size',15)
    //     .attr('font-family', 'monospace');
    //     // .style("text-anchor","end");


    if (ENABLE_CHART) {
    // Rectangles with colored
    svg.append('rect')
        .attr('x',0 + ((year-2019)  * 20) )
        .attr('y', 60 + ((cnt-1) * 22) )
        .attr('width', width['long'])
        .attr('height', 20)
        .style("fill", change  <= 0 ? 'red' : 'green')
        .attr('stroke', '#704214')
        .attr('stroke-width', 0.2)
        .attr('opacity', 0.8)
        .on("mouseover", function (event, d) {
            d3.select(this).attr('stroke', 'black').attr('stroke-width', 3);
            tip.style("opacity", 1)
                .style("left", 300 + 250 + "px")
                .style("top", event.pageY-20  + "px")
                .html(
                        "<b>Day </b>    &nbsp;&nbsp;&nbsp;&nbsp;    : "  + data[row]['day_count'] +
                        "<br><b>Date</b> &nbsp;&nbsp;&nbsp; : "  + data[row]['date'] +
                        "<br><b>Open</b> &nbsp;&nbsp;&nbsp; : "  + open.toLocaleString() +
                        "<br><b>Close</b> &nbsp;&nbsp;&nbsp;: "  + close.toLocaleString() +
                        "<br><b>Change %</b> : "  + change.toFixed(3) + ' %'

                    );

        })
        .on("mouseout", function(d){
            d3.select(this).attr("stroke", "#704214").attr('stroke-width', 0.2);
            tip.style("opacity", 0);

        })
    }
    }



})

d3.csv('./data/nifty_50_2022.csv').then((data) => {

    for (let row =0; row < data.length; row++){

    // console.log(data[row])

    let dt = data[row]['date'].split("-");
    year = parseInt(dt[2])
    let cnt = parseInt(data[row]['day_count']);
    let open = parseFloat(data[row]['OPEN']);
    let close = parseFloat(data[row]['CLOSE']);
    let change = parseFloat( data[row]['daily_change_perc'] );

   // Header - years
    svg.append('text')
        .text(year)
        .attr('x', 5 + (year - 2019) * 55)
        .attr('y', 20)
        .attr('font-size',15)
        .attr('font-family','monospace');

    // // Y Axis - Days
    // svg.append('text')
    //     .text(cnt)
    //     .attr('x', 10)
    //     .attr('y', 75 + (row * 22) )
    //     .attr('font-size',15)
    //     .attr('font-family', 'monospace');
    //     // .style("text-anchor","end");

    if (ENABLE_CHART) {
    // Rectangles with colored
    svg.append('rect')
        .attr('x',0 + ((year-2019)  * 55) )
        .attr('y', 60 + ((cnt-1) * 22) )
        .attr('width', width['long'])
        .attr('height', 20)
        .style("fill", change  <= 0 ? 'red' : 'green')
        .attr('stroke', '#704214')
        .attr('stroke-width', 0.2)
        .attr('opacity', 0.8)
        .on("mouseover", function (event, d) {
            d3.select(this).attr('stroke', 'black').attr('stroke-width', 3);
            tip.style("opacity", 1)
                .style("left", 300 + 250 + "px")
                .style("top", event.pageY-20  + "px")
                .html(
                        "<b>Day </b>    &nbsp;&nbsp;&nbsp;&nbsp;    : "  + data[row]['day_count'] +
                        "<br><b>Date</b> &nbsp;&nbsp;&nbsp; : "  + data[row]['date'] +
                        "<br><b>Open</b> &nbsp;&nbsp;&nbsp; : "  + open.toLocaleString() +
                        "<br><b>Close</b> &nbsp;&nbsp;&nbsp;: "  + close.toLocaleString() +
                        "<br><b>Change %</b> : "  + change.toFixed(3) + ' %'

                    );

        })
        .on("mouseout", function(d){
            d3.select(this).attr("stroke", "#704214").attr('stroke-width', 0.2);
            tip.style("opacity", 0);

        })
    }
    }

})


d3.csv('./data/nifty_50_2021.csv').then((data) => {


for (let row =0; row < data.length; row++){

    // console.log(data[row])

    let dt = data[row]['date'].split("-");
    year = parseInt(dt[2])
    let cnt = parseInt(data[row]['day_count']);
    let open = parseFloat(data[row]['OPEN']);
    let close = parseFloat(data[row]['CLOSE']);
    let change = parseFloat( data[row]['daily_change_perc'] );

   // Header - years
        svg.append('text')
        .text(year)
        .attr('x', 5 + (year - 2019) * 120)
        .attr('y', 20)
        .attr('font-size',15)
        .attr('font-family','monospace');

    // // Y Axis - Days
    // svg.append('text')
    //     .text(cnt)
    //     .attr('x', 10)
    //     .attr('y', 75 + (row * 22) )
    //     .attr('font-size',15)
    //     .attr('font-family', 'monospace');
    //     // .style("text-anchor","end");;

    if (ENABLE_CHART) {
    // Rectangles with colored
    svg.append('rect')
        .attr('x',0 + ((year-2019)  * 120) )
        .attr('y', 60 + ((cnt-1) * 22) )
        .attr('width', width['long'])
        .attr('height', 20)
        .style("fill", change  <= 0 ? 'red' : 'green')
        .attr('stroke', '#704214')
        .attr('stroke-width', 0.2)
        .attr('opacity', 0.8)
        .on("mouseover", function (event, d) {
            d3.select(this).attr('stroke', 'black').attr('stroke-width', 3);
            tip.style("opacity", 1)
                .style("left", 300 + 250 + "px")
                .style("top", event.pageY-20  + "px")
                .html(
                        "<b>Day </b>    &nbsp;&nbsp;&nbsp;&nbsp;    : "  + data[row]['day_count'] +
                        "<br><b>Date</b> &nbsp;&nbsp;&nbsp; : "  + data[row]['date'] +
                        "<br><b>Open</b> &nbsp;&nbsp;&nbsp; : "  + open.toLocaleString() +
                        "<br><b>Close</b> &nbsp;&nbsp;&nbsp;: "  + close.toLocaleString() +
                        "<br><b>Change %</b> : "  + change.toFixed(3) + ' %'

                    );

        })
        .on("mouseout", function(d){
            d3.select(this).attr("stroke", "#704214").attr('stroke-width', 0.2);
            tip.style("opacity", 0);

        })
    }
    }

})


d3.csv('./data/nifty_50_2020.csv').then((data) => {


for (let row =0; row < data.length; row++){

    // console.log(data[row])

    let dt = data[row]['date'].split("-");
    year = parseInt(dt[2])
    let cnt = parseInt(data[row]['day_count']);
    let open = parseFloat(data[row]['OPEN']);
    let close = parseFloat(data[row]['CLOSE']);
    let change = parseFloat( data[row]['daily_change_perc'] );

   // Header - years
        svg.append('text')
        .text(year)
        .attr('x', 5 + (year - 2019) * 320)
        .attr('y', 20)
        .attr('font-size',15)
        .attr('font-family','monospace');

    // Y Axis - Days
    svg.append('text')
        .text(cnt)
        .attr('x', 10)
        .attr('y', 75 + (row * 22) )
        .attr('font-size',15)
        .attr('font-family', 'monospace');
        // .style("text-anchor","begin");

    if (ENABLE_CHART) {
    // Rectangles with colored
    svg.append('rect')
        .attr('x',0 + ((year-2019)  * 320) )
        .attr('y', 60 + ((cnt-1) * 22) )
        .attr('width', width['long'])
        .attr('height', 20)
        .style("fill", change  <= 0 ? 'red' : 'green')
        .attr('stroke', '#704214')
        .attr('stroke-width', 0.2)
        .attr('opacity', 0.8)
        .on("mouseover", function (event, d) {
            d3.select(this).attr('stroke', 'black').attr('stroke-width', 3);
            tip.style("opacity", 1)
                .style("left", 300 + 250 + "px")
                .style("top", event.pageY-20  + "px")
                .html(
                        "<b>Day </b>    &nbsp;&nbsp;&nbsp;&nbsp;    : "  + data[row]['day_count'] +
                        "<br><b>Date</b> &nbsp;&nbsp;&nbsp; : "  + data[row]['date'] +
                        "<br><b>Open</b> &nbsp;&nbsp;&nbsp; : "  + open.toLocaleString() +
                        "<br><b>Close</b> &nbsp;&nbsp;&nbsp;: "  + close.toLocaleString() +
                        "<br><b>Change %</b> : "  + change.toFixed(3) + ' %'

                    );

        })
        .on("mouseout", function(d){
            d3.select(this).attr("stroke", "#704214").attr('stroke-width', 0.2);
            tip.style("opacity", 0);

        })
    }
    }

})
