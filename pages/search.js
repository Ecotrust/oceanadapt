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
        <button id="nav-projections" class="col btn-download btn-download-border d-none" type="button" onclick="chooseFuture()">View Projections</button>
        <button class="col species-all btn btn-link" data-speciesId="-1" id="show-all">Average Across All Species</button>
        <button id="species-list-alpha-toggle" class="col btn btn-link d-none" type="button" data-toggle="collapse" data-target="#search-options" aria-expanded="false" aria-controls="search-options">Species List</button>
      </div>
      <div class="row align-items-end">
        <div id="selected-species" class="col"></div>
        <div class="col">
          <div class="collapse" id="search-options">
            <div class="card" id="species-list-alpha">
              <div class="card-body">
                <div class="list"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
})();
