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

// dropdown species selection
function chooseSpecies(event) {
  console.log(event);
  console.log(event.target.parentNode)
  event.preventDefault();
}

// load graph taken from oceanadapt site files, which was written outside fo Ecotrust - 9.1.18 DP
function load_graph(graph_type) {

	var regionID = $('#regionID').val();
	var speciesID = $('#speciesID').val();

	$.post(
		"", {
			'page-action':'1',
			'graph_type':graph_type,
			regionID: regionID,
			speciesID: speciesID
		},
		null, //no function, taken care of in .done()
		'json'
	)
	.done(function( data ) {
		////console.log('done');
		////console.log(data);

		if( data['minor-error-code'] == '0' ) {

				var mycallBack = function (ctx, area, dygraph) { };
				if(speciesID == "-1" ){
					 mycallBack =function (ctx, area, dygraph) {

							var graph_range = dygraph.xAxisRange();
							var p1 = dygraph.toDomCoords(graph_range[0],0);
							var p2 = dygraph.toDomCoords(graph_range[1],0);

							ctx.strokeStyle='blue';
							ctx.beginPath();
							ctx.moveTo(p1[0],p1[1]);
							ctx.lineTo(p2[0],p2[1]);
							ctx.closePath();
							ctx.stroke();


						};
				}
				var g = new Dygraph(
					document.getElementById('graphdiv_' + graph_type),
					data.values.csv_data,
					{
						errorBars:true,
						sigma:1, //only one std
						//customBars: true, //don't use with errorBars
						legend:'always',
						ylabel: data.values.csv_data_y_label,
						xlabel: 'Year',
						labelsDivWidth:265,
						underlayCallback: mycallBack
					}

				);



				if(graph_type=="1") {
					g.updateOptions({
						axes:{
							y: {
								valueFormatter: function(x) {
									////console.log(x);
									var mystring= '' + x;
									return mystring;
								}
							}
						}
					});

					graph_helper.latGraph.data = data.values.csv_data;
					graph_helper.latGraph.graph = g;
//resizeGraph(graph_helper.latGraph);
//resetGraph(graph_helper.latGraph);
				}else if(graph_type=="2") {
					//PLEASE NOTE: We're reversing the values before they are sent back to us for depth only.
					//When returning data for the depth chart using action 1, we return -1*depth to get the line in the proper positioning.
					//	After, we simply modify the labels to show the appropriate y axis and y axis value
					g.updateOptions({
						axes:{
							y: {
								valueFormatter: function(x) {
									////console.log(x);
									var mystring= '' + x;
									if( mystring=="0" ) { return "0" }
									else if( mystring.charAt(0) == "-"  ) {
										return mystring.substr(1);
									}
									return'-'+mystring;
								},
								axisLabelFormatter: function(x) {
									////console.log(x);
									var mystring= '' + x;
									if( mystring=="0" ) { return "0" }
									else if( mystring.charAt(0) == "-"  ) {
										return mystring.substr(1);
									}
									return'-'+mystring;
								}
							}
						}
					});
					graph_helper.depthGraph.data = data.values.csv_data;
					graph_helper.depthGraph.graph = g;
//resizeGraph(graph_helper.depthGraph);
//resetGraph(graph_helper.depthGraph);
				}else if(graph_type=="3") {
					g.updateOptions({
						axes:{
							y: {
								valueFormatter: function(x) {
									////console.log(x);
									var mystring= '' + x;
									return mystring;
								}
							}
						}
					});

					graph_helper.lonGraph.data = data.values.csv_data;
					graph_helper.lonGraph.graph = g;
				}

				if( data.values.isSpeciesData == 'true' ) {
					$('#region-stat').hide();
					$('#fish-count').text('\$COUNT');
					$('#min-year').text('\$MIN_YEAR');
					$('#max-year').text('\$MAX_YEAR');



				}else{
					$('#region-stat').show();
					$('#fish-count').text( data.values.count );
					$('#min-year').text( data.values.min_year );
					$('#max-year').text( data.values.max_year );
				}


				if( $('#graph_0').hasClass('selected-graph') ) {
					expand_graph_set(0);
				}else if( $('#graph_1').hasClass('selected-graph') ) {
					expand_graph_set(1);
				}else if( $('#graph_2').hasClass('selected-graph') ) {
					expand_graph_set(2);
				}else if( $('#graph_4').hasClass('selected-graph') ) {
					expand_graph_set(4);
				}
				//Maybe we will have some pictures?
				//return_array['values']['pictures']['files']

				if( graph_type == '1' ) {

					$('#species-picture').prop({src:''});

					graph_helper.picture_files = data.values.pictures.files;
					if( data.values.pictures.files.length > 0 ) {
						$('#graph_4').show();
						$('#map-div').show();
						var my_pics = data.values.pictures.files;


						var i=0;
						for(i;i<graph_helper.picture_files.length;i++) {
							graph_helper.picture_files[i] = '{$base_doc}/common_files/picture_folder/' + data.values.pictures.dir + '/' + graph_helper.picture_files[i];
						}


						$('#slider-start-year').text( graph_helper.picture_files[ 0 ].substr(-8, 4) );
						$('#slider-end-year').text( graph_helper.picture_files[ graph_helper.picture_files.length -1 ].substr(-8, 4) );
						$('#slider').slider('option','max', data.values.pictures.files.length - 1 );
						$('#slider').slider('option','value', 0);

						//$('#slider-year').text(graph_helper.picture_files[ 0 ].substr(-8, 4));
						//$('#slider-units').text(data.values.pictures.units);
						//$('#slider-value').text( data.values.min_year );
						$('#species-picture').prop({src:graph_helper.picture_files[0]});

					}else{
						//console.log('HIDE MAP DIV : `'+ graph_helper.picture_files +'`');
						if( $('#graph_4').hasClass('selected-graph') ) {
							expand_graph_set(0);
						}

						$('#graph_4').hide();
						$('#map-div').hide();
					}
				}


			//If seus, show only graph 1
			console.log('load_graph: set up graph if SEUS');
			var regionID = $('#regionID').val();
			var speciesID = $('#speciesID').val();
			console.log('load_graph: set up graph if SEUS ['+ regionID+','+speciesID+']');

			if( speciesID ==-1 && (regionID == '7' || regionID == '8' || regionID == '9')){
				console.log('SEUS and no species selected');
				expand_graph_set(1);
			}

			if( $('#play-button').is(':visible') ) {
				$('#play-button').trigger('click');
			}
		}else{
			//console.log('Error');
		}
	})
	.fail(function(data) {
		//console.log( "Server Error" );
	})
	.always(function() {

	});

	return true;
}
