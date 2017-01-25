console.log("JS");

var app = angular.module("app", ["ngRoute"]);
var vis = true;
app.config(["$routeProvider", function($routeProvider) {
    $routeProvider
        .when("/index", {
            templateUrl: 'views/home.html',
            controller: 'home'
        })
        .when("/groups", {
            templateUrl: 'views/groups.html',
            controller: 'groups'
        })
        .when("/dice", {
            templateUrl: 'views/dice.html',
            controller: 'dice'
        })
        .when("/tracker", {
            templateUrl: 'views/tracker.html',
            controller: 'tracker'
        })
        .when("/login", {
            templateUrl: 'views/login.html',
            controller: 'login'
        })
        .when("/register", {
            templateUrl: 'views/register.html',
            controller: 'register'
        })
        .otherwise({
            redirectTo: "/index"
        });
}]);

app.controller("home", ["$scope", "$http", function($scope, $http) {

    console.log("angular");
}]);
app.controller("groups", ["$scope", "$http", function($scope, $http) {
    var groups = [];
    var sGroups;
    $scope.load = function() {
        $http({
            method: "GET",
            url: "/group"
        }).then(function(resp) {
            console.log(resp);
            if (typeof resp.data == 'string') {
                console.log("string!");
                groups = [];
                $scope.groupArr = groups;
                $scope.failed = resp.data;
                $scope.showo = false;
            } else {
                $scope.groupArr = resp.data;
                $scope.showo = true;
            }
        });
    }; //end load function

    $scope.load();

    $scope.newGroup = function() {
        var groop = $scope.group;
        $scope.group = null;
        var obj = {
            groupName: groop,
            players: []
        };
        $http({
            method: "POST",
            url: "/group",
            data: obj
        }).then(function(response) {
            console.log("did this: ", response);
        });
        $scope.load();
    }; //end newGroup
    $scope.getPlayers = function(x) {
        console.log("getting...");
        $http({
            method: "POST",
            url: "/group/players",
            data: {
                groupId: x
            }
        }).then(function(response) {
            console.log(response);
            $scope.selectedGroup = response.data.players;
        });
    }; //end getplayers
    $scope.gettum = function() {
        console.log(this);
        sGroups = this.groops._id;
        $scope.getPlayers(sGroups);

    }; //end gettum
    $scope.newPlayer = function() {
        var newbie = $scope.playa;
        $scope.playa = null;
        console.log($scope.selectedGroup);
        console.log("sGroups:", sGroups);
        $http({
            method: "PUT",
            url: "/group",
            data: {
                id: sGroups,
                player: newbie
            }
        }).then(function(response) {
            console.log("What happened: ", response);
            $scope.getPlayers(sGroups);
        });
        console.log("sGroups at end", sGroups);

    }; //end newPlayer

    $scope.authentic = function() {
        $http({
            method: "GET",
            url: "/auth"
        }).then(function(response) {
            console.log("auth:", response.user);
        });
    }; //end $scope.authentic
}]);
app.controller("dice", ["$scope", "$http", function($scope, $http) {
    $scope.roll = function(num) {
        var x = parseInt((Math.random() * num) + 1);
        return x;
    };
    $scope.dAll = function() {
        $scope.d(20);
        $scope.d(12);
        $scope.d(10);
        $scope.d(8);
        $scope.d(6);
        $scope.d(4);
    };
    $scope.display = function(roll, die, van, mes) {
        var y = angular.element(document.querySelector('#roll' + die));
        if (roll == die) {
            console.log("CRIT");
            y.removeClass("fail");
            y.addClass("crit");
        } else if (roll == 1) {
            console.log("FAIL");
            y.removeClass("crit");
            y.addClass("fail");
        } else {
            y.removeClass("crit");
            y.removeClass("fail");
        }
        var funk = ("roll" + die);
        var town = ("van" + die);
        var take = ("advo" + die);
        $scope[funk] = roll;
        $scope[town] = van;
        $scope[take] = mes;
    };
    $scope.d = (function(num) {
        console.log($scope.adv);
        if ($scope.adv == 0) {
            console.log("Advantage");
            var first = $scope.roll(num);
            var second = $scope.roll(num);
            console.log("first:", first);
            console.log("second:", second);
            if (first >= second) {
                $scope.display(first, num, second, "Lower roll");
            } else if (first < second) {
                $scope.display(second, num, first, "Lower roll");
            }
        } else if ($scope.adv == 1) {
            console.log("Disadvantage");
            var first = $scope.roll(num);
            var second = $scope.roll(num);
            console.log("first:", first);
            console.log("second:", second);
            if (first >= second) {
                $scope.display(second, num, first, "Higher roll");
            } else if (first < second) {
                $scope.display(first, num, second, "Higher roll");
            }
        } else {
            console.log('No vantage');
            var first = $scope.roll(num);
            $scope.display(first, num, "", "");
        }
    });
}]);
app.controller("tracker", ["$scope", "$http", function($scope, $http) {
    var array = [];
    var x = 0;
    $scope.newChar = function() {
        x++;
        var obj = {
            name: $scope.chara,
            number: $scope.roll,
            turn : false
        };
        $scope.chara = "";
        $scope.roll = "";
        array.push(obj);
        array.sort(function(a, b) {
            return b.number - a.number;
        });
        $scope.charArray = array;
    };
    $scope.clear = function() {
        array = [];
        $scope.charArray = array;
        $scope.whosTurn = "";
    };
    $scope.newInit = function(){
      console.log(this);
      this.chars.number = this.initAdd;
      array.sort(function(a, b) {
          return b.number - a.number;
      });
      this.initAdd = "";
      $scope.charArray = array;
    };

    $scope.remove = function(){

      console.log(this);
      var goFind = this.chars;
      console.log(array);
      var goDelete = array.indexOf(goFind);
      array.splice(goDelete,1);
      $scope.charArray = array;

    };
      var turn = -1;
    $scope.turn = function(){
      var length = array.length;
      var num = length - 1;
      for (var i = 0; i < length; i++) {
        array[i].turn = false;
      }

      if (turn < num){
        turn++;
      } else if (turn >= (num)) {
        turn = 0;
      }
      array[turn].turn = true;
      console.log(array);
      for (var i = 0; i < length; i++) {
        if (array[i].turn){
        var strang = (array[i].name + "'s turn! ");
        $scope.whosTurn = strang;
        }
      }
    };

}]);


