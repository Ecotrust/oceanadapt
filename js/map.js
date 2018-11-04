mapboxgl.accessToken = 'pk.eyJ1Ijoib2NlYW5hZGFwdCIsImEiOiJjamxjanBrczAwMTljM3BwaHM4cDhlY2lvIn0.U2sLt57H7YJ1SztR6yjcjQ';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/oceanadapt/cjlckrf4q4l392qp9dhyltapc',
    center: [-155.536,46.737],
    zoom: 2
});

const pins = {
    'type': 'FeatureCollection',
    'features': [
    {
      'type': 'Feature',
      'properties': {
        'regional_id': 10,
        'regional_code': 'WC_ANN',
        'ocean_region': 'pacific-region',
        'name': 'Pacific Coast'
      },
      'geometry': {
        'coordinates': [
          -125.64932,
          37.096896
        ],
        'type': 'Point'
      },
      'id': '1f39695e9dd493f222db66cf565fbcaf'
    },
    {
      'type': 'Feature',
      'properties': {
        'regional_id': 4,
        'regional_code': 'GOM',
        'ocean_region': 'atlantic-region',
        'name': 'Gulf of Mexico'
      },
      'geometry': {
        'coordinates': [
          -90.006676,
          26.577474
        ],
        'type': 'Point'
      },
      'id': '56f331c4940b98e563af074ae8442802'
    },
    {
      'type': 'Feature',
      'properties': {
        'regional_id': 3,
        'regional_code': 'GOA',
        'ocean_region': 'pacific-region',
        'name': 'Gulf of Alaska'
      },
      'geometry': {
        'coordinates': [
          -143.899682,
          57.927507
        ],
        'type': 'Point'
      },
      'id': '588bb663e5ce09760100f099a406510e'
    },
    {
      'type': 'Feature',
      'properties': {
        'regional_id': 7,
        'regional_code': 'GOA',
        'ocean_region': 'atlantic-region',
        'name': 'South Atlantic'
      },
      'geometry': {
        'coordinates': [
          -79.046351,
          29.980448
        ],
        'type': 'Point'
      },
      'id': '69fe48a350c7a20342b3131c9cffa90c'
    },
    {
      'type': 'Feature',
      'properties': {
        'regional_id': 1,
        'regional_code': 'AI',
        'ocean_region': 'pacific-region',
        'name': 'Aleutian Islands'
      },
      'geometry': {
        'coordinates': [
          -170.259532,
          52.741361
        ],
        'type': 'Point'
      },
      'id': 'd789e35efe1a2bacb09ff769abf6c216'
    },
    {
      'type': 'Feature',
      'properties': {
        'regional_id': 5,
        'regional_code': 'NEUS_F',
        'ocean_region': 'atlantic-region',
        'name': 'North Atlantic'
      },
      'geometry': {
        'coordinates': [
          -72.750731,
          38.312032
        ],
        'type': 'Point'
      },
      'id': 'd7e243c19441d160efd489604e58e557'
    },
    {
      'type': 'Feature',
      'properties': {
        'regional_id': 2,
        'regional_code': 'EBS',
        'ocean_region': 'pacific-region',
        'name': 'Eastern Bering Sea'
      },
      'geometry': {
        'coordinates': [
          -174.565643,
          59.036676
        ],
        'type': 'Point'
      },
      'id': 'ff2e200b6cace12c51e68fcbfaa06729'
    },
    {
      'type': 'Feature',
      'properties': {
        'page': '/pages/national.js',
        'regional_code': 'National',
        'ocean_region': '',
        'name': 'National'
      },
      'geometry': {
        'coordinates': [
          -101.00,
          42.00
        ],
        'type': 'Point'
      },
      'id': 'ff2e200b6cace12c51e68fcbfaa06729'
    }
  ]
};

map.on('load', function () {
    // Add a symbol layer.
    map.addLayer({
        'id': 'markers',
        'type': 'symbol',
        'source': {
            'type': 'geojson',
            'data': pins
        },
        'layout': {
          'icon-image': 'pin',
          'icon-allow-overlap': true,
      }
    });

    // Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
    map.on('click', 'markers', function (e) {
        map.flyTo({
          center: e.features[0].geometry.coordinates,
          zoom: 5
        });
        if (e.features[0].properties.regional_code === "National") {
            loadScript('/pages/national.js');
        } else {
            // import the page for each point through a js file that replaces html content
            // the page object should be a url
            // that url should be a js file
            // the js file will run a script to add page content
            document.getElementById('map-overlay').classList.add('opacity-overlay');
            document.getElementById('search-wrap').classList.add('show');
            document.getElementById('regionID').value = e.features[0].properties.regional_id;
            document.getElementById('regionName').value = e.features[0].properties.name;
            document.getElementById('oceanRegion').value = e.features[0].properties.ocean_region;
            // loadScript(e.features[0].properties.page)
            loadScript('/pages/regional.js')
              .then(function(script) {
                  chooseSpecies(-1);
              });
            loadScript('/js/search.js')
              .then(function(script) {
                 return;
              });
          }

    });

    // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
    map.on('mouseenter', 'markers', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'markers', function () {
        map.getCanvas().style.cursor = '';
    });

    map.scrollZoom.disable();

});
