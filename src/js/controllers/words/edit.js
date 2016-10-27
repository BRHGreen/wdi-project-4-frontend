angular
  .module("vocabTester")
  .controller("WordEditCtrl", WordEditCtrl);

WordEditCtrl.$inject = ["Word", "$stateParams", "$state", "$http", "API"];
function WordEditCtrl(Word, $stateParams, $state, $http, API){
  const vm = this;

  vm.submit = () => {

    vm.comment.word_id = $stateParams.id;

    console.log(vm.comment);

    $http
    .post(`${API}/comments`, vm.comment)
    .then(data => {
      $state.go("wordsShow", $stateParams);
      console.log('yo');
    });
  };
}
