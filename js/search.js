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
    valueNames: [ 'common_name', 'scientific_name', { data:['species_id'] }, { data:['species_name'] }, { data:['data_common_name'] } ],
    searchClass: 'fuzzy-search',
    // Since there are no elements in the list, this will be used as template.
    item: '<a class="species_id species_name data_common_name species-selection dropdown-item" href="#"><span class="scientific_name"></span> (<em><span class="common_name"></span></em>)</a>',
    fuzzySearch: {
      searchClass: "fuzzy-search",
      location: 0,
      distance: 100,
      threshold: 0.4,
      multiSearch: true
    }
  };

  // list.js options
  var optionsAlpha = {
    valueNames: [ 'common_name', 'scientific_name', { data:['species_id'] }, { data:['species_name'] }, { data:['data_common_name'] } ],
    item: '<a class="species_id species_name data_common_name species-selection dropdown-item list-group-item list-group-item-action" href="#"><div class="row"><div class="col-6"><span class="common_name"></span></div><div class="col-6"><span class="scientific_name"></span></div></div></a>',
  };

  // list.js values
  var values = [];
  var valuesAlpha = [];

  speciesData.post('/regional_data', params)
    .then(function(response) {
      for (let species of response.data.values.speciesIDs) {
        values.push({
          common_name: species.speciesCommonName,
          data_common_name: species.speciesCommonName,
          scientific_name: species.speciesName,
          species_id: species.speciesID,
          species_name: species.speciesName,
        });
        valuesAlpha.push({
          common_name: species.speciesCommonName,
          data_common_name: species.speciesCommonName,
          scientific_name: species.speciesName,
          species_id: species.speciesID,
          species_name: species.speciesName,
        });
      }
    })
    .then(function() {

      $('.list').html('');

      // create alphabetical list
      var speciesListAlpha = new List('species-list-alpha', optionsAlpha, valuesAlpha);

      // create species type ahead search
      var speciesList = new List('species-list', options, values);

      // Listen for search input
      document.getElementById('species-search-input').addEventListener('focus', function() {
        document.querySelector('.list').style.display = 'block';
        window.setTimeout(function() {
          $('body').one('click', function(event) {
            document.querySelector('.list').style.display = 'none';
          });
        }, 2000);
      });
      document.getElementById('species-list').addEventListener('blur', function() {
        window.setTimeout(function() {
          document.querySelector('.list').style.display = 'none';
        }, 300);
      });

      // Listen for species search results item selection
      $('.species-selection').on('click', function(event) {
        event.preventDefault();
        document.querySelector('.list').style.display = 'none';
        return chooseSpecies(this.dataset.species_id, this.dataset.species_name, this.dataset.data_common_name);
      });

      $('#show-all').on('click', function() {
        if ($(this).hasClass('active')) {
          smoothScroll('#page-content');
        } else {
          chooseSpecies(-1);
          smoothScroll('#page-content');
        }
      });
    })
    .catch(function(error) {
      console.log(error);
    });
})();
