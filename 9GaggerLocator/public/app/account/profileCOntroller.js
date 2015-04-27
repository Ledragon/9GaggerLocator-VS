var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var profileController = (function () {
            function profileController($scope, identityService) {
                this.$scope = $scope;
                this.identityService = identityService;
                this.user = new app.Models.user();
                this.user.country = identityService.currentUser.country;
                this.user.userName = identityService.currentUser.username;
                this.user.gender = identityService.currentUser.gender;
                this.user.avatar = 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTthKSlaeZZiuBm2Ya43nDi8yKcy_ESbXkAWhK32bDkxGTV9esRdsML8Q';
            }
            profileController.controllerId = 'profileController';
            return profileController;
        })();
        angular.module('app').controller(profileController.controllerId, ['$scope', 'identityService', profileController]);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=profileCOntroller.js.map