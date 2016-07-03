(function(){

	var RepoController = function($scope, $http, $routeParams){
		$http.get('https://api.github.com/repos/'+ $routeParams.username + '/' + $routeParams.repo +'/contributors')
			.then(function(response){
				$scope.contributors = response.data;
			});


		$scope.username = $routeParams.username;
	};

	var app = angular.module('githubViewer');
	app.controller('RepoController', RepoController);

}());