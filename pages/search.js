(function() {
  document.getElementById('search-wrap').innerHTML = `
    <div class="container">
      <div class="row align-items-end">
        <div class="col-md-5">
          <div class="species-search" id="species-list">
            <h2>Find Species</h2>
            <div class="form-inline my-2 my-lg-0">
              <input id="species-search-input" class="form-control mr-sm-2 fuzzy-search" type="search" placeholder="Search" aria-label="Search" data-container="body" data-toggle="popover" data-trigger="focus" data-placement="top" data-content="Begin typing species name (scientific or common) to filter, then select a species.">
              <!-- <button class="btn my-2 my-sm-0 search" data-search="name"><img src="/img/search_white.svg" /></button> -->
            </div>
            <div class="list"></div>
          </div>
        </div>
        <!-- <button id="nav-projections" class="col btn-download btn-download-border d-none" type="button" onclick="chooseFuture()">View Projections</button> -->
        <div class="col-md-4">
          <button class="species-all btn btn-link" data-speciesId="-1" id="show-all" data-toggle="button" aria-pressed="false" autocomplete="off">Average Across All Species</button>
        </div>
        <div class="col-md-3 text-right">
          <button id="species-list-alpha-toggle" class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#search-options" aria-expanded="false" aria-controls="search-options">Expand Options <span class="chevron"></span></button>
        </div>
      </div>
      <div class="row align-items-end">
        <div class="col">
          <div class="collapse" id="search-options">
            <div class="card" id="species-list-alpha">
              <div class="card-body">
                <div class="list-group">
                  <div class="list-group-item list-group-item-action">
                    <div class="row">
                      <div class="sort col-6" data-sort="common_name">Common name</div>
                      <div class="sort col-6" data-sort="scientific_name">Scientific name</div>
                    </div>
                  </div>
                  <div class="list"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div id="selected-species" class="col"></div>
      </div>
    </div>
  `;

  $('#species-search-input').popover();
})();
