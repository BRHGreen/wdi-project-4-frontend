angular
  .module('vocabTester', []);

angular
  .module('vocabTester')
  .controller('HomeCtrl', HomeCtrl);


function HomeCtrl(){

  const vm   = this;

  vm.test   = "yo. this is well articulate.";
}
