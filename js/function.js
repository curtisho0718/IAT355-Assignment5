// fill the map with assign color. If undefined, it's gray
function fillMap(selection, color, data){
    selection
    .attr("fill", function(d){return typeof data[d.id]=="undefined"?color_na:d3.rgb(color(data[d.id]));})
}

// set the title
function setPathTitle(selection, data){
    selection.text(function(d) { return "" + d.id + ", " +
    (typeof data[d.id] === 'undefined' ? 'N/A' : data[d.id]); });
}

function updateMap(color, data) {
    // fill paths
    d3.selectAll("svg#map path").transition()
      .delay(100)
      .call(fillMap, color, data);
  
    // update path titles
    d3.selectAll("svg#map path title")
      .call(setPathTitle, data);
  
    // update headline
    d3.select("h2").text(heading + d3.select("#year").node().value);
  }

  function matchColor(data) {
      // get values and sort
    let data_values = Object.values(data).sort( function(a, b){ return a-b; });
    //scale the data to 0,3 as its domain
    //set the range to desired colour. 0=red, 1=green and so on    
    let scale = d3.scaleQuantize()
                .domain([0,3])
                .range([
                  color_red,
                  color_green,
                  color_blue,
                  color_brown
                ]);
    return scale;
  }