/// <reference path="../../../typings/angularjs/angular.d.ts" />
module app.Controllers {
    class message {
        from: any;
        to: any;
        title: string;
        content: string;
        isoDate: string;
    }

    class OverviewController {
        public users: Array<any>;

        private _message: message;
        messageTitle:string;
        messageContent:string;

        constructor(userService: Services.IuserService,
            geoService: Services.IgeoService,
            private identityService: Services.IidentityService,
            private realTimeService:Services.IrealTimeService) {
            var self = this;
            userService.getAll().then((data) => {
                self.users = data;
                self.users.forEach(u => {
                        if (u.country) {
                            geoService.getCountry(u.country).then((country) => {
                                if (country) {
                                    u.countryIsoA2 = country.properties.iso_a2;
                                }
                            });
                        }
                    }
                );
            });
            this.realTimeService.on('message-sent', () => {
                toastr.success('yay');
            });
        }

        public flag(isoA2: string): string {
            if (isoA2) {
                return `flag-icon-${isoA2.toLowerCase() }`;
            }
        }

        public sendTo(user) {
            this._message = new message();
            this._message.from = this.identityService.currentUser;
            this._message.to = user;
        }

        public send() {
            this._message.title = this.messageTitle;
            this._message.content = this.messageContent;
            this.realTimeService.emit('message-sent', this._message);
        }
    }

    var app = angular.module('app');
    app.controller('OverviewController', ['userService', 'geoService', 'identityService','realTimeService',
        OverviewController]);

}