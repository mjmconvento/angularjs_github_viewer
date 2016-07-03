(function(){
	var app = angular.module('githubViewer');

	var MainController = function($scope, $location){

		$scope.getUser = function(username){
			$location.path("/user/" + username);
		};
	};

	app.controller('MainController', MainController);
}());
