document.getElementById('page-overlay').classList.add('national');
document.getElementById('page-overlay').innerHTML = `
    <div class="container">

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
          <button type="button" class="btn-download btn-download-border" data-toggle="modal" data-target="#dataDownloadModal" data-tobedownloaded="national">
            <img src="./img/i_download.svg" /> Download Data
          </button>
        </div>
      </div>

      <div class="row">
        <div class="chart-wrap">
            <h2 class="chart-title">Changes in Latitude</h2>
            <div id="graph-div_1"></div>
            <div id="graph-div_2"></div>
        </div>
      </div>

    </div>
`;

<!-- TODO: drop in graph-div scripts -->
