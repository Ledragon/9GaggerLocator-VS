/// <reference path="../../../typings/lodash/lodash.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts" />
module app.Controllers {
    interface IregisterController {
        userName: string;
        password: string;
        firstName: string;
        lastName: string;
        registerForm: ng.IFormController;

        register(): void;
    }

    interface IregisterForm extends ng.IFormController {
        userName: ng.INgModelController;
    }

    class registerController implements IregisterController {
        static controllerId='RegisterController';
        userName: string;
        password: string;
        firstName: string;
        lastName: string;
        country: string;
        gender: string;
        registerForm: IregisterForm;
        longitude: number;
        latitude:number;
        countries=<Array<any>>[];

        constructor(private $scope: ng.IScope,
            private $state: ng.ui.IStateService,
            private authenticationService: Services.IauthenticationService,
            geoService: Services.IgeoService,
            private notifierService: Services.InotificationService) {
            var self = this;
            geoService.getCountries().then((data) => {
                var geoJson = geoService.getGeoJSON(data);
                self.countries = _(geoJson.features).pluck('properties').value();
            }, (reason: any) => {
                notifierService.error(reason);
            });
            geoService.findMe().then((position) => {
                self.longitude = position.coords.longitude;
                self.latitude = position.coords.latitude;
            });
        }

        register(): void {

            var newUser = {
                username: this.userName,
                password: this.password,
                firstName: this.firstName,
                lastName: this.lastName,
                country: this.country,
                gender: this.gender,
                latitude: this.latitude,
                longitude:this.longitude
            };

            console.log(newUser);
            var self = this;
            this.authenticationService.createUser(newUser)
                .then(() => {
                    this.notifierService.success('user created');
                    this.$state.go('overview');
                }, (reason: string) => {
                    var message: string;
                    if (reason.indexOf('E11000') > -1) {
                        message = 'This user name already exists.';
                        self.registerForm.userName.$setValidity('User name already exists', false);
                        //TODO make name field invalid
                    } else {
                        message = 'User creation failed.';
                    }
                    self.notifierService.error(message);
                });
        }
    }

    class userViewModel {
        userName: string;
        password: string;
        firstName: string;
        lastName: string;
        confirmPassword: string;
    }

    var app = angular.module('app');
    app.controller(registerController.controllerId,
    [
        '$scope', '$state', 'authenticationService', 'geoService', 'notifierService',
        ($scope: any, $state: any, authenticationService: any, geoService: any, notifierService: any) =>
        new registerController($scope, $state, authenticationService, geoService, notifierService)
    ]);
}