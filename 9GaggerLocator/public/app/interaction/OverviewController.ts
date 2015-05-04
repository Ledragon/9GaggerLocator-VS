/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/socket.io-client/socket.io-client.d.ts" />
module app.Controllers {

    class OverviewController {
        public users: Array<any>;
        private _socket:SocketIOClient.Socket;

        constructor(userService: Services.IuserService, geoService: Services.IgeoService) {
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

            this._socket = io.connect('http://localhost:3000');
        }

        public flag(isoA2: string): string {
            if (isoA2) {
                return `flag-icon-${isoA2.toLowerCase() }`;
            }
        }

        public sendMessage() {
            var message = 'a message has been sent';
            console.log(message);
        }
    }

    var app = angular.module('app');
    app.controller('OverviewController', ['userService', 'geoService', OverviewController]);

}