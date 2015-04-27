module app.Controllers {
    interface IprofileControllerScope extends ng.IScope {
        vm: profileController;
    }

    interface IprofileController {
        user:any;
    }

    class profileController implements IprofileController {
        public static controllerId = 'profileController';
        user: Models.user;

        constructor(private $scope: IprofileControllerScope, private identityService: Services.IidentityService) {
            this.user = new Models.user();
            this.user.country = identityService.currentUser.country;
            this.user.userName = identityService.currentUser.username;
            this.user.gender = identityService.currentUser.gender;
            this.user.avatar = 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTthKSlaeZZiuBm2Ya43nDi8yKcy_ESbXkAWhK32bDkxGTV9esRdsML8Q';
        }

    }

    angular.module('app').controller(profileController.controllerId, ['$scope', 'identityService', profileController]);

}