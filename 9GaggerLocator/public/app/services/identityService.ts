module app.Services {
    export interface IidentityService {
        currentUser: any;
        isAuthenticated(): boolean;
        isAuthorized(role: string): boolean;
    }

    class identityService {
        static serviceId = 'identityService';
        currentUser: any;

        constructor() {

        }

        isAuthenticated() {
            return !!this.currentUser;
        }

        isAuthorized(role: string):boolean {
            return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
        }
    }
    var app = angular.module('app');
    app.factory(identityService.serviceId, [() => new identityService()]);
} 