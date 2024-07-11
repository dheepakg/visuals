// create svg element:
var svg = d3.select(".canvas").append("svg").attr("width", 600).attr("height", 600)

center = {'x1': 300, 'y1':300}
radius  = 200
offset = 50
no_of_lines = 12

// Bigger circle
svg.append('circle')
    .attr('cx', center.x1)
    .attr('cy', center.y1)
    .attr('r', radius)
    .attr('stroke', 'blue')
    .attr('fill', '#eadbcb');

// Centre point
svg.append('circle')
    .attr('cx', center.x1)
    .attr('cy', center.y1)
    .attr('r', radius/100)
    .attr('stroke', 'black')
    .attr('fill', 'blue')

    // Vertical line
svg.append('line')
    .attr('x1', center.x1)
    .attr('y1', center.x1 + center.y1 - offset)
    .attr('x2', center.x1 )
    .attr('y2', center.x1 - center.y1 + offset )
    .attr('stroke', 'grey')

    // Horizontal line
svg.append('line')
    .attr('x1', center.x1 + center.y1 - offset)
    .attr('y1', center.y1)
    .attr('x2', center.x1 - center.y1 + offset )
    .attr('y2', center.y1 )
    .attr('stroke', 'grey')





function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function x_and_y_coords(items){
var pos = {};
    for(var i = 0; i < items; i++) {
    var x = center.x1 + radius * Math.cos(2 * Math.PI * i / items);
    var y = center.x1 + radius * Math.sin(2 * Math.PI * i / items);
    console.log('angle', 2*Math.PI * i/items)
    pos[i] = [x,y]

    }
    return pos

}

list_of_coords = x_and_y_coords(no_of_lines)


async function demo() {
    for (let i = 0; i <Object.keys(list_of_coords).length; i++) {
        console.log(`Waiting ${i} seconds...`);
        await sleep(1000);
        console.log('Done', list_of_coords[i]);

        d3.select(".line").remove();

            // Rotating radius
        svg.append('line')
            .attr('x1', center.x1)
            .attr('y1', center.y1)
            .attr('x2', list_of_coords[i][0])
            .attr('y2', list_of_coords[i][1] )
            .attr('stroke', 'red')
            .attr('stroke-width',2)
            .attr("class", "line")

    }

    }

// while (true){
demo()
// }
