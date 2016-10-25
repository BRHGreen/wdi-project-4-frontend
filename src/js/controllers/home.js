angular
  .module("vocabTester")
  .controller("homeCtrl", homeCtrl);

homeCtrl.$inject = ["User", "CurrentUserService"];
function homeCtrl(User, CurrentUserService) {
  const vm = this;
  vm.login = () => {
    User
      .login(vm.loginUser)
      .$promise
      .then(data => {
        const user = data.user ? data.user : null;
        if (user) {
          CurrentUserService.saveUser(user);
        }
      });
  };

  vm.register = () => {
    User
      .register(vm.registerUser)
      .$promise
      .then(data => {
        const user = data.user ? data.user : null;
        if (user) {
          CurrentUserService.saveUser(user);
        }
      });
  };
}
