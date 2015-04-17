module app.Services {

    export interface IuserService {
        getAll(): ng.IPromise<any>;
    }

    class userService implements IuserService {
        constructor(private $q: ng.IQService, private $http: ng.IHttpService) {

        }

        public getAll(): ng.IPromise<any> {
            var defered = this.$q.defer();
            this.$http.get('/api/userNames')
                .success((data, status) => {
                    defered.resolve(data);
                })
                .error((reason) => {
                    defered.reject(reason);
                });
            return defered.promise;
        }
    }

    var app = angular.module('app');
    app.factory('userService', [
        '$q', '$http',
        ($q, $http) => new userService($q, $http)
    ]);
}