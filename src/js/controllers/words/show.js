angular
  .module("vocabTester")
  .controller("WordShowCtrl", WordShowCtrl);

WordShowCtrl.$inject = ["Word", "$stateParams", "$state"];
function WordShowCtrl(Word, $stateParams, $state){
  const vm = this;

  vm.word = Word.get($stateParams);

  vm.delete      = () => {
    Word
    .delete($stateParams)
    .$promise
    .then(data => {
      $state.go("wordsIndex");
    });
  };
}
