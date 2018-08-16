// import * as northAmerica from '../js/north_america_2.json';
import 'd3';

export function render() {

  var svg = d3.select("#map").append("svg")
  .attr("width", 960)
  .attr("height", 960);

  d3.json('../js/north_america_2.json', function(error, northAmerica) {
    if (error) return console.error(error);

    svg.append("path")
        .datum(topojson.feature(
            northAmerica,
            northAmerica.objects.north_america_2
          ))
          .attr("d",
            d3.geoPath()
              .projection(d3.geoAzimuthalEqualArea())
          );
    });

  // var geoPathGenerator = d3.geoPath();
  //   // .projection('azimuthalEqualArea');
  //
  // svg.append('g').selectAll("path")
  //   .data(geoJsonFeatureCollection.features)
  //   .style("fill", "steelblue")
  //   .style("stroke", "steelblue")
  //   .style("stroke-width", 1)
  //   .enter().append("path")
  //   .attr("d", geoPathGenerator)
  //   .style("fill", "steelblue")
  //   .style("stroke", "steelblue")
  //   .style("stroke-width", 1)

};
