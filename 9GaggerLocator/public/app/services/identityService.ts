module app.Services {
    export interface IidentityService {
        currentUser: any;
        isAuthenticated(): boolean;
        isAuthorized(role: string): boolean;
    }

    class identityService {
        public static serviceId = 'identityService';
        public currentUser: any;

        constructor() {

        }

        public isAuthenticated() {
            return !!this.currentUser;
        }

        public isAuthorized(role: string): boolean {
            return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
        }
    }

    var app = angular.module('app');
    app.factory(identityService.serviceId, [() => new identityService()]);
}