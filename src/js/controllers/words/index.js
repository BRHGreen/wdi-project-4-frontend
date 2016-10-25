angular
  .module("vocabTester")
  .controller("wordsIndexCtrl", wordsIndexCtrl);

wordsIndexCtrl.$inject = ["Word"];
function wordsIndexCtrl(Word) {
  const vm = this;
  vm.words = Word.query();

  vm.submit = () => {
    Word
      .save({
        word: vm.word
      })
      .$promise
      .then(data => {
        vm.words.push(data);
        vm.word = "";
      })

      .catch(console.log);
  };
  
}
