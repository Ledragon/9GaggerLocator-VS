/// <reference path="../account/userresource.ts" />
module app.Services {
    export interface IauthenticationService {
        login(userName: string, password: string): ng.IPromise<any>;
        logoutUser(): ng.IPromise<any>;
        authorizeCurrentUserForRoute(role: string): any;
        createUser(user: any): ng.IPromise<any>;
    }

    class authenticationService implements IauthenticationService {
        static serviceId: string = 'authenticationService';

        constructor(private $http: ng.IHttpService,
            private $q: ng.IQService,
            private identityService: Services.IidentityService,
            private userResource) {
        }

        login(userName: string, password: string): ng.IPromise<any> {
            var defered = this.$q.defer();
            var body = {
                username: userName,
                password: password
            };
            var self = this;
            this.$http.post('login', body).then(function (response: any) {
                if (response.data.success) {
                    var user = new self.userResource();
                    angular.extend(user, response.data.user);
                    self.identityService.currentUser = user;
                    defered.resolve(true);
                } else {
                    defered.resolve(false);
                }
            },(response) => {
                    defered.reject();
                });
            return defered.promise;
        }

        logoutUser(): ng.IPromise<any> {
            var deferred = this.$q.defer();
            var self = this;
            this.$http.post('/logout', { logout: true }).then(() => {
                self.identityService.currentUser = undefined;
                deferred.resolve();
            });
            return deferred.promise;
        }

        authorizeCurrentUserForRoute(role: string): any {
            if (this.identityService.isAuthorized(role)) {
                return false;
            }
            else {
                return this.$q.reject('Not authorized');
            }
        }

        createUser(user: any): ng.IPromise<any> {
            var deferred = this.$q.defer();
            var userResource = new this.userResource(user);
            var self = this;
            userResource.$save().then(
                (newUser) => {
                    self.identityService.currentUser = newUser;
                    deferred.resolve();
                },
                (response) => {
                    deferred.reject(response.data.reason);
                });
            return deferred.promise;
        }
    }

    var app = angular.module('app');
    app.factory(authenticationService.serviceId, [
        '$http', '$q', 'identityService', 'userResource',
        ($http, $q, identifierService, userResource) =>
            new authenticationService($http, $q, identifierService, userResource)
    ]);
}