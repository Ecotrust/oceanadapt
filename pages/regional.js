(function() {
  var regionID = document.getElementById('regionID').value;
  document.getElementById('map-overlay').classList.add('regional');
  document.getElementById('map-overlay').innerHTML = `
    <div class="container">
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
        <div class="col-7">
          <div class="title" id="regionName">${regionName.value}</div>
          <hr />
          <div>
            <p>Enter a species above or check “Average Across All Species” to begin.</p>
          </div>
        </div>
        <div class="col"></div>
        <div class="col-4">
          <button type="button" class="btn-download btn-download-border" data-toggle="modal" data-target="#dataDownloadModal" data-tobedownloaded="${regionID}">
            <img src="./img/i_download.svg" /> Download Data
          </button>
        </div>
      </div>

      <div class="row slider">
        <div id="slider-div">
          <div id="slider-area">
            <div id="slider-row">
              <div id="slider-start-year"></div>
              <div id="slider-cell">
                <div id="slider"></div>
              </div>
              <div id="slider-end-year"></div>
            </div>
          </div>
          <div style="text-align:center;margin:1em 0;">
            <span style="margin-right:1em;">
              <button id="pause-button" type="button" class="greybutton"><i class="fa fa-pause"></i> Pause</button>
            </span>
            <span style="margin-left:1em;">
              <button id="play-button" type="button" class="positive"><i class="fa fa-play"></i> Play</button>
            </span>
          </div>
          <div style="left: 0; top: 1em; position: absolute;dispaly:none;" id="slider-value"></div>
          <img id="species-picture" src="" style="display:block;max-width:100%;margin:1em auto 0;" />
        </div>
      </div>
    </div>
  `;

  document.getElementById('page-content').innerHTML = `
    <div class="container-fluid bg-light-grey p-4">
      <div class="row justify-content-center">
        <div class="col-4 text-center">
          <button type="button" class="btn-download btn-download-border" data-toggle="modal" data-target="#dataDownloadModal" data-tobedownloaded="${regionID}">
            <img src="./img/i_download.svg" /> Download Data
          </button>
        </div>
      </div>
    </div>

    <div class="container">
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
          <h2>Changes in Latitude</h2>
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
				$('#species-picture').prop({src: graph_helper.picture_files[ ui.value ] })
			},
			start: function( event, ui ) {
				if( graph_helper.rotate_picture != null ) {
					$('#pause-button').trigger('click');
				}
			}
		});
})();
