// create svg element:
var svg_right = d3.select(".canvas-right").append("svg").attr("width", 2000).attr("height", 5000)


width = { 'square': 20, 'rect':10, 'long': 50};

// let ENABLE_CHART = true;

// Tooltip

let tip1 = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip-right")
    .style("opacity", 0);

function day_as_number(day){
    let day_number = 0;
    switch (day) {
        case 'Sunday':
            day_number = [1,'S'];
            break;
        case 'Monday':
            day_number = [2,'M'];
            break;
        case 'Tuesday':
            day_number = [3,'T'];
            break;
        case 'Wednesday':
            day_number = [4,'W'];
            break;
        case 'Thursday':
            day_number = [5,'T'];
            break;
        case 'Friday':
            day_number = [6,'F'];
            break;
        case 'Saturday':
            day_number = [7,'F'];
    }
    return day_number;

}

d3.csv('./data/n50_2020_2023_with_day_week_year.csv').then((data) => {

    for (let row = 0; row < data.length; row++){

        let day = data[row]['day'];
        let week = data[row]['week'];
        let year = data[row]['year'];
        console.log(day, day_as_number(day)[0]);

        // Header - Days
        svg_right.append('text')
            .text(day_as_number(day)[1])
            .attr('x', 50 + (day_as_number(day)[0] * 50) )
            .attr('y', 50)
            .attr('font-size',15)
            .attr('font-family','monospace');

        // Y-axis - Week
        svg_right.append('text')
            .text(week)
            .attr('x', 40)
            .attr('y', 60 + (week * 20))
            .attr('font-size',15)
            .attr('font-family', 'monospace')
            .style("text-anchor","end");

    }

})
