angular
  .module("vocabTester")
  .controller("WordEditCtrl", WordEditCtrl);

WordEditCtrl.$inject = ["Word", "$stateParams", "$state"];
function WordEditCtrl(Word, $stateParams, $state){
  const vm = this;

  Word.get($stateParams, data => {
    vm.word = data.word;
    console.log(data);
  });

  vm.submit = () => {
    console.log("vm.word", vm.word, word);
    Word
      .update($stateParams, { word: vm.word })
      .$promise
      .then(data => {
        $state.go("wordShow", $stateParams);
      });
  };
}
