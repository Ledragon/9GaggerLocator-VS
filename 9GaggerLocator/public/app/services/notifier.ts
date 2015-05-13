/// <reference path="../../../typings/toastr/toastr.d.ts" />
module app.Services {
    export interface InotificationService {
        success(message: string): void;
        debug(message: string): void;
        error(message: string): void;
        warning(message: string): void;
        notificationList(): Array<any>;
    }

    class notificationService implements InotificationService {
        public static serviceId = 'notifierService';
        private _notificationList;

        constructor(private toastr: Toastr) {
            if (!this._notificationList) {
                this._notificationList = [];
            }
        }

        public notificationList() {
            return this._notificationList;
        }

        public debug(message: string): void {
            this.toastr.info(message);
            console.debug(message);
            this.pushNotification('DEBUG', message);
        }

        public success(message: string): void {
            this.toastr.success(message);
            console.log(message);
            this.pushNotification('SUCCESS', message);
        }

        public error(message: string): void {
            this.toastr.error(message);
            console.error(message);
            this.pushNotification('ERROR', message);
        }

        public warning(message: string): void {
            this.toastr.warning(message);
            console.warn(message);
            this.pushNotification('WARNING', message);
        }

        private pushNotification(severity, message) {
            this._notificationList.push({
                time: new Date().toLocaleTimeString(),
                severity: severity,
                message: message
            });
        }

    }

    angular.module('app').value('toastr', toastr);
    angular.module('app').factory(notificationService.serviceId, ['toastr', (toastr) => new notificationService(toastr)]);
}