/// <reference path="../../../typings/angularjs/angular.d.ts" />
var app;
(function (_app) {
    var Controllers;
    (function (Controllers) {
        var ChatController = (function () {
            function ChatController($scope, realTimeService) {
                this.realTimeService = realTimeService;
                var self = this;
                this.chatText = 'Chat text';
                this.realTimeService.on('message', function (userName, message) {
                    self.chatText = self.chatText + '\n' + userName + ': ' + message;
                    $scope.$apply();
                });
            }
            ChatController.prototype.send = function () {
                this.realTimeService.emit('message', this.message);
                this.message = '';
            };
            ChatController.controllerId = 'ChatController';
            return ChatController;
        })();
        var app = angular.module('app');
        app.controller(ChatController.controllerId, ['$scope', 'realTimeService', function ($scope, realTimeService) { return new ChatController($scope, realTimeService); }]);
    })(Controllers = _app.Controllers || (_app.Controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=chatController.js.map