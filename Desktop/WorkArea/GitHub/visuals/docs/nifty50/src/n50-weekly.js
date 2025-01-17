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


// get all checkboxes
var radios = document.querySelectorAll('input[type=radio]');

radio_0 = radios[0].addEventListener('change', function(){
    var selected = document.querySelector('input[type=radio]:checked');
    chart(arg_read_year=selected.value);
    })

radio_1 = radios[1].addEventListener('change', function(){
    var selected = document.querySelector('input[type=radio]:checked');
    chart(arg_read_year=selected.value);
    })

radio_2 = radios[2].addEventListener('change', function(){
    var selected = document.querySelector('input[type=radio]:checked');
    chart(arg_read_year=selected.value);

    })

radio_3 = radios[3].addEventListener('change', function(){
    var selected = document.querySelector('input[type=radio]:checked');
    chart(arg_read_year=selected.value);

    })



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
// console.log(week[0])

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


function reset_chart(){
    // var svg = d3.select("graph");
    // svg.selectAll("*").remove();
    // d3.selectAll("svg > *").remove(); // This is working
    svg_right.selectAll('.boxes').remove();
}

function chart(arg_read_year){
    reset_chart();

    for (let week_num in week){
        week_header(week[week_num]);
    }

    for (let day in days){

        day_header(days[day][0], days[day][1]);
    }

    d3.csv('./data/n50_2020_2023_with_day_week_year.csv').then((data) => {


    for (let row = 0; row < data.length; row++){

        let day = data[row]['day'];
        let dt = data[row]['HistoricalDate']
        let week = data[row]['week'];
        let year = data[row]['year'];
        let change = parseFloat( data[row]['daily_change_perc'] );


        if (year == arg_read_year){
            // console.log(day_as_number(day)[0])
            svg_right.append('rect')
                .attr('x', 35 + ( day_as_number(day)[0] * 50) )
                .attr('y', 35 + (week * 25))
                .attr('height',20 )
                .attr('width',40 )
                .attr('fill', 'green')
                .attr('stroke-fill','grey')
                .style("fill", change  <= 0 ? 'red' : 'green')
                .attr('stroke', '#704214')
                .attr('stroke-width', 0.2)
                .attr('opacity', 0.8)
                .classed('boxes', true)
                .on("mouseover", function (event, d) {
                    d3.select(this).attr('stroke', 'black').attr('stroke-width', 3);
                    tip.style("opacity", 1)
                        .style("left", 1000 + 250 + "px")
                        .style("top", event.pageY-20  + "px")
                        .html(

                                "<b>Date</b> &nbsp;&nbsp;&nbsp; : "  + dt +
                                "<br><b>Change %</b> : "  + change.toFixed(3) + ' %'

                            );

        })
        .on("mouseout", function(d){
                d3.select(this).attr("stroke", "#704214").attr('stroke-width', 0.2);
                tip.style("opacity", 0);

                }   )
            }
        }

    })

}


