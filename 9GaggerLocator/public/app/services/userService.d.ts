declare module app.Services {
    interface IuserService {
        getAll(): ng.IPromise<any>;
        getNumberByCountry(): ng.IPromise<any>;
    }
}
