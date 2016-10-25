angular
  .module("vocabTester")
  .config(Router);

Router.$inject = ["$stateProvider", "$locationProvider", "$urlRouterProvider"];
function Router($stateProvider, $locationProvider, $urlRouterProvider){
  $locationProvider.html5Mode(true);

  $stateProvider
  .state("home", {
    url: "/",
    templateUrl: "/js/views/home.html",
    controller: "homeCtrl as home"
  })
  .state("wordsIndex", {
    url: "/words",
    templateUrl: "/js/views/words/index.html",
    controller: "wordsIndexCtrl as words"
  })
  .state("wordEdit",      {
  url: "/words/edit",
  templateUrl:  "/js/views/words/edit.html",
  controller:   "WordEditCtrl as word",
});

  $urlRouterProvider.otherwise("/");
}
