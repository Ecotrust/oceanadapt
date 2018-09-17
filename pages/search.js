document.getElementById('search-wrap').innerHTML = `
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
      </div>

      <div class="row">
        <h2>Alphabetical Listing</h2>
        <nav id="species-listing-alphabetical" class="navbar navbar-light bg-light">
          <ul class="nav nav-pills">
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
        <div data-spy="scroll" data-target="#species-listing-alphabetical" data-offset="0">
          <h4 id="a" class="active">A</h4>
          <div>A species</div>
          <h4 id="b">B</h4>
          <div>B species</div>
          <h4 id="c">C</h4>
          <div>C species</div>
          <h4 id="d">D</h4>
          <div>D species</div>
          <h4 id="E">E</h4>
          <div>E species</div>
          <h4 id="F">F</h4>
          <div>F species</div>
        </div>
      </div>

    </div>
  </div>
</div>
`;
