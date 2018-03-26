//define colours
var color_na=d3.rgb("#D3D3D3");
var color_green=d3.rgb("#228B22");
var color_red=d3.rgb("#FF6347");
var color_brown=d3.rgb("#A0522D");
var color_blue=d3.rgb("#0000FF");

var heading="FreeBasic Status in ";
var initial_year="2014";

//slider with range from 2014 to 2018. It changes value initial year
//this is just a html slider
d3.select("body").insert("p", ":first-child").append("input")
.attr("type", "range")
.attr("min", "2014")
.attr("max", "2018")
.attr("value", initial_year)
.attr("id", "year");


// the heading with the year from slider
d3.select("body").insert("h2", ":first-child").text(heading + initial_year);

// map
var width=1000, height=500;

var svg_map= d3.select("body").insert("svg")
.attr("id","map")
.attr("height", height)
.attr("width",width);

// d3 library world map path
var path= d3.geoPath(d3.geoRobinson());

d3.json("data/freebasic.json",function(error,d){
    if(error)throw error;

    let data_all = d['FreeBasic'];
        let data = data_all[initial_year];
        let color = matchColor(data);

    d3.json("data/world.json", function (error, worldmap) {
        if (error) throw error;

        // init map
        svg_map.append("g")
            .attr("id", "countries")
            .selectAll("path")
            .data(topojson.feature(worldmap, worldmap.objects.world).features)
            .enter().append("path")
            .attr("d", path)
            .attr("id", function (d) {
                return d.id;
            })
        
            .call(fillMap, color, data)
            .append("title")
            .call(setPathTitle, data);

    }); 

    // update the map if slider is used
    d3.select("#year").on("input", function () {
        let upd_color = matchColor(data_all[this.value]);
        updateMap(upd_color, data_all[this.value]);
    });
}); 