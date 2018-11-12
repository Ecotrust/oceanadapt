(function() {
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
        </div>
    `;
    document.getElementById('page-content').innerHTML = `
      <div class="container">
        <div class="row justify-content-center">
          <div class="chart-title">
            <h2>Changes in Latitude</h2>
          </div>
          <div class="chart-wrap">
            <div class="graph_1 graph" id="graph_1"></div>
          </div>
        </div>

        <div class="row justify-content-center mb-4">
          <div class="chart-title">
            <h2 id="chart-title-two">Changes in Depth</h2>
          </div>
          <div class="chart-wrap">
            <div class="graph_2 graph" id="graph_2"></div>
          </div>
        </div>
      </div>
    `;

    var nationalSelection = axios.create();
    var nationalParams = new URLSearchParams();
    nationalParams.append('page-action', 1);
    nationalParams.append('graph_type', 1);
    nationalSelection.post('/national_data', nationalParams)
      .then(function(response) {
        load_graph(1, response.data)
      })
      .then(function() {
        nationalParams.set('graph_type', 2);
        nationalSelection.post('/regional_data', nationalParams)
          .then(function(res) {
            load_graph(2, res.data);
            console.log(res);
          })
          .catch(function(error) {
            console.log(error);
          })
      .catch(function(error) {
        console.log(error);
      })
    })

    document.getElementById('page-content').classList.add('show');
})();
