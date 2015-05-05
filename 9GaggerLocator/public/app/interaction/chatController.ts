/// <reference path="../../../typings/angularjs/angular.d.ts" />
module app.Controllers {
    interface IchatController {
        chatText: string;
        message: string;
        send(): void;
    }

    interface IchatScope extends ng.IScope {

    }

    class ChatController implements IchatController {
        public static controllerId = 'ChatController';
        public message: string;
        public chatText: string;

        constructor($scope: ng.IScope, private realTimeService: Services.IrealTimeService) {
            var self = this;
            this.chatText = 'Chat text';
            this.realTimeService.on('message', (userName, message) => {
                self.chatText = self.chatText + '\n' + userName + ': ' + message;
                $scope.$apply();
            });
        }

        public send(): void {
            this.realTimeService.emit('message', this.message);
            this.message = '';
        }
    }

    var app = angular.module('app');
    app.controller(ChatController.controllerId, ['$scope', 'realTimeService', ($scope, realTimeService) => new ChatController($scope, realTimeService)]);

}