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
        users: Array<any>;

        private _message: message;
        messageTitle: string;
        messageContent: string;
        position: any;

        constructor(userService: Services.IuserService,
            private geoService: Services.IgeoService,
            private identityService: Services.IidentityService,
            private realTimeService: Services.IrealTimeService,
            private notifierService: Services.InotificationService) {
            var self = this;
            userService.getAll().then((data: any) => {
                self.users = data;
                self.users.forEach(u => {
                        if (u.country) {
                            geoService.getCountry(u.country).then((country: any) => {
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

        flag(isoA2: string): string {
            if (isoA2) {
                return `flag-icon-${isoA2.toLowerCase() }`;
            }
        }

        sendTo(user: any) {
            this._message = new message();
            this._message.from = this.identityService.currentUser;
            this._message.to = user;
        }

        send() {
            this._message.title = this.messageTitle;
            this._message.content = this.messageContent;
            this.realTimeService.emit('message-sent', this._message);
        }

        nearMe() {
            this.position = {
                coords: {
                    longitude:this.identityService.currentUser.longitude,
                    latitude:this.identityService.currentUser.latitude
                }
            }
            //this.identityService.currentUser
            //this.geoService.findMe().then((position) => {
            //    this.position = position;
            //}, (reason: any) => {
            //    this.notifierService.error(reason);
            //});
        }
        sameCountry(user:any) {
            return user.country === this.identityService.currentUser.country;
        }
    }

    angular.module('app')
        .controller('OverviewController', [
            'userService', 'geoService', 'identityService', 'realTimeService', 'notifierService',
            OverviewController
        ]);

}