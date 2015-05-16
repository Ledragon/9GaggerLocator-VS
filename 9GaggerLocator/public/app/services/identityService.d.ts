declare module app.Services {
    interface IidentityService {
        currentUser: any;
        isAuthenticated(): boolean;
        isAuthorized(role: string): boolean;
    }
}
