/// <reference path="../../../typings/angularjs/angular.d.ts" />
module app.Controllers {
    interface IchatController {
        
    }

    interface IchatScope extends ng.IScope {
        
    }

    class ChatController implements IchatController {
        public static controllerId ='ChatController';
        constructor() {
        }
    }

    var app = angular.module('app');
    app.controller(ChatController.controllerId, [ChatController]);

} 