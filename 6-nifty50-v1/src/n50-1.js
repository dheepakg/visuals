// create svg element:
var svg = d3.select(".canvas").append("svg").attr("width", 2000).attr("height", 6000)


width = { 'square': 20, 'rect':10, 'long': 50}



function day_text(day){
    if (day%100 == 0){
        return 'Day ' + day;
    }
    else{
        return '  ' +day
    }

}
// d3.json("./data/visual-sitemap.json").then((data) => {

years = {}
year_and_days = {2020: 252, 2021:248, 2022:248, 2023:248}
number_of_days_in_year = {}
d3.csv('./data/nifty_50_2020_2023.csv').then((data) => {
    console.log(data.length)
    // To extract the unique years
    for (let row =0; row <data.length; row ++){
        row_data = data[row]
        // console.log(row_data['year'])

        years[row_data['year'] - 2019] = row_data['year']
    }
    //todo: Fetch Max num of days:
    console.log(year_and_days)


    for( const key in year_and_days){
        // Iterate through days
        for(let day =1; day<= year_and_days[key]; day++)
        {
            // console.log(data[day])
            svg.append('text')
            .attr('x', 80 + ((key-2019) * 82))
            .attr('y', 20)
            .text( key)
            .attr('font-size',15)
            .attr('font-family', 'monospace')



        svg.append('text')
            .attr('x', 10)
            .attr('y', 60 + (day * 22)+ 15)
            .text(day_text(day))
            .attr('font-size',15)
            // .attr("text-anchor", "end")
            .attr('font-family', 'monospace')

        svg.append('rect')
            .attr('x', 80 + ((key-2019)  * 82))
            .attr('y', 60 + (day * 22) )
            .attr('width', width['long'])
            .attr('height', 20)
            .style("fill", function(d){console.log("sds",data[day]['daily_change_perc']); return data[day]['daily_change_perc'] <= 0 ? 'red' : 'green';  })
            .attr('stroke', '#704214')
            .attr('stroke-width', 0.2)
            .attr('fill', 'silver')
            .attr('opacity', 0.8)

        }
    }








})
/*
for (let year = 0; year <=3; year++ ) {


    for (let day = 1; day <= 250 ; day++) {

        svg.append('text')
            .attr('x', 80 + (year * 82))
            .attr('y', 20)
            .text('yea' + year)
            .attr('font-size',15)
            .attr('font-family', 'monospace')



        svg.append('text')
            .attr('x', 10)
            .attr('y', 60 + (day * 22)+ 15)
            .text(day_text(day))
            .attr('font-size',15)
            // .attr("text-anchor", "end")
            .attr('font-family', 'monospace')

        svg.append('rect')
            .attr('x', 80 + (year  * 82))
            .attr('y', 60 + (day * 22) )
            .attr('width', width['long'])
            .attr('height', 20)
            // .attr('rx',1)
            .attr('stroke', '#704214')
            .attr('stroke-width', 0.2)
            .attr('fill', 'silver')
            .attr('opacity', 0.8)


    }
} */
