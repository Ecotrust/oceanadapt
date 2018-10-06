var options = {
  valueNames: [ 'common_name', 'scientific_name', { name: 'species_id', attr: 'data-id' } ],
  searchClass: 'fuzzy-search',
  // Since there are no elements in the list, this will be used as template.
  item: '<li><a class="species_id species-selection" data-id="" href="#"><span class="common_name"></span><span class="scientific_name"></span></a></li>',
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
    });
    document.getElementById('species-search-input').addEventListener('blur', function() {
      window.setTimeout(function() {
        document.querySelector('.list').style.display = 'none';
      }, 300);
    });
    $('.species-selection').on('click', function(event) {
      event.preventDefault();

      var selectedSpeciesID = event.target.parentNode.dataset.id;
      document.getElementById('regionID').val = selectedSpeciesID;

      var speciesSelection = axios.create();
      var speciesSelectionParams = new URLSearchParams();
      speciesSelectionParams.append('page-action', 1);
      speciesSelectionParams.append('graph_type', 1);
      speciesSelectionParams.append('regionID', 5);
      speciesSelectionParams.append('speciesID', selectedSpeciesID);
      speciesSelection.post('http://oa.local/regional_data', speciesSelectionParams)
        .then(function(response) {
          speciesSelectionParams.set('graph_type', 2);
          speciesSelection.post('http://oa.local/regional_data', speciesSelectionParams)
            .then(function(res) {
              console.log(res);
            })
        })
        .catch(function(error) {
          console.log(error);
        });
    })
  })
  .catch(function(error) {
    console.log(error);
  });
