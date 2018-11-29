window.onload = function() {
  loadScript('../pages/home.js');
  loadScript('../pages/search.js');
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
}

const smoothScroll = element =>
	document.querySelector(element).scrollIntoView({
  	behavior: 'smooth'
	});

// update data to be downloaded
$('#dataDownloadModal').on('show.bs.modal', function (event) {
	axios({
		url: '/download',
	}).then(function(response) {

	});
	$('#user-info-form').submit(function(event) {
		console.log(event);
		event.preventDefault();
		submit_my_information(event.target)
	});
  var button = $(event.relatedTarget); // Button that triggered the modal
  var dataToDownload = button.data('tobedownloaded'); // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this);
  modal.find('.modal-title').text('Download ' + dataToDownload);
  modal.find('.modal-body input').val(dataToDownload);
});

// dropdown species selection
function chooseSpecies(selectedSpeciesID, selectedSpeciesName) {
  document.getElementById('page-content').classList.add('show');
  var regionID = document.getElementById('regionID').value;
  document.getElementById('speciesID').value = selectedSpeciesID;
  document.getElementById('speciesName').value = selectedSpeciesName;
  if (selectedSpeciesID !== -1) { // -1 is region selection
    // if not -1 then species should have a name
    document.getElementById('selected-species').innerHTML = `<h4 class="mt-4 mb-0">${selectedSpeciesName} selected</h4>`;
  }
  var speciesSelection = axios.create();
  var speciesSelectionParams = new URLSearchParams();
  speciesSelectionParams.append('page-action', 1);
  speciesSelectionParams.append('graph_type', 1);
  speciesSelectionParams.append('regionID', regionID);
  speciesSelectionParams.append('speciesID', selectedSpeciesID);
  speciesSelection.post('/regional_data', speciesSelectionParams)
    .then(function(response) {
				load_graph(1, response.data);
				if (selectedSpeciesID > 0) {
					load_slider(response.data);
				}
			})
			.then(function() {
				speciesSelectionParams.set('graph_type', 2);
				speciesSelection.post('/regional_data', speciesSelectionParams)
					.then(function(res) {
							load_graph(2, res.data);
	       })
				 .catch(function(error) {
		       console.log(error);
		     })
			})
    .catch(function(error) {
      console.log(error);
    });
}

// future projection selection
function chooseFuture() {
	var oceanRegion = document.getElementById('oceanRegion').value;
	var speciesName = document.getElementById('speciesName').value;
  var futureSelection = axios.create();
  var futureSelectionParams = new URLSearchParams();
  futureSelectionParams.append('page-action', 1);
  futureSelectionParams.append('graph_type', 1);
  futureSelectionParams.append('regionID', oceanRegion);
  futureSelectionParams.append('speciesID', speciesName);
  futureSelection.post('/future_data/', futureSelectionParams)
    .then(function(response) {
      loadFutureSlider(1, response.data);
				// loadFuture(1, response.data);
      load_slider(response.data);
			})
			// .then(function() {
			// 	futureSelectionParams.append('graph_type', 1);
			// 	futureSelection.post('/future_data', futureSelectionParams)
			// 		.then(function(res) {
			// 				loadFuture(2, res.data);
	    //    })
			// 	 .catch(function(error) {
		  //      console.log(error);
		  //    })
			// })
    .catch(function(error) {
      console.log(error);
    });
}

