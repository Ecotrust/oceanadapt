function render() {
  // Render the page
  document.getElementById('map-overlay').innerHTML = `
    <h1>Ocean<br />Adapt</h1>
    <h2>Welcome!
    <br />Select a region or continent explore changes in marine species distributions.
  </h2>
  <button type="button" class="btn-download" data-toggle="modal" data-target="#dataDownloadModal">
    <img src="./img/i_download.svg"> Download Data
  </button>`
}

render();