app.controller("login", ["$scope", "$http", "$window", function($scope, $http, $window) {
    $scope.login = function() {
        var credent = {
            username: $scope.username,
            password: $scope.password
        };
        $http({
            method: "POST",
            url: "/",
            data: credent
        }).then(function success(response) {
            console.log("Logged in!", response);
            $window.location.href = '#!/home';
        }); //end success
    }; //end scope.login function

}]);
app.controller("register", ["$scope", "$http", "$window", function($scope, $http, $window) {

    $scope.register = function() {
        var regUser = {
            username: $scope.username,
            password: $scope.password
        };
        if (regUser.password != $scope.confirm) {
            $scope.match = "Passwords don't match!";
        } else {
            $scope.match = "";
            $http({
                method: "POST",
                url: "/regis",
                data: regUser
            }).then(function reg(response) {
                console.log("User created!", response);
            });
            $window.location.href = '#!/login';
        }
    }; //end register
}]);

app.controller("global", ["$scope", "$http", "$window", function($scope, $http, $window) {
    $scope.logout = function() {
        $http({
            method: "GET",
            url: "/regis"
        }).then(function(response) {
            console.log(response);
            $window.location.href = '#!/home';
        });
    }; //end logout
    $scope.show = function() {
        if (vis === true) {
            vis = false;
            return vis;
        } else {
            vis = true;
            return vis;
        }
    };
}]);
