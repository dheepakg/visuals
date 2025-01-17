canvas_breadth = 750;
canvas_length = 750;

const svg = d3
    .select(".canvas")
    .append("svg")
    .attr("width", canvas_breadth + 50)
    .attr("height", canvas_length + 50);

const graph = svg.append("g").attr("width", 500).attr("height", 500);

graph
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", canvas_breadth)
    .attr("height", canvas_length)
    .attr("fill", "#fff1e5")
    .attr("stroke", "black")
    .attr("stroke-width", 2);
/* */
// Largest circle
graph.append('circle')
        .attr('cx', (canvas_breadth - 50)/2)
        .attr('cy', (canvas_length - 50)/2)
        .attr('r', (canvas_length/3)+50)
        .attr('fill','white')
        .attr('stroke','black')
/*
// Smaller  circle
graph.append('circle')
        .attr('cx', (canvas_breadth - 50)/2)
        .attr('cy', (canvas_length - 50)/2)
        .attr('r', (canvas_length/5))
        .attr('fill', 'transparent')
        .attr('stroke','black')

*/
// Vertical line

graph.append('line')
    .attr('x1',700)
    .attr('y1',350)
    .attr('x2',10)
    .attr('y2',350)
    .attr('stroke','black')

// Horizontal line

graph.append('line')
    .attr('x1',350)
    .attr('y1',10)
    .attr('x2',350)
    .attr('y2',700)
    .attr('stroke','black')

// Title - Quadrant 1

graph.append('text')
    .text('Tools')
    .attr('x', 600)
    .attr('y', 50 )
    .attr("font-size", 20)

// Title - Quadrant 2

graph.append('text')
    .text('Platform')
    .attr('x', 50)
    .attr('y', 50 )
    .attr("font-size", 20)


// Title - Quadrant 3

graph.append('text')
    .text('Language')
    .attr('x', 50)
    .attr('y', 650 )
    .attr("font-size", 20)

// Title - Quadrant 4

graph.append('text')
    .text('Framework')
    .attr('x', 600)
    .attr('y', 650 )
    .attr("font-size", 20)

// Custom function for plotting

// Center of circle is based on category & Experience
// Center of circle = (x,y)
function experience(min_date){
    const today = new Date();
    const min = new Date(min_date);

    const exp_epoch = today - min;
    var exp_msecs = new Date(exp_epoch); // miliseconds from epoch
    return Math.abs(exp_msecs.getUTCFullYear() - 1970);
    // return diff

}

// Radius constant



// Color depends on the recency of the skill

function recency(last_used_date){
    const today = new Date();
    const last_used = new Date(last_used_date);

    const diff = today - last_used;

    if(diff < 365){
        return 'green';
    } else if(diff < 365*2){
        return 'yellow';
    } else {
        return 'red';
    }
}



d3.csv("./data/skill-data.csv").then((data) => {
    // console.log(data['category']);
    console.log(data)
    var min_date = d3.min(data, function(d) { return d.started_on; });
    var max_exp = experience(min_date)
    for (let i=0; i<data.length; i++){
        const category = data[i]['category'];
        const started_date = data[i]['started_on'];
        const recent_usage = data[i]['last_used_on'];

        radius = ( (canvas_length/3)+50) * ( experience(started_date) / max_exp)

        console.log(category, started_date, recent_usage, experience(started_date), max_exp);
        var j = 2;
    var x_calc = ((canvas_breadth - 50)/2) + (radius) * Math.cos(2* Math.PI * ( j) / 4);
    var y_calc = ((canvas_length  - 50)/2) + (radius) * Math.sin(2*  Math.PI * (j ) / 4);



    const skill_circle = graph.selectAll("circle").data(data);



    skill_circle
        .enter()
        .append('circle')
        .attr('r',5 )
        .attr('cx', x_calc)
        .attr('cy', y_calc)
        .attr('fill',d => recency(recent_usage));

    }

});
