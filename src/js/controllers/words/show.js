angular
  .module("vocabTester")
  .controller("WordShowCtrl", WordShowCtrl);

WordShowCtrl.$inject = ["Word", "$stateParams", "$state", "$http"];
function WordShowCtrl(Word, $stateParams, $state, $http){
  const vm = this;

  getWord();

  vm.word = Word.get($stateParams);

  function getWord() {
    Word
      .get($stateParams)
      .$promise
      .then(word => {
        console.log(word);
        return $http
        .get(`http://api.pearson.com/v2/dictionaries/entries/${word.external_id}`)
        .then(function(response){
          vm.wordApi = response.data.result;
          vm.wordApi.did = $stateParams.id;
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
