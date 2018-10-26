(function() {
  // create call for species
  var regionID = document.getElementById('regionID').value;
  var speciesData = axios.create();
  var params = new URLSearchParams();
  params.append('page-action', 2);
  params.append('graph_type', 1);
  params.append('regionID', regionID);
  params.append('nameType', 2);
  params.append('speciesID', -1);

  // list.js options
  var options = {
    valueNames: [ 'common_name', 'scientific_name', { data:['species_id'] } ],
    searchClass: 'fuzzy-search',
    // Since there are no elements in the list, this will be used as template.
    item: '<a class="species_id species-selection dropdown-item" data-id="" href="#"><span class="scientific_name"></span> (<em><span class="common_name"></span></em>)</a>',
    fuzzySearch: {
      searchClass: "fuzzy-search",
      location: 0,
      distance: 100,
      threshold: 0.4,
      multiSearch: true
    }
  };

  // list.js options
  // TODO: alphabetical listing of species
  // var optionsAlpha = {
  //   valueNames: [ 'common_name', 'scientific_name', { name: 'species_id', attr: 'data-id' } ],
  //   item: '<a class="species_id species-selection" data-id="" href="#"><span class="common_name"></span><span class="scientific_name"></span></a>',
  // }

  // list.js values
  var values = [];

  speciesData.post('/regional_data', params)
    .then(function(response) {
      for (let species of response.data.values.speciesIDs) {
        console.log(species);
        values.push({
          common_name: species.speciesCommonName,
          scientific_name: species.speciesName,
          species_id: species.speciesID,
        })
      }
    })
    .then(function() {
      // create alphabetical list
      // TODO: alphabetical listing of species
      // var speciesListAlpha = new List('species-listing-alphabetical-list', optionsAlpha, values);

      // create species type ahead search
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
      // Listen for species search results item selection
      $('.species-selection').on('click', function(event) {
        event.preventDefault();
        console.log(event.target);
        return chooseSpecies(event.target.parentNode.dataset.species_id);
      })
    })
    .catch(function(error) {
      console.log(error);
    });
})();
