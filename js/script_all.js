	
(function(){
	var app = angular.module('githubViewer', ['ngRoute']);
	
	app.config(function($routeProvider){
		$routeProvider
			.when("/main",{
				templateUrl: function() { return 'main.html?' + +new Date(); },
				controller: "MainController"
			})
			.when("/user/:username",{
				templateUrl: function() { return 'user.html?' + +new Date(); },
				controller: "UserController"
			})
			.when("/user/:username/:repo",{
				templateUrl: function() { return 'repo.html?' + +new Date(); },
				controller: "RepoController"
			})
		.otherwise({redirectTo: "/main"});
	});
}());

(function(){
	var app = angular.module('githubViewer');

	var MainController = function($scope, $location){

		$scope.getUser = function(username){
			$location.path("/user/" + username);
		};
	};

	app.controller('MainController', MainController);
}());

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

(function(){
	var github = function($http){

		var getUser = function(username){
			return $http.get('https://api.github.com/users/' + username)
				.then(function(response){
					return response.data;
				});
		};

		var getRepos = function(user){
			return $http.get(user.repos_url)
				.then(function(response){
					return response.data;
			});
		}

		return {
			getUser : getUser,
			getRepos : getRepos
		};

	};

	var app = angular.module("githubViewer");
	app.factory('github', github);
}());
