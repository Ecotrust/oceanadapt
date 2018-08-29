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
        'page': '/pages/pacific-coast.js',
        'regional_code': 'WC_ANN',
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
        'page': '/pages/gulf-of-mexico.js',
        'regional_code': 'GOM',
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
        'regional_code': 'GOA',
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
        'regional_code': 'SEUS_FALL',
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
        'regional_code': 'AI',
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
        'regional_code': 'NEUS_F',
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
        'regional_code': 'EBS',
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
        'regional_code': '',
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
        import(e.features[0].properties.page);
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
