angular
  .module("vocabTester")
  .controller("wordsIndexCtrl", wordsIndexCtrl);

wordsIndexCtrl.$inject = ["Word", "$stateParams", "$state", "$http"];
function wordsIndexCtrl(Word, $stateParams, $state, $http) {
  const vm            = this;
  vm.words            = Word.query();

  vm.searchDictionary = searchDictionary;
  vm.chooseWord       = chooseWord;

  function chooseWord($item, $model, $label){
    vm.word = $item.result;
  }

  function searchDictionary(val) {
    return $http.get(`http://api.pearson.com/v2/dictionaries/laad3/entries?headword=${val}`).then(function(response){
      return response.data.results.map(function(result){
        return {
          label: `${result.headword} (${result.part_of_speech})`,
          result: result
        };
      });
    });

  }

  vm.submit = () => {
    var word = {
      headword: vm.word.headword,
      external_id: vm.word.id,
      part_of_speech: vm.word.part_of_speech,
      definition: vm.word.senses[0].definition
    };

    Word
      .save({
        word: word
      })
      .$promise
      .then(data => {
        vm.words.push(data);
        vm.word = "";
      });
  };

}
