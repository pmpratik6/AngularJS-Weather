app.controller("mainController", function($scope, $http){

	// set default scope variables
	$scope.data = $scope.img = $scope.loc = $scope.status = null;

	// hide ajax loader image on page load
	$scope.loader = false;

	$scope.submit = function () {
	    debugger;
	    $scope.locations = $scope.loc.split(',');
	    $scope.locnSel = $scope.locations[0];
	    $scope.getWeather($scope.locations[0]);
	    $scope.loc = "";
	}

	$scope.getWeather = function (location) {

	    // display ajax loader image
	    $scope.loader = true;

	    // reset status code
	    $scope.status = null;
	    debugger;


	    // fire ajax request to get weather report for selected location
	    $http.jsonp('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + location + '&cnt=14&APPID=03bfaaa2338a1495d11f11d28a1eea35&callback=JSON_CALLBACK ')

            // the ajax request was successful
            .success(function (data, status) {
                debugger;
                // store request data in scope
                $('#test').gmap3({
                    clear: {
                        id: "mTagX"
                    }
                });
              
                //$('#test').remove();
              
                $scope.data = data;

                // store status code in scope
                $scope.status = status;

               
               
                // the selected location was found
                if (data.cod == 200) {
                    
                    $("#test").width("600px").height("350px").gmap3({
                        action: 'init',
                        map: {
                            options: {
                                center: [data.city.coord.lat, data.city.coord.lon],
                                zoom: 8
                            }
                        },
                        marker: {
                            values:[
                                {latLng: [data.city.coord.lat, data.city.coord.lon],id:"mTagX"}],
                                callback: function () {
                                    $(this).css('border', '1px solid gray');
                                }
                            }
                        }
                        );
                    var dt = new Date();
                                       
                    for (var i = 0; i < $scope.data.list.length; i++) {
                        $scope.data.list[i].date = dt.getDate() - i + '/' + (dt.getMonth() + 1) + '/' + dt.getFullYear();
                       // $scope.data.list[i].date = dt.setDate(dt.getDate() - i);
                  }

                    // the selected location was not found
                } else {

                    // set error message
                    $scope.data.message = 'Sorry, \'' + location + '\' could not be found.';

                }

                // hide ajax loader image
                $scope.loader = false;
            })

            // the ajax request failed
            .error(function (data, status) {
                // set error message
                $scope.data = 'Oops! The request failed.';

                // store status code in scope
                $scope.status = status;

                // hide ajax loader image
                $scope.loader = false;
                
            });

	
	    //$('#test').gmap3({
	    //    map: {
	    //        options: {
	    //            center: [-33, 151],
	    //            zoom: 8
	    //        }
	    //    },
	    //    marker: {
	    //        latLng: [-33, 151],
	    //        callback: function () {
	    //            $(this).css('border', '1px solid red');
	    //        }
	    //    }
	    //});
	}

	
	

});

