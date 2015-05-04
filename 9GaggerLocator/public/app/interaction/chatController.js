/// <reference path="../../../typings/angularjs/angular.d.ts" />
var app;
(function (_app) {
    var Controllers;
    (function (Controllers) {
        var ChatController = (function () {
            function ChatController() {
            }
            ChatController.controllerId = 'ChatController';
            return ChatController;
        })();
        var app = angular.module('app');
        app.controller(ChatController.controllerId, [ChatController]);
    })(Controllers = _app.Controllers || (_app.Controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=chatController.js.map