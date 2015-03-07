(
    function () {
        var app = angular.module('app');
        app.controller('RegisterController', RegisterController);

        function RegisterController() {
            var vm = this;
            //var vm = {
            //    firstName: firstName,
            //    lastName: lastName,
            //    nickname: nickname,
            //    country: country,
            //    state: state,
            //    city: city
            //};
            vm.userName = 'Le_dragon';
            vm.country = 'United States';
            vm.state = 'New-York';
            vm.city = 'New-York';
            vm.gender = 'Male';
            //$scope.firstName = 'Hugues';
            //$scope.lastName = 'Stefanski';
            //$scope.vm = vm;
        }
    }()
);