angular
  .module("vocabTester")
  .controller("wordsIndexCtrl", wordsIndexCtrl);

wordsIndexCtrl.$inject = [];
function wordsIndexCtrl() {
  const vm = this;

  console.log("LOADED")
}
