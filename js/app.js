var muiApp = angular.module("muiApp",['ngRoute']);
muiApp.run(function($rootScope, $window) {
  $rootScope.$on('$routeChangeSuccess', function () {
    var interval = setInterval(function(){
      if (document.readyState == 'complete') {
        document.getElementsByClassName('mdl-layout__content')[0].scrollTop = 0;
        clearInterval(interval);
      }
    }, 200);
  });
});
muiApp.factory('Databinding', function(){
  var title = 'Muonium : Encrypt your files';
  var bgImage = 'img/bg.jpg';
  return {
    title: function() { return title; },
    setTitle: function(newTitle) { title = 'Muonium : '+newTitle; },
    bgImage: function () { return bgImage; },
    setBgImage : function (img) { bgImage = img; }
  };
});

muiApp.controller("muiCtrl", function ($routeParams, $scope, $http, Databinding) {
  $scope.Databinding = Databinding;
  if(!window.localStorage.getItem('lang')) {
    var lg = navigator.language;
    lg = lg.substr(0,2);
    window.localStorage.setItem('lang', lg);
}
  $scope.lang = window.localStorage.getItem('lang');
  $http.get('translations/website/'+ $scope.lang +'.json').then(function(response) { $scope.txt = response.data; },function errorCallback(response){window.localStorage.setItem("lang", "en");});
  $scope.changeLang = function(newLang){
    window.localStorage.setItem('lang', newLang);
    $scope.lang = window.localStorage.getItem('lang');
    location.reload();
  };
});

muiApp.controller('homeController', function ($routeParams, $scope,$http,Databinding) {
  Databinding.setTitle('Encrypt your files');
  Databinding.setBgImage('img/homeBg.png');
});

muiApp.controller('aboutController', function ($routeParams, $scope,$http,Databinding) {
  Databinding.setTitle('About');
  Databinding.setBgImage('img/aboutBg.png');
});

muiApp.controller('achieveController', function ($routeParams, $scope,$http,Databinding) {
  Databinding.setTitle('Achievement');
  Databinding.setBgImage('img/achieveBg.png');
});

muiApp.controller('donateController', function ($routeParams, $scope,$http,Databinding) {
  Databinding.setTitle('Donate');
  Databinding.setBgImage('img/donateBg.png');
});

muiApp.controller('securityController', function ($routeParams, $scope,$http,Databinding) {
  Databinding.setTitle('Security');
  Databinding.setBgImage('img/securityBg.png');
});

muiApp.controller('helpController', function ($routeParams, $scope,$http,Databinding) {
  Databinding.setTitle('Help');
  Databinding.setBgImage('img/helpBg.png');
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
