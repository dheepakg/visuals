const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", 1200)
  .attr("height", 900);


y_coord = 300
x_coord = 20
hor_line_len = 1100

const graph = svg.append("g").attr("width", 900).attr("height", 600);

// Hor line
graph.append("line")
    .attr('x1',x_coord)
    .attr('y1',y_coord)
    .attr('x2',x_coord + hor_line_len + 10)
    .attr('y2', y_coord)
    .attr('stroke','grey')
    .attr('stroke-width',1);
// Ver line - left
graph.append("line")
    .attr('x1',x_coord+10)
    .attr('y1',y_coord+250 )
    .attr('x2',x_coord+10)
    .attr('y2', y_coord-250 )
    .attr('stroke','grey')
    .attr('stroke-width',1);
// Ver line - right
graph.append("line")
    .attr('x1',x_coord + hor_line_len)
    .attr('y1',y_coord+250)
    .attr('x2',x_coord + hor_line_len)
    .attr('y2', y_coord-250)
    .attr('stroke','grey')
    .attr('stroke-width',1);

// Line marking percenatge rise/fall
graph.append("line")
    .attr('x1',x_coord)
    .attr('y1',y_coord + 100)
    .attr('x2',x_coord + hor_line_len + 10)
    .attr('y2', y_coord + 100)
    .attr('stroke','blue')
    .attr('stroke-width',1)
    .style("stroke-dasharray", ("3, 3"));;

graph.append("line")
    .attr('x1',x_coord)
    .attr('y1',y_coord + 200)
    .attr('x2',x_coord + hor_line_len + 10)
    .attr('y2', y_coord + 200)
    .attr('stroke','blue')
    .attr('stroke-width',1)
    .style("stroke-dasharray", ("4, 4"));;

graph.append("line")
    .attr('x1',x_coord)
    .attr('y1',y_coord -  100)
    .attr('x2',x_coord + hor_line_len + 10)
    .attr('y2', y_coord - 100)
    .attr('stroke','blue')
    .attr('stroke-width',1)
    .style("stroke-dasharray", ("3, 3"));

graph.append("line")
    .attr('x1',x_coord)
    .attr('y1',y_coord - 200)
    .attr('x2',x_coord + hor_line_len + 10)
    .attr('y2', y_coord - 200)
    .attr('stroke','blue')
    .attr('stroke-width',1)
    .style("stroke-dasharray", ("4, 4"));;


d3.csv('../data/nifty50_2022.csv',

    function(d){
    return { date : d3.timeParse("%Y-%m-%d")(d.Date),
            ytm_perc : d.YTM_perc,
            YearMonth : d.YearMonth }
     },


).then(


    function(data) {


    }
)

