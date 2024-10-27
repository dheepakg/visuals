// create svg element:
var svg_right = d3.select(".canvas-right").append("svg").attr("width", 2000).attr("height", 1500);


width = { 'square': 20, 'rect':10, 'long': 50};

// let ENABLE_CHART = true;

const graph = svg_right.append("g").attr("width", 1000).attr("height", 3000);

graph
    .append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 600)
    .attr("height", 1400)
    .attr("fill", "#1110")
    .attr("stroke", "#1111")
    .attr("stroke-width", 3);


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
            day_number = [7,'S'];
    }
    return day_number;

}

// var checkedValue = document.querySelector('.radioButton:checked').value;

// console.log(checkedValue);

let read_year = 2020;

// Days are fixed. Why shouldn't we hard code it?
let days = [['S', 1 ], ['M', 2], ['T', 3], ['W', 4], ['T', 5], ['F', 6], ['S', 7]];

function day_header(day_letter, day_number){
        // console.log(day_num, day_num[1], day_num[0])
        svg_right.append('text')
            .text(day_letter)
            .attr('x', 50 + (day_number * 50) )
            .attr('y', 50)
            .attr('font-size',20)
            .attr('font-family','monospace');
    }


for (let day in days){
    // console.log(day, days[day], days[day][0], days[day][1])

    day_header(days[day][0], days[day][1]);
}

// Week header

let week = Array(53).fill().map((element, index) => index + 1);
console.log(week[0])

function week_header(week_num){
    svg_right.append('text')
            .text(week_num)
            .attr('x', 45 )
            .attr('y', 55 + (week_num * 25))
            .attr('font-size',20)
            .attr('font-family','monospace')
            .style("text-anchor","end");
}

for (let week_num in week){
    week_header(week[week_num]);
}


d3.csv('./data/n50_2020_2023_with_day_week_year.csv').then((data) => {

    // const lines = graph.selectAll("line").data(data);


    for (let row = 0; row < data.length; row++){

        let day = data[row]['day'];
        let week = data[row]['week'];
        let year = data[row]['year'];

        if (year == read_year){
            console.log(day_as_number(day)[0])
            svg_right.append('rect')
                .attr('x', 35 + ( day_as_number(day)[0] * 50) )
                .attr('y', 35 + (week * 25))
                .attr('height',20 )
                .attr('width',40 )
                .attr('fill', 'green')
                .attr('stroke-fill','grey')


        }
    }

})
