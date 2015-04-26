module app.Services {

    export interface IuserService {
        getAll(): ng.IPromise<any>;
        getNumberByCountry(): ng.IPromise<any>;
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

        public getNumberByCountry(): ng.IPromise<any> {
            var defered = this.$q.defer();
            this.getAll().then((users) => {
                var grouped = _.groupBy(users,(u: Models.user) => u.country);
                var result = [];
                for (var key in grouped) {
                    result.push({
                        country: key,
                        count: grouped[key].length
                    });
                }
                defered.resolve(result);
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