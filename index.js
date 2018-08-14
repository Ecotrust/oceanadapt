import $ from 'jQuery';
import colors from 'Datamaps';

$(document).ready(function() {
  var map = new Datamaps({
    element: document.getElementById('map'),
    scope: 'world',
    setProjection: function(element) {
      var projection = d3.geo.azimuthalEqualArea()
        .rotate([98,-45])
        .scale(700)
        .clipAngle(180 - 1e-4)
        .clipExtent([[0, 0], [element.offsetWidth, element.offsetHeight]])
        .precision(.1)
        .translate([element.offsetWidth / 1.8, element.offsetHeight / 2]);
      var path = d3.geo.path()
        .projection(projection);
      return {path: path, projection: projection};
    },
    fills: {
      defaultFill: 'transparent',
      red: '#CC0033',
      white: '#fff',
      black: '#000',
    },
    data: {
      USA: { fillKey: 'black' },
      CAN: { fillKey: 'black' },
      MEX: { fillKey: 'black' },
      GRL: { fillKey: 'black' }
    },
    geographyConfig: {
      borderWidth: 0,
    },
    bubblesConfig: {
      borderWidth: 0,
      highlightFillColor: '#fff',
      highlightBorderWidth: 0,
    },
    responsive: true,
  });
  map.bubbles([
    {
      name: 'Northeast',
      radius: 30,
      fillKey: 'red',
      latitude: 40.15,
      longitude: -80.01
    }
  ],{
    popupTemplate: function(geo, data) {
      return '<div class="hoverinfo">' + data.name;
    }
  });
});
