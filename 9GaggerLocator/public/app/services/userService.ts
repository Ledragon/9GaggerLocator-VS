/// <reference path="../../../typings/angularjs/angular.d.ts" />
module app.Services {

    export interface IuserService {
        getAll(): ng.IPromise<any>;
        getNumberByCountry(): ng.IPromise<any>;
    }

    class userService implements IuserService {
        constructor(private $q: ng.IQService, private $http: ng.IHttpService) {

        }

        getAll(): ng.IPromise<any> {
            var defered = this.$q.defer();
            this.$http.get('/api/userNames')
                .success((data: any, status: any) => {
                    defered.resolve(data);
                })
                .error((reason: any) => {
                    defered.reject(reason);
                });
            return defered.promise;
        }

        getNumberByCountry(): ng.IPromise<any> {
            var defered = this.$q.defer();
            this.getAll().then((users: any) => {
                var grouped = _.groupBy(users, (u: Models.user) => u.country);
                var result = <Array<any>>[];
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

    var app = angular.module('app').factory('userService', [
        '$q', '$http',
        ($q: any, $http: any) => new userService($q, $http)
    ]);
}