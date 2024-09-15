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

d3.csv('../src/nifty_50_2020_2023.csv', d => {
    return {
        year: d.year,
        hdate: d.HistoricalDate,
        dailyChange: d.daily_change,
        daily_change_perc: d.daily_change_perc
    }
})

for (let year = 0; year <=3; year++ ) {

    console.log(year)
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
}
