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
              <div class="title" id="regionName">Future Changes</div>
              <hr />
              <div>
                <p>Projected future changes in the distribution of marine animals in the U.S. by region (from <a href="http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0196127" target="_blank">Morley et al. 2018</a>)</p>
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
          <button type="button" class="btn-download btn-download-border" data-toggle="modal" data-target="#dataDownloadModal" data-tobedownloaded="${regionID}">
            <img src="./img/i_download.svg" /> Download Data
          </button>
        </div>
      </div>
    </div>

    <div class="container">
      <div id="animation-wrap" class="row slider d-none">
        <div id="slider-div">
          <img id="species-picture" src="" />
          <div id="slider-area" class="p-2">
            <div id="slider-row">
              <div id="slider-start-year"></div>
              <div id="slider-cell">
                <div id="slider"></div>
              </div>
              <div id="slider-end-year"></div>
            </div>
          </div>
          <div style="text-align:center;margin 1em auto;">
            <div style="max-width:47%;margin-right:1em;display: inline-block;">
              <h3> RCP 26 </h3>
              <img id="species-picture-rcp26" src="" style="max-width: 100%;" />
            </div>
            <div style="max-width:47%;margin-left:1em;display: inline-block;">
              <h3> RCP 85 </h3>
              <img id="species-picture-rcp85" src="" style="max-width: 100%;" />
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
          <h2>Changes in Latitude</h2>
        </div>
        <div class="chart-wrap">
          <div class="graph_2 graph" id="graph_2"></div>
        </div>
      </div>
    </div>
  `;

  function iframe_callback_data(my_iframe, my_loader) {
    if( my_iframe.contents().text() == '' ) {
      return true;
    }

    var data = JSON.parse( my_iframe.contents().text() );
    my_loader.css({visibility:'hidden'});
    //console.log(data);
  }

  $(function() {
    $( '#slider-both' ).slider({
      slide: function( event, ui ) {
        ////console.log('sliding');

        if( graph_helper.rotate_picture_both != null ) {
          $('#pause-button-both').trigger('click');
        }

        $('#species-picture-rcp26').prop({src: graph_helper.picture_files.rcp26[ ui.value ] });
        $('#species-picture-rcp85').prop({src: graph_helper.picture_files.rcp85[ ui.value ] });
        //$('.slider-year').text(graph_helper.picture_files[ ui.value ].substr(-13, 9).replace('_',' - '));
      },
      start: function( event, ui ) {

        if( graph_helper.rotate_picture_both != null ) {
          $('#pause-button-both').trigger('click');
        }
      }
    });
  });
})();
