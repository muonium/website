var muiApp = angular.module("muiApp",['ngRoute']);

muiApp.factory('Databinding', function(){
    var title = 'Muonium : Encrypt your files';
    var bgImage = 'img/bg.jpg';
    return {
        getTitle: function() { return title; },
        setTitle: function(newTitle) { title = 'Muonium : '+newTitle; }
    };
});

muiApp.controller("muiCtrl", function ($routeParams, $scope, $http, Databinding) {
    $scope.Databinding = Databinding;
    $scope.title = 'home';
    if(!window.localStorage.getItem('lang')) {
        var lg = navigator.language;
        lg = lg.substr(0,2);
        window.localStorage.setItem('lang', lg);
    }
    $scope.lang = window.localStorage.getItem('lang');

    $scope.changeLang = function(newLang){
        window.localStorage.setItem('lang', newLang);
        $scope.lang = window.localStorage.getItem('lang');
        location.reload();
    };

    $http.get('translations/website/'+ $scope.lang +'.json').then(
        function(response) {
            $scope.txt = response.data;
            Databinding.setTitle($scope.txt.global[$scope.title]);
        }
    );
});

muiApp.controller('homeController', function ($routeParams, $scope,$http,Databinding) {
    $scope.title = 'home';
    if(typeof $scope.txt !== 'undefined') Databinding.setTitle($scope.txt.global[$scope.title]);
});

muiApp.controller('aboutController', function ($routeParams, $scope,$http,Databinding) {
    $scope.title = 'about';
    if(typeof $scope.txt !== 'undefined') Databinding.setTitle($scope.txt.global[$scope.title]);
});

muiApp.controller('achieveController', function ($routeParams, $scope,$http,Databinding) {
    $scope.title = 'adventure';
    if(typeof $scope.txt !== 'undefined') Databinding.setTitle($scope.txt.global[$scope.title]);
});

muiApp.controller('donateController', function ($routeParams, $scope,$http,Databinding) {
    $scope.title = 'donate';
    if(typeof $scope.txt !== 'undefined') Databinding.setTitle($scope.txt.global[$scope.title]);
});

muiApp.controller('securityController', function ($routeParams, $scope,$http,Databinding) {
    $scope.title = 'security';
    if(typeof $scope.txt !== 'undefined') Databinding.setTitle($scope.txt.global[$scope.title]);
});

muiApp.controller('helpController', function ($routeParams, $scope,$http,Databinding) {
    $scope.title = 'help';
    if(typeof $scope.txt !== 'undefined') Databinding.setTitle($scope.txt.global[$scope.title]);
});

muiApp.config(['$locationProvider', '$routeProvider', function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.
    when('/',{
        templateUrl: function(){
            return 'pages/home.html';
        },
        controller: "homeController"
    }).
    when('/about',{
        templateUrl: "pages/about.html",
        controller: "aboutController"
    }).
    when('/achievement',{
        templateUrl: "pages/achieve.html",
        controller: "achieveController"
    }).
    when('/donate',{
        templateUrl: "pages/donate.html",
        controller: "donateController"
    }).
    when('/security',{
        templateUrl: "pages/security.html",
        controller: "securityController"
    }).
    when('/help',{
        templateUrl: "pages/help.html",
        controller: "helpController"
    }).
    otherwise({redirectTo: '/'});
}
]);

muiApp.directive('menuClose', function() {
    return {
        restrict: 'AC',
        link: function($scope, $element) {
            $element.bind('click', function() {
                angular.element(document.querySelector('.mdl-layout__drawer')).removeClass('is-visible');
                angular.element(document.querySelector('.mdl-layout__obfuscator')).removeClass('is-visible');
            });
        }
    };
});

muiApp.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});