function load_slider(data) {
  document.getElementById('animation-wrap').classList.remove('d-none');
  document.getElementById('nav-projections').classList.remove('d-none');
  $('#species-picture').prop({src:''});
  $('#species-picture-rcp26').prop({src:''});
  $('#species-picture-rcp85').prop({src:''});

  if ( Array.isArray(data.values.pictures.files) ) {
    graph_helper.picture_files = data.values.pictures.files;
    if( data.values.pictures.files.length > 0 ) {
      for(var i = 0;i<graph_helper.picture_files.length;i++) {
        graph_helper.picture_files[i] = '/common_files/picture_folder/' + data.values.pictures.dir + '/' + graph_helper.picture_files[i];
      }
      $('#slider-start-year').text( graph_helper.picture_files[ 0 ].substr(-8, 4) );
      $('#slider-end-year').text( graph_helper.picture_files[ graph_helper.picture_files.length -1 ].substr(-8, 4) );
      $('#slider').slider('option','max', data.values.pictures.files.length - 1 );
      $('#slider').slider('option','value', 0);
      $('#species-picture').prop({src:graph_helper.picture_files[0]});
		} else {
			console.log('HIDE MAP DIV : `'+ graph_helper.picture_files +'`');
		}

    $('#play-button').on('click', function () {
      $('#play-button').addClass('positive').removeClass('greybutton');
      $('#pause-button').removeClass('negative').addClass('greybutton');
  			graph_helper.rotate_picture = setInterval(function(){
  				var my_val = $('#slider').slider('option','value') + 1 ;
  				$('#slider').slider('option','value', my_val);
  				////console.log(my_val);
  				if( !graph_helper.picture_files[ my_val ] ) {
  					//clearInterval(graph_helper.rotate_picture);
  					//graph_helper.rotate_picture = null;
  					//console.log('Rotation Loop complete. Restarting.');
  					//return true;
  					my_val = 0;
  					$('#slider').slider('option','value', 0);
  				}
  				$('#species-picture').prop({src: graph_helper.picture_files[ my_val ] });
  			}, 333)
    });

    $('#pause-button').on('click', function () {
  			if( graph_helper.rotate_picture != null ) {
  				clearInterval(graph_helper.rotate_picture);
  				graph_helper.rotate_picture = null;
  				console.log('Interval Cleared');
  			}
  			$('#play-button').removeClass('positive').addClass('greybutton');
  			$('#pause-button').addClass('negative').removeClass('greybutton');
    });

  } else if (data.values.pictures.files.hasOwnProperty('rcp26')) {

    graph_helper.future_picture_files.rcp26 = data.values.pictures.files.rcp26;
    graph_helper.future_picture_files.rcp85 = data.values.pictures.files.rcp85;

    $('#slider-start-year').text( graph_helper.future_picture_files.rcp26[ 0 ].substr(-13, 9).replace('_',' - ') );
    $('#slider-end-year').text( graph_helper.future_picture_files.rcp26[ graph_helper.future_picture_files.rcp26.length - 1 ].substr(-13, 9).replace('_',' - ') );
    $('#slider').slider('option','max', data.values.pictures.files.rcp26.length - 1 );
    $('#slider').slider('option','value', 0);

    $('#species-picture-rcp26').prop({src: graph_helper.future_picture_files.rcp26[0] });
    $('#species-picture-rcp85').prop({src: graph_helper.future_picture_files.rcp85[0] });

    $('#play-button').off('click');
    $('#play-button').on('click', function () {
      if( graph_helper.rotate_picture_both != null ) {
        //It is already in motion.
        return true;
      }
      graph_helper.rotate_picture_both = setInterval(function(){
        var my_val = $('#slider').slider('option','value') + 1 ;
        $('#slider').slider('option','value', my_val);
        if( !graph_helper.future_picture_files.rcp26[ my_val ] ) {
          my_val = 0;
          $('#slider').slider('option','value', 0);
        }
        $('#species-picture-rcp26').prop({src: graph_helper.future_picture_files.rcp26[ my_val ] });
        $('#species-picture-rcp85').prop({src: graph_helper.future_picture_files.rcp85[ my_val ] });

        $('#play-button').addClass('positive').removeClass('greybutton');
        $('#pause-button').removeClass('negative').addClass('greybutton');
      }, 500);
    });

    $('#pause-button').off('click');
    $('#pause-button').on('click', function () {
      $('#play-button').removeClass('positive').addClass('greybutton');
      $('#pause-button').addClass('negative').removeClass('greybutton');
      if( graph_helper.rotate_picture_both != null ) {
        clearInterval(graph_helper.rotate_picture_both);
        graph_helper.rotate_picture_both = null;
      }
      return true;
    });

  } else {
    $('#animation-wrap').append('Sorry, no imagery available for species');
  }
}

