(
    function () {
        var app = angular.module('app');
        app.controller('RegisterController', ['$state','authenticationService', 'notifierService', RegisterController]);

        function RegisterController($state, authenticationService, notifierService) {
            //var vm = this;
            //var vm = {
            //    firstName: firstName,
            //    lastName: lastName,
            //    nickname: nickname,
            //    country: country,
            //    state: state,
            //    city: city
            //};
            //vm.userName = 'Le_dragon';
            //vm.country = 'United States';
            //vm.state = 'New-York';
            //vm.city = 'New-York';
            //vm.gender = 'Male';
            //$scope.firstName = 'Hugues';
            //$scope.lastName = 'Stefanski';
            //$scope.vm = vm;
            //vm.register = this.register;
            this.userName = 'test';
            this.register = function () {
                var newUser = {
                    username: this.userName,
                    password: this.password,
                    firstName: this.firstName,
                    lastName: this.lastName

                }
                console.log(newUser);
                authenticationService.createUser(newUser).then(function () {
                    notifierService.success('user created');
                    $state.go('overview');
                }, function (reason) {
                    notifierService.error('User creation failed.');
                });
            }
        }

    }()
);