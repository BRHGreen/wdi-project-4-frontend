angular
  .module("vocabTester")
  .factory("Word", wordFactory);

wordFactory.$inject = ["API", "$resource"];
function wordFactory(API, $resource){
  return $resource(`${API}/words/:id`, { id: "@_id"});
}