// load graph taken from oceanadapt site files
// written outside fo Ecotrust by rutgers - 9.1.18 DP
function load_graph(graph_type, data) {
	var regionID = document.getElementById('regionID').value;
	var speciesID = document.getElementById('speciesID').value;

	if (data['minor-error-code'] == '0') {
		var mycallBack = function (ctx, area, dygraph) { };
		if (speciesID == "-1"){
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
			document.getElementById('graph_' + graph_type),
			data.values.csv_data,
			{
				errorBars: true,
				sigma: 1, //only one std
				//customBars: true, //don't use with errorBars
				legend:'always',
				ylabel: data.values.csv_data_y_label,
				xlabel: 'Year',
				labelsDivWidth: 265,
				underlayCallback: mycallBack,
			}
		);

		if (graph_type=="1") {
			g.updateOptions({
				axes:{
					y: {
						valueFormatter: function(x) {
							var mystring= '' + x;
							return mystring;
						}
					}
				}
			});

			graph_helper.latGraph.data = data.values.csv_data;
			graph_helper.latGraph.graph = g;

		} else if (graph_type=="2") {
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

				// expand_graph_set(0);

				if( graph_type == '1' ) {
					$('#species-picture').prop({src:''});
					graph_helper.picture_files = data.values.pictures.files;
					if( data.values.pictures.files.length > 0 ) {
						var i=0;
						for(i;i<graph_helper.picture_files.length;i++) {
							graph_helper.picture_files[i] = '/common_files/picture_folder/' + data.values.pictures.dir + '/' + graph_helper.picture_files[i];
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
						// $('#graph_4').hide();
						// $('#map-div').hide();
					}
				}

			if( speciesID ==-1 && (regionID == '7' || regionID == '8' || regionID == '9')){
				console.log('SEUS and no species selected');
				// expand_graph_set(1);
			}

			if( $('#play-button').is(':visible') ) {
				// $('#play-button').trigger('click');
			}
		}else{
			//console.log('Error');
		}
	}
	return true;
}

var graph_helper = {
	latGraph:{
		graph_num: 1,
		data:'',
		graph:null
	},
	depthGraph:{
		graph_num: 2,
		data:'',
		graph:null
	},
	lonGraph:{
		graph_num: 3,
		data:'',
		graph:null
	},
  graph1:{
    graph_num: 1,
    data:'',
    graph:null
  },
  graph2:{
    graph_num: 2,
    data:'',
    graph:null
  },
  future_picture_files: {
    rcp26:[],
    rcp85:[]
  },
	picture_files:[],
  rotate_picture_both: null,
	rotate_picture: null //The set interval
};

function submit_my_information( my_form ) {
	//We'll be ajaxing the form
	var fields = $(my_form).serializeArray();
	var submitInfo = axios.create();
  var submitInfoParams = new URLSearchParams();
	jQuery.each( fields, function( i, field ) {
		submitInfoParams.append(field.name, field.value);
  });
	submitInfoParams.append('page-action', 'submit-info');
	axios({
		method: 'post',
		url: "/download",
		data: submitInfoParams,
	})
	.then(function( data ) {
		if( data.data['minor-error-code'] == '0' || data.data['major-error-code'] == '6' ) {
			showDownloadForm();
			$('#information-token').val( data.data['values']['token'] );
			$('#display-form').hide();
			$('#download-form').show();
		}else{
			alert('There was a problem submitting your information. Please try again.');
			$('#display-form').show();
		}

		// start and end years
		var start = 1963;
		var end = new Date().getFullYear();
		var options = "";

		// add start years
		for(var year = start; year <= end; year++){
			if (year == start) {
					options += "<option selected>"+ year +"</option>";
				} else {
					options += "<option>"+ year +"</option>";
				}
		}
		document.getElementById("startYear").innerHTML = options;

		// Add end years
		var options2 = "";
		for(var year = start; year <= end; year++) {
			if (year == end) {
				options2 += "<option selected>"+ year +"</option>";
			} else {
				options2 += "<option>"+ year +"</option>";
			}
		}
		document.getElementById("endYear").innerHTML = options2;

	})

	return false;
}

function showDownloadForm() {

	$('#regionID').on('change', function () {

		console.info('Region changed');
		$('#startYear option').remove();
		$('#endYear option').remove();

		$.post(
			"/download", {
				'page-action':'5',
				'regionID':$('#regionID').val()
			},
			null, //no function, taken care of in .done()
			'json'
		)
		.done(function( data ) {
			console.log('done');
			console.log(data);

			if( data['minor-error-code'] == '0' ) {

				var startYear = data.values.startYear;
				var endYear = data.values.endYear;
				var i=0;
				for(i=0;(i+startYear)<=endYear;i++) {
					$('#startYear').append(
						$('<option></option')
							.text( (i+startYear) )
							.val( (i+startYear) )
					);
					$('#endYear').append(
						$('<option></option')
							.text( (i+startYear) )
							.val( (i+startYear) )
					);

				}

				$('#endYear').val($('#endYear option:last').val() );
			}else{
				console.log('Error.');
			}
		})
		.fail(function(data) {
			console.log( "Server Error" );
		})
		.always(function() {

		});

		return true;

	});

	$('#download-archived-data').on('click', function () {
		console.info('download archvied');

		if( $('#archiveID').val() == '-1') {
			return true;
		}

		ga('send', 'event',
			'Archived Data',
			$('#archiveID option:selected').text(),
			''
		);


		location.href='./archive/' + $('#archiveID').val() + '/Data_Updated.zip';
		return true;

	});

	$('#download-data').on('click', function () {
    console.info('Download data');
    var regionID = $('#downloadRegionID').val();
    var selectAllData = $('#selectAllData').is(':checked');
    var startYear = $('#startYear').val();
    var endYear = $('#endYear').val();
    var dataTypeID = $('#dataTypeID').val();
    var include_latitude=$('#include_latitude').is(':checked')
    var include_longitude=$('#include_longitude').is(':checked')
    var include_depth=$('#include_depth').is(':checked')

		//Some error checking

		if(!selectAllData && (startYear == "" &&endYear == "")) {
			alert('Please choose either:\\n1. "All available data" or \\n2. A start and/or end date');
			return false;
		}

		//check for start date before endendDateendDate
		if( startYear > endYear ) {
			alert('End year cannot be before start year.');
			return false;
		}

		//if they choose processed data, they have to choose a variable or more to download
		if( dataTypeID == "1" ) {
			if( !include_latitude && !include_longitude && !include_depth ) {
				alert('Please select one variable for downloading processed data.');
				return false;
			}
		}

  //Google analytic events
		var ga_label = {
			select_all_data : ( $('#selectAllData').is(':checked') ? 'checked' : 'not-checked' ),
			data_type: (dataTypeID == "1" ? 'Processed Data' : 'RAW Data' ),
			start_year: $('#startYear').val(),
			end_year: $('#endYear').val()
		};

		if( dataTypeID == "1" ){
			ga_label.include_latitude = ( $('#include_latitude').is(':checked') ? 'checked' : 'not-checked' );
			ga_label.include_longitude = ( $('#include_latitude').is(':checked') ? 'checked' : 'not-checked' );
			ga_label.include_depth = ( $('#include_latitude').is(':checked') ? 'checked' : 'not-checked' );
		}

		ga('send', 'event',
			'Download Data',
			$('#downloadRegionID option:selected').text(),
			JSON.stringify( ga_label )
		);

		//For submission:
		var submitObj = {
			'page-action': '1',
			'regionID': regionID,
			'selectAllData': selectAllData,
			'startYear': startYear,
			'endYear': endYear,
			// 'dataTypeID': dataTypeID,
			'include_latitude': include_latitude,
			'include_longitude': include_longitude,
			'include_depth': include_depth,
			'information-token': $('#information-token').val()
		};

  	var dataSubmitInfo = axios.create();
    var dataSubmitInfoParams = new URLSearchParams();
  	jQuery.each( submitObj, function( i, field ) {
      dataSubmitInfoParams.append(i, field);
    });
  	axios({
  		method: 'post',
  		url: "/download/",
  		data: dataSubmitInfoParams,
  	}).then(function( data ) {
			console.log('done');
			console.log(data);
			if( data['minor-error-code'] == '0' ) {
				// loadComplete();
				$('<form/>')
					.attr({
						'id':'dataDownloadForm',
						'name':'dataDownloadForm',
						'method':'post',
						'target':'dataDownloadIFRAME'
					}).appendTo('body');
				$('<input />')
					.attr({
						'type':'hidden',
						'name':'page-action',
						'id':'page-action',
						'value':(dataTypeID == "2" ? "3" : "2" )
					})
					.appendTo('#dataDownloadForm');
				$('<input />')
					.attr({
						'type':'hidden',
						'name':'filename',
						'id':'tempFileName',
						'value':data.values.statistics.filename
					})
					.appendTo('#dataDownloadForm');
				$('#dataDownloadForm').submit().remove();

			}else{
				console.log('Error.');
			}
		})

		return true;
		return  performAction( 1, submitObj,
				function (returnObject) {
					switch (returnObject.actionPerformedStatus) {
						case 0:
							console.log(returnObject);
							loadComplete();
							$('<form/>')
								.attr({
									'id':'dataDownloadForm',
									'name':'dataDownloadForm',
									'method':'post',
									'target':'dataDownloadIFRAME'
								}).appendTo('body');
							$('<input />')
								.attr({
									'type':'hidden',
									'name':'actionPerform',
									'id':'actionPerform',
									'value':(dataTypeID == "2" ? "3" : "2" )
								})
								.appendTo('#dataDownloadForm');
							$('<input />')
								.attr({
									'type':'hidden',
									'name':'filename',
									'id':'tempFileName',
									'value':returnObject.returnValues.statistics.filename
								})
								.appendTo('#dataDownloadForm');
							$('#dataDownloadForm').submit().remove();
							break;
						case 1:
						case 2:
						case 3:
						case 4:
						case 5:
						case 6:
							console.error("No Good!");
							break;
					}
				}
			);

	});

	$('#download-latest-raw').on('click', function () {
		console.info('Download latest raw data.');

		ga('send', 'event',
			'Latest Raw Data',
			'Download',
			''
		);

		location.href='./latest/Data_Updated.zip';
	});
	$('#download-r-script').on('click', function () {
		console.info('Download r script');

		ga('send', 'event',
			'RScript',
			'Download',
			''
		);

		location.href='./latest/complete_r_script.R';
	});

	$('#download-map-script').on('click', function () {
		console.info('Download map / raster file script');

		ga('send', 'event',
			'Map / Raster Script File',
			'Download',
			''
		);

		location.href='./latest/OAGenerateRasterFiles.py';
	});

};

function loadFutureSlider(graph_type, data) {
  var mycallBack = function (ctx, area, dygraph) { };
  if($('#speciesID').value == "-1" ){
    mycallBack = function (ctx, area, dygraph) {
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

  //There should always be a grpah 1.
  var graph1Data = data.values.graph1;

  if ( !data.values.graph1.hasData ) {
    //Use graph 2
    graph1Data  = data.values.graph2;
  }

  var g = new Dygraph(
    document.getElementById('graph_1'),
    graph1Data.csv_data /* + "5.25,NaN\\n"*/,
    {
      dateWindow:[1,5.25],
      errorBars:true,
      sigma:1, //only one std
      title: graph1Data.title,
      //customBars: true, //don't use with errorBars
      legend:'always',
      ylabel: graph1Data.csv_data_y_label,
      xlabel: 'Year Range',
      labelsDivWidth:265,
      underlayCallback: mycallBack,
      zoomCallback: function() {
        g.updateOptions({dateWindow:[1,5.25]});
      }
    }
  );

  g.updateOptions({
    //xRangePad:25,
    xAxisLabelWidth: 75,
    axes:{
      y: {
        valueFormatter: function(x) {
          ////console.log(x);
          var mystring= '' + x;
          return mystring;
        }
      },
      x: {
        valueFormatter: function(ms) {
          return get_period(ms);
        },
        axisLabelFormatter: function(d) {
          return get_period(d);
        },
      },
    }
  });

  graph_helper.graph1.graph = g;

  if ( data.values.graph1.hasData && data.values.graph2.hasData ) {
    var graph2Data = data.values.graph2;
    var g2 = new Dygraph(
      document.getElementById('graph_2'),
      graph2Data.csv_data /* + "5.25,NaN\\n"*/,
      {
        dateWindow:[1,5.25],
        errorBars:true,
        sigma:1, //only one std
        title:graph2Data.title,
        //customBars: true, //don't use with errorBars
        legend:'always',
        ylabel: graph2Data.csv_data_y_label,
        xlabel: 'Year Range',
        labelsDivWidth:265,
        underlayCallback: mycallBack,
        zoomCallback: function() {
          g.updateOptions({dateWindow:[1,5.25]});
        }
      }
    );
    g2.updateOptions({
      //xRangePad:25,
      xAxisLabelWidth: 75,
      axes:{
        y: {
          valueFormatter: function(x) {
            ////console.log(x);
            var mystring= '' + x;
            return mystring;
          }
        },
        x: {
          valueFormatter: function(ms) {
            return get_period(ms);
          },
          axisLabelFormatter: function(d) {
            return get_period(d);
          },
        },
      }
    });
    graph_helper.graph2.graph = g2;
    $('#chart-title-two').text('Changes in Latitude');
  } else {
    //No graph 2
    console.log('no graph 2');
    $('#chart-title-two').text('');
    $('#graph_2').addClass('d-none');
    if( graph_helper.graph2.graph ) {
      graph_helper.graph2.graph.destroy();
      graph_helper.graph2.graph = null;
    }
  }

  function get_period(rankID){
    switch(rankID){
      case 1:
        return '2007-2020';
        break;
      case 2:
        return '2021-2040';
        break;
      case 3:
        return '2041-2060';
        break;
      case 4:
        return '2061-2080';
        break;
      case 5:
        return '2081-2100';
        break;
      case 5.25:
        return '';
      default:
        console.warn('Rank ID not found: `'+ rankID +'`');
        return '';
        break;
    }
  }
}
