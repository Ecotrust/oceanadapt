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

        <!-- <div class="col-2">
          <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#search-options" aria-expanded="false" aria-controls="search-options">Expand Options</button>
        </div>
      </div> -->

      <!-- <div class="row">
        <div class="collapse" id="search-options">
          <div class="col">
            <div class="row">
              <h2><img src="./img/i_filter_green.svg" /> Filter By</h2>
            </div>

             <div class="row">
                <div class="col">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                    <label class="form-check-label" for="defaultCheck1">
                      Commercial
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                    <label class="form-check-label" for="defaultCheck1">
                      Recreational
                    </label>
                  </div>
                </div>
                <div class="col">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                    <label class="form-check-label" for="defaultCheck1">
                      Invertebrates
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                    <label class="form-check-label" for="defaultCheck1">
                      Fish
                    </label>
                  </div>
                </div>
                <div class="col">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                    <label class="form-check-label" for="defaultCheck1">
                      Bottom-dwelling
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                    <label class="form-check-label" for="defaultCheck1">
                      Water-column
                    </label>
                  </div>
                </div>
              </div> -->

              <!-- <div class="row">
                <nav id="species-listing-alphabetical" class="navbar navbar-light">
                  <h2>Alphabetical Listing</h2>
                  <ul class="nav">
                    <li class="nav-item"><a class="nav-link" href="#a">A</a></li>
                    <li class="nav-item"><a class="nav-link" href="#b">B</a></li>
                    <li class="nav-item"><a class="nav-link" href="#c">C</a></li>
                    <li class="nav-item"><a class="nav-link" href="#d">D</a></li>
                    <li class="nav-item"><a class="nav-link" href="#e">E</a></li>
                    <li class="nav-item"><a class="nav-link" href="#f">F</a></li>
                    <li class="nav-item"><a class="nav-link" href="#g">G</a></li>
                    <li class="nav-item"><a class="nav-link" href="#h">H</a></li>
                    <li class="nav-item"><a class="nav-link" href="#i">I</a></li>
                    <li class="nav-item"><a class="nav-link" href="#j">J</a></li>
                    <li class="nav-item"><a class="nav-link" href="#k">K</a></li>
                    <li class="nav-item"><a class="nav-link" href="#l">L</a></li>
                    <li class="nav-item"><a class="nav-link" href="#m">M</a></li>
                    <li class="nav-item"><a class="nav-link" href="#n">N</a></li>
                    <li class="nav-item"><a class="nav-link" href="#o">O</a></li>
                    <li class="nav-item"><a class="nav-link" href="#p">P</a></li>
                    <li class="nav-item"><a class="nav-link" href="#q">Q</a></li>
                    <li class="nav-item"><a class="nav-link" href="#r">R</a></li>
                    <li class="nav-item"><a class="nav-link" href="#s">S</a></li>
                    <li class="nav-item"><a class="nav-link" href="#t">T</a></li>
                    <li class="nav-item"><a class="nav-link" href="#u">U</a></li>
                    <li class="nav-item"><a class="nav-link" href="#v">V</a></li>
                    <li class="nav-item"><a class="nav-link" href="#w">W</a></li>
                    <li class="nav-item"><a class="nav-link" href="#x">X</a></li>
                    <li class="nav-item"><a class="nav-link" href="#y">Y</a></li>
                    <li class="nav-item"><a class="nav-link" href="#z">Z</a></li>
                  </ul>
                </nav>
                <div data-spy="scroll" id="species-listing-alphabetical-list" data-target="#species-listing-alphabetical" data-offset="0">
                  <div class="list"></div>
                </div>
              </div>

            </div>
        </div>
      </div> -->
    </div>
  `;
})();
