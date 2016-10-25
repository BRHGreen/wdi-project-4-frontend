angular
  .module("vocabTester")
  .controller("WordEditCtrl", WordEditCtrl);

WordEditCtrl.$inject = ["Word", "$stateParams", "$state"];
function WordEditCtrl(Word, $stateParams, $state){
  const vm = this;

  Word.get($stateParams, data => {
    vm.word = data.word;
  });

  vm.submit = () => {
    console.log("vm.word", vm.word);
    Word
      .update($stateParams, { word: vm.word })
      .$promise
      .then(data => {
        $state.go("wordsIndex", $stateParams);
      });
  };
}
