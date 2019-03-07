(function() {
  var regionNameVal = document.getElementById('regionName').value;
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
            <div class="col ml-4">
              <div class="title" id="regionalName"></div>
              <div id="region-options"></div>
            </div>
          </div>
        </div>
    </div>
  `;

  document.getElementById('regionalName').innerHTML = regionNameVal;

})();
