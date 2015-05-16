/// <reference path="../account/userResource.d.ts" />
declare module app.Services {
    interface IauthenticationService {
        login(userName: string, password: string): ng.IPromise<any>;
        logoutUser(): ng.IPromise<any>;
        authorizeCurrentUserForRoute(role: string): any;
        authorizeAuthenticatedUserForRoute(): any;
        createUser(user: any): ng.IPromise<any>;
    }
}
