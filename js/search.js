
var options = {
  valueNames: [ 'name', 'born' ],
  searchClass: 'fuzzy-search',
  // Since there are no elements in the list, this will be used as template.
  item: '<li><h3 class="name"></h3><p class="born"></p></li>',
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
    name: 'Jonny Strömberg',
    born: 1986
  },
  {
    name: 'Jonas Arnklint',
    born: 1985
  },
  {
    name: 'Martina Elm',
    born: 1986
  }
];
