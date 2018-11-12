(function() {
  var regionID = document.getElementById('regionID').value;
  document.getElementById('map-overlay').classList.add('regional');
  document.getElementById('map-overlay').innerHTML = `
    <div class="overlay-section">
      <div class="row">
        <div class="col">
          <div class="row">
            <a href="/" class="nav-back">
              <div class="exit">
                <img src="./img/i_north_america.svg" />
              </div>

              <div class="exit">
                <img src="./img/i_arrow-left.svg" class="icon_block mb-2" />
                <span>Back</span>
              </div>
            </a>
          </div>

          <div class="row">
            <div class="col">
              <div class="title" id="regionName">${regionName.value}</div>
              <hr />
              <div>
                <p>Enter a species above or check “Average Across All Species” to begin.</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  `;

  document.getElementById('page-content').innerHTML = `
    <div class="container-fluid bg-light-grey p-4">
      <div class="row justify-content-center">
        <div class="col-4 text-center">
          <button type="button" class="btn-download btn-download-border d-none" id="nav-projections" onclick="chooseFuture()">View Projections</button>
        </div>
        <div class="col-4 text-center">
          <button type="button" class="btn-download btn-download-border" data-toggle="modal" data-target="#dataDownloadModal" data-tobedownloaded="${regionID}">
            <img src="./img/i_download.svg" /> Download Data
          </button>
        </div>
      </div>
    </div>

    <div class="container">
      <div id="animation-wrap" class="row slider d-none justify-content-center">
        <div id="slider-div">
          <img id="species-picture" src="" />
          <img id="species-picture-rcp26" src="" />
          <img id="species-picture-rcp85" src="" />
          <div id="slider-area" class="p-2">
            <div id="slider-row">
              <div id="slider-start-year"></div>
              <div id="slider-cell">
                <div id="slider"></div>
              </div>
              <div id="slider-end-year"></div>
            </div>
          </div>
          <div id="slider-value"></div>
          <div class="text-center">
            <span>
              <button id="pause-button" type="button" class="greybutton btn btn-secondary">Pause</button>
            </span>
            <span>
              <button id="play-button" type="button" class="positive btn btn-success">Play</button>
            </span>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="chart-title">
          <h2>Changes in Latitude</h2>
        </div>
        <div class="chart-wrap">
          <div class="graph_1 graph" id="graph_1"></div>
        </div>
      </div>

      <div class="row">
        <div class="chart-title">
          <h2 id="chart-title-two">Changes in Depth</h2>
        </div>
        <div class="chart-wrap">
          <div class="graph_2 graph" id="graph_2"></div>
        </div>
      </div>
    </div>
  `;

		$( '#slider' ).slider({
			slide: function( event, ui ) {
				if( graph_helper.rotate_picture != null ) {
					$('#pause-button').trigger('click');
				}
				// $('#species-picture').prop({src: graph_helper.picture_files[ ui.value ] })
			},
			start: function( event, ui ) {
				if( graph_helper.rotate_picture != null ) {
					$('#pause-button').trigger('click');
				}
			}
		});
})();
