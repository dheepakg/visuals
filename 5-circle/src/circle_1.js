// create svg element:
var svg = d3.select(".canvas").append("svg").attr("width", 600).attr("height", 600)

center = {'x1': 300, 'y1':300}
radius  = 200
// offset = 50
// no_of_lines = 60
marker_lines = 12
opacity = 0.05

// Marker circle - holds 12 lines in the watchface
svg.append('circle')
    .attr('cx', center.x1)
    .attr('cy', center.y1)
    .attr('r', radius * 1.15)
    .attr('stroke', 'black')
    .attr('fill', 'blue')
    .attr('opacity', opacity)


// Creates 12 lines on watch face

for (let i = 0; i <= 60 ; i++) {

        var x_calc = center.x1 + (radius * 1.15) * Math.cos(2* Math.PI * ( i) / 60);
        var y_calc = center.x1 + (radius * 1.15) * Math.sin(2*  Math.PI * ( i) / 60);

        // Marker line along radius
        if (i%5 == 0 ) {
            svg.append('line')
                .attr('x1', center.x1)
                .attr('y1', center.y1)
                .attr('x2', x_calc)
                .attr('y2', y_calc )
                .attr('stroke', 'black')
                .attr('stroke-width',3)
                .attr("class", "line_marker")
                .attr("opacity", 0.2)
            }
    }

// Bigger circle
svg.append('circle')
    .attr('cx', center.x1)
    .attr('cy', center.y1)
    .attr('r', radius)
    .attr('fill', '#f2f4ff');

// Centre point
svg.append('circle')
    .attr('cx', center.x1)
    .attr('cy', center.y1)
    .attr('r', radius/100)
    .attr('stroke', 'black')
    .attr('fill', 'blue')

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var date = new Date();




async function arm_in_the_clockface(arm_is_for,sleep_timer, time_uom, arm_color, arm_length=1 ) {
    let offset = 0;
    for (let i = 0; i<=time_uom; i++ ){
        var date = new Date();
        if (arm_is_for == 'hours')      { time_unit = date.getHours();   mins = date.getMinutes();    offset = 3;     }
        else if (arm_is_for == 'mins')  { time_unit = date.getMinutes();    offset = 15;    }
        else if (arm_is_for == 'secs')  { time_unit = date.getSeconds();    offset = 15;    }

        if (arm_is_for == 'hours')
        {
            if (mins < 15 ){  mins_offset = 0.15;  }
            else if (mins < 30 ){  mins_offset = 0.25; }
            else if (mins < 45 ){  mins_offset = 0.35; }
            else if (mins > 45 ){  mins_offset = 0.5; }
        }
        else  { mins_offset = 0; }


        angle_in_radians = ( time_unit - offset  ) / time_uom;

        var x2_calc = center.x1 + (radius * arm_length) * Math.cos(2* Math.PI * (angle_in_radians + 0 )+ mins_offset );
        var y2_calc = center.x1 + (radius * arm_length) * Math.sin(2* Math.PI * (angle_in_radians + 0 )+ mins_offset );

        d3.select("." + arm_is_for + "_arm1").remove();
        d3.select("." + "time_display1").remove();

        svg.append('text')
            .attr('x', 275)
            .attr('y', 120)
            .text(function(d) {
                    var d = new Date();
                    return String(d.getHours()).padStart(2,'0')   + ':'
                        +  String(d.getMinutes()).padStart(2,'0') + ':'
                        +  String(d.getSeconds()).padStart(2,'0');
                    })
            .attr("class", "time_display1")
            .attr("fill", '#DA9100');

        svg.append('line')
            .attr('x1', center.x1)
            .attr('y1', center.y1)
            .attr('x2', x2_calc )
            .attr('y2', y2_calc )
            .attr('stroke', arm_color)
            .attr('stroke-width',3)
            .attr("class", arm_is_for + "_arm1")
            .attr('opacity', 0.8)

        await sleep( sleep_timer);
    }

}

arm_in_the_clockface(arm_is_for='secs', sleep_timer=1000, time_uom=60, arm_color = 'red', arm_length = 1.05)
arm_in_the_clockface(arm_is_for='mins', sleep_timer=2000, time_uom=60, arm_color = 'brown')
arm_in_the_clockface(arm_is_for='hours',sleep_timer=1000, time_uom=12, arm_color = 'black', arm_length=0.8)
