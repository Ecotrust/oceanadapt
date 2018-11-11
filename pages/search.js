(function() {
  document.getElementById('search-wrap').innerHTML = `
    <div class="container">
      <div class="row align-items-end">
        <div class="col">
          <div class="species-search" id="species-list">
            <h2>Find Species</h2>
            <div class="form-inline my-2 my-lg-0">
              <input id="species-search-input" class="form-control mr-sm-2 fuzzy-search" type="search" placeholder="Search" aria-label="Search">
              <button class="btn my-2 my-sm-0 search" data-search="name"><img src="/img/search_white.svg" /></button>
            </div>
            <div class="list dropdown"></div>
          </div>
        </div>

        <div class="col">
          <div class="species-all">
            <button class="btn btn-link" data-speciesId="-1" id="show-all">Average Across All Species</button>
          </div>
        </div>
    </div>
  `;
})();
