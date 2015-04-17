/// <reference path="../../../typings/toastr/toastr.d.ts" />
module app.Services {
    export interface InotificationService {
        success(message: string): void;
        debug(message: string): void;
        error(message: string): void;
        warning(message: string): void;
    }

    class notificationService implements InotificationService {
        public static serviceId = 'notifierService';

        constructor(private toastr: Toastr) {

        }

        public debug(message: string): void {
            this.toastr.info(message);
            console.debug(message);
        }

        public success(message: string): void {
            this.toastr.success(message);
            console.log(message);
        }

        public error(message: string): void {
            this.toastr.error(message);
            console.error(message);
        }

        public warning(message: string): void {
            this.toastr.warning(message);
            console.warn(message);
        }

    }

    angular.module('app').value('toastr', toastr);
    angular.module('app').factory(notificationService.serviceId, ['toastr', (toastr) => new notificationService(toastr)]);
}