/// <reference path="../../../typings/lodash/lodash.d.ts" />
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

    interface IregisterForm extends  ng.IFormController{
        userName:ng.INgModelController;
    }

    class registerController implements IregisterController {
        public static controllerId='RegisterController';
        public userName: string;
        public password: string;
        public firstName: string;
        public lastName: string;
        public country:string;
        public gender:string;
        public registerForm: IregisterForm;
        countries=[];

        constructor(private $scope: ng.IScope,
            private $state: ng.ui.IStateService,
            private authenticationService: Services.IauthenticationService,
            geoService:Services.IgeoService,
            private notifierService: Services.InotificationService) {
            var self = this;
            geoService.getCountries().then((data) => {
                var geoJson = geoService.getGeoJSON(data);
                self.countries = _(geoJson.features).pluck('properties').value();
            }, (reason) => {
                notifierService.error(reason);
            });
        }

        public register(): void {

            var newUser = {
                username: this.userName,
                password: this.password,
                firstName: this.firstName,
                lastName: this.lastName,
                country: this.country,
                gender:this.gender
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
        public userName: string;
        public password: string;
        public firstName: string;
        public lastName: string;
        public confirmPassword: string;
    }

    var app = angular.module('app');
    app.controller(registerController.controllerId,
    [
        '$scope', '$state', 'authenticationService', 'geoService', 'notifierService',
        ($scope, $state, authenticationService, geoService, notifierService) =>
            new registerController($scope, $state, authenticationService, geoService, notifierService)
    ]);
}