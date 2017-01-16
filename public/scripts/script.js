console.log("JS");

var app = angular.module("app", ["ngRoute"]);

app.config(["$routeProvider", function($routeProvider){
  $routeProvider
    .when("/index" , {
      templateUrl : 'views/home.html',
      controller : 'franku'
    })
    .when("/groups" , {
      templateUrl : 'views/groups.html',
      controller : 'franku'
    })
    .otherwise({
      redirectTo : "/index"
    });
}]);

app.controller("franku", ["$scope", "$http", function($scope, $http){

  console.log("angular");
}]);
