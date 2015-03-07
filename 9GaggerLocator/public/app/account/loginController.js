(
    function () {
        var app = angular.module('app');
        app.controller('LoginController', ['$http', LoginController]);

        function LoginController($http) {
            var vm = this;
            vm.userName = '';
            vm.password = '';
            vm.signin = function (userName, password) {
                console.log('Login with user name ' + vm.userName + ' and password ' + vm.password);
                var body = {
                    username: vm.userName,
                    password: vm.password
                };
                $http.post('/login', body).then(function (response) {
                    console.log(response.data);
                    if (response.data.success) {
                        console.log('logged in!');
                    } else {
                        console.error('failed to log in');
                    }
                });

            };

        }
        
        
    }()
);