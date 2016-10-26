angular
  .module("vocabTester")
  .controller("WordShowCtrl", WordShowCtrl);

WordShowCtrl.$inject = ["Word", "$stateParams", "$state", "$http"];
function WordShowCtrl(Word, $stateParams, $state, $http){
  const vm = this;

  getWord();

  function getWord() {
    Word
      .get($stateParams)
      .$promise
      .then(word => {
        return $http
        .get(`http://api.pearson.com/v2/dictionaries/entries/${word.external_id}`)
        .then(function(response){
          vm.word = response.data.result;
        });
      });
  }

  vm.delete      = () => {
    Word
    .delete($stateParams)
    .$promise
    .then(data => {
      $state.go("wordsIndex");
    });
  };
}
