/// <reference path="../../../typings/toastr/toastr.d.ts" />
declare module app.Services {
    interface InotificationService {
        success(message: string): void;
        debug(message: string): void;
        error(message: string): void;
        warning(message: string): void;
        notificationList(): Array<any>;
    }
}
