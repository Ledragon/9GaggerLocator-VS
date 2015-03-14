module app.Services {
    export interface IidentityService {
        currentUser: any;
        isAuthenticated(): boolean;
    }

    class identityService {
        static serviceId = 'identityService';
        currentUser: any;

        constructor() {

        }

        isAuthenticated() {
            return !!this.currentUser;
        }
    }
    var app = angular.module('app');
    app.factory(identityService.serviceId, [() => new identityService()]);
} 