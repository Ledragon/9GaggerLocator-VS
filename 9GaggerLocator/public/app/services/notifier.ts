/// <reference path="../../../typings/toastr/toastr.d.ts" />
module app.Services {
    export interface InotificationSrvice {
        success(message: string): void;
        debug(message: string): void;
        error(message: string): void;
        warning(message: string): void;
    }

    class notificationService implements InotificationSrvice {

        static serviceId = 'notifierService';
        constructor(private toastr: Toastr) {

        }

        debug(message: string): void {
            this.toastr.info(message);
            console.debug(message);
        }

        success(message: string): void {
            this.toastr.success(message);
            console.log(message);
        }

        error(message: string): void {
            this.toastr.error(message);
            console.error(message);
        }

        warning(message: string): void {
            this.toastr.warning(message);
            console.warn(message);
        }

    }

    angular.module('app').value('toastr', toastr);
    angular.module('app').factory(notificationService.serviceId, ['toastr', (toastr) =>         new notificationService(toastr)]);
} 