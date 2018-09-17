var options = {
  valueNames: [ 'common_name', 'scientific_name' ],
  searchClass: 'fuzzy-search',
  // Since there are no elements in the list, this will be used as template.
  item: '<li><p class="common_name"></p><p><i class="scientific_name"></i></p></li>',
  fuzzySearch: {
    searchClass: "fuzzy-search",
    location: 0,
    distance: 100,
    threshold: 0.4,
    multiSearch: true
  }
};

var values = [
  {
    common_name: '',
    scientific_name: ''
  },
];
