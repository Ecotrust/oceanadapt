window.onload = function() {
  import('../pages/home.js');
  import('../pages/search.js');
};

// Promise wrapper to load scripts
function loadScript(src) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error("Script load error: " + src));

    document.head.append(script);
  });
};

// update data to be downloaded
$('#dataDownloadModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var dataToDownload = button.data('tobedownloaded') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  modal.find('.modal-title').text('Download ' + dataToDownload)
  modal.find('.modal-body input').val(dataToDownload)
});
