document.getElementById('map-overlay').classList.add('regional');
document.getElementById('map-overlay').innerHTML = `
  <div class="container">
    <div class="row">
      <div class="species-search" id="species-list">
        <h2>Find Species</h2>
        <div class="form-inline">
          <input class="form-control mr-sm-2 fuzzy-search" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0 search" data-search="name">Search</button>
        </div>
        <ul class="list"></ul>
      </div>
      <div class="species-all">
        <button>Average Across All Species</button>
      </div>

      <button class="btn" type="button" data-toggle="collapse" data-target="#search-options" aria-expanded="false" aria-controls="search-options">Expand Options</button>
    </div>

    <div class="row">
      <div class="collapse" id="search-options">
        <h2><img src="./img/i_filter_green.svg" /> Filter By</h2>
      </div>
    </div>

    <div class="row">
      <a href="/" class="nav-back">
        <div class="exit">
          <img src="./img/i_north_america.svg" />
        </div>

        <div class="exit">
          <img src="./img/i_arrow-left.svg" class="icon_block mb-2" />
          <span>Regional Selections</span>
        </div>
      </a>
    </div>

    <div class="row">
      <div class="col-3">
        <div class="title">National Charts</div>
      </div>
      <div class="col"></div>
      <div class="col-3">
        <button type="button" class="btn-download btn-download-border" data-toggle="modal" data-target="#dataDownloadModal">
          <img src="./img/i_download.svg" /> Download Data
        </button>
      </div>
    </div>

    <div class="row">
      <div class="chart-wrap">
        <div class="chart-title">
          <h2>Changes in Latitude</h2>
        </div>
      </div>
    </div>

  </div>
`;

var userList = new List('species-list', options, values);


// load_graph(1);
// load_graph(2);
