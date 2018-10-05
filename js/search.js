var options = {
  valueNames: [ 'common_name', 'scientific_name' ],
  searchClass: 'fuzzy-search',
  // Since there are no elements in the list, this will be used as template.
  item: '<li><span class="common_name"></span><span><i class="scientific_name"></i></span></li>',
  fuzzySearch: {
    searchClass: "fuzzy-search",
    location: 0,
    distance: 100,
    threshold: 0.4,
    multiSearch: true
  }
};

var speciesData = axios.create();
var params = new URLSearchParams();
params.append('page-action', 2);
params.append('graph_type', 1);
params.append('regionID', 5);
params.append('nameType', 2);
params.append('speciesID', -1);

var values = [];

speciesData.post('http://oa.local/regional_data', params)
  .then(function(response) {
    for (let species of response.data.values.speciesIDs) {
      values.push({
        common_name: species.speciesCommonName,
        scientific_name: species.speciesName,
        species_id: species.speciesID,
      })
    }
  })
  .then(function() {
    var speciesList = new List('species-list', options, values);
    // Listen for search input
    document.getElementById('species-search-input').addEventListener('focus', function() {
      document.querySelector('.list').style.display = 'block';
      console.log('joj');
    });

    document.getElementById('species-search-input').addEventListener('blur', function() {
      document.querySelector('.list').style.display = 'none'
    });
  })
  .catch(function(error) {
    console.log(error);
  });
