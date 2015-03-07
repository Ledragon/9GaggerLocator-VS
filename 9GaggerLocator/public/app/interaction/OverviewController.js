(
    function () {
        var app = angular.module('app');
        app.controller('OverviewController', ['userService', OverviewController]);

        function OverviewController(userService) {
            var vm = this;
            vm.users = userService.getAll();
        }
    }()
);