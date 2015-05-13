/// <reference path="../../../typings/angularjs/angular.d.ts" />
var app;
(function (_app) {
    var Controllers;
    (function (Controllers) {
        var chatController = (function () {
            function chatController($scope, realTimeService) {
                this.realTimeService = realTimeService;
                var self = this;
                this.chatText = 'Chat text';
                this.realTimeService.on('message', function (userName, message) {
                    self.chatText = self.chatText + '\n' + userName + ': ' + message;
                    $scope.$apply();
                });
            }
            chatController.prototype.send = function () {
                this.realTimeService.emit('message', this.message);
                this.message = '';
            };
            chatController.controllerId = 'chatController';
            return chatController;
        })();
        var app = angular.module('app');
        app.controller(chatController.controllerId, ['$scope', 'realTimeService', function ($scope, realTimeService) { return new chatController($scope, realTimeService); }]);
    })(Controllers = _app.Controllers || (_app.Controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=chatController.js.map