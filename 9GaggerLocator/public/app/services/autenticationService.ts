module app.Services {
    export interface IauthenticationService {
        login(userName: string, password: string): ng.IPromise<any>;
    }

    class authenticationService implements IauthenticationService {
        static serviceId: string = 'authenticationService';

        constructor(private $http: ng.IHttpService,
            private $q: ng.IQService,
            private identityService: Services.IidentityService) {
        }

        login(userName: string, password: string): ng.IPromise<any> {
            var defered = this.$q.defer();
            var body = {
                username: userName,
                password: password
            };
            var self = this;
            this.$http.post('http://localhost:3030/login', body).then(function (response: any) {
                if (response.data.success) {
                    self.identityService.currentUser = response.data.user;
                    defered.resolve(true);
                } else {
                    defered.resolve(false);
                }
            },(response) => {
                    defered.reject();
                });
            return defered.promise;
        }

    }

    var app = angular.module('app');
    app.factory(authenticationService.serviceId, ['$http', '$q', 'identityService', ($http, $q, identifierService) =>
        new authenticationService($http, $q, identifierService)
    ]);
}