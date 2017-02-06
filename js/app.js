var muiApp = angular.module("muiApp",['ngRoute']);
muiApp.factory('Databinding', function(){
  var title = ' Encrypt your files';
  var bgImage = 'img/bg.jpg';
  return {
    title: function() { return title; },
    setTitle: function(newTitle) { title = newTitle; },
    bgImage: function () { return bgImage; },
    setBgImage : function (img) { bgImage = img; }
  };
});
muiApp.controller("muiCtrl", function ($routeParams, $scope, Databinding) {
  $scope.Databinding = Databinding;
  if(window.localStorage.getItem('lang')){

  }else{
      window.localStorage.setItem('lang', 'en');
  }
  $scope.langs = ['en','fr','ru'];
  $scope.lang = window.localStorage.getItem('lang');
  $scope.changeLang = function(newLang){
    window.localStorage.setItem('lang', newLang);
    $scope.lang = window.localStorage.getItem('lang');
    location.reload();
  };
});
muiApp.controller('homeController', function ($routeParams, $scope,$http,Databinding) {
  Databinding.setTitle('Encrypt your files');
  Databinding.setBgImage('img/bg.jpg');
});
muiApp.controller('aboutController', function ($routeParams, $scope,$http,Databinding) {
  Databinding.setTitle('About');
  Databinding.setBgImage('img/bg.jpg');
});
muiApp.controller('achieveController', function ($routeParams, $scope,$http,Databinding) {
  Databinding.setTitle('Achievement');
  Databinding.setBgImage('img/bg.jpg');
});
muiApp.controller('donateController', function ($routeParams, $scope,$http,Databinding) {
  Databinding.setTitle('Donate');
  Databinding.setBgImage('img/bg.jpg');
});
muiApp.controller('securityController', function ($routeParams, $scope,$http,Databinding) {
  Databinding.setTitle('Security');
  Databinding.setBgImage('img/bg.jpg');
});
muiApp.controller('helpController', function ($routeParams, $scope,$http,Databinding) {
  Databinding.setTitle('Help');
  Databinding.setBgImage('img/bg.jpg');
});
muiApp.config(['$locationProvider', '$routeProvider', function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.
      when('/',{
        templateUrl: function(){
          return 'pages/'+window.localStorage.getItem('lang')+'/home.html';
        },
        controller: "homeController"
      }).
      when('/about',{
        templateUrl: "pages/en/about.html",
        controller: "aboutController"
      }).
      when('/achievement',{
        templateUrl: "pages/en/achieve.html",
        controller: "achieveController"
      }).
      when('/donate',{
        templateUrl: "pages/en/donate.html",
        controller: "donateController"
      }).
      when('/security',{
        templateUrl: "pages/en/security.html",
        controller: "securityController"
      }).
      when('/help',{
        templateUrl: "pages/en/help.html",
        controller: "helpController"
      }).
      otherwise({redirectTo: '/'});
  }
]);
