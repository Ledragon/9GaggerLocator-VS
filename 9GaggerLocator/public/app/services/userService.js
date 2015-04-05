(
    function () {
        var app = angular.module('app');
        app.factory('userService', [userService]);

        function userService() {
            function getAll() {
                var users = [];
                for (var i = 0; i < 10; i++) {
                    users.push({
                        userName: 'user' + i,
                        country: 'USA',
                        gender: 'Male',
                        state: 'New-York',
                        city: 'New-York',
                        avatar: 'http://i0.kym-cdn.com/photos/images/facebook/000/150/505/f30fd24c56e1bcfc926883d6a51d5a00.gif'
                    });
                }
                return users;
            }

            return {
                getAll: getAll
            };
        }
    }()
);