(function(){
	var app = angular.module('githubViewer');


	var UserController = function($scope, $routeParams, github){

		var onUserComplete = function(data){
			$scope.user = data;
			console.log($scope.user.login);
			github.getRepos($scope.user).then(function(data){
				$scope.repos = data;
			});
		};

		github.getUser($routeParams.username).then(onUserComplete);

		$scope.repoSortOrder = "+id";
	};

	app.controller('UserController', UserController);
}());