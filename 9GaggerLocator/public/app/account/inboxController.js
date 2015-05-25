var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var inboxController = (function () {
            function inboxController($scope) {
                this.$scope = $scope;
                this.messageList = [
                    {
                        sender: 'John',
                        title: 'Hello',
                        content: 'This is just a test message. I just want to check if it works.',
                        date: new Date()
                    },
                    {
                        sender: 'John',
                        title: 'Hello',
                        content: 'This is just a test message. I just want to check if it works.',
                        date: new Date()
                    },
                    {
                        sender: 'John',
                        title: 'Hello',
                        content: 'This is just a test message. I just want to check if it works.',
                        date: new Date()
                    },
                    {
                        sender: 'John',
                        title: 'Hello',
                        content: 'This is just a test message. I just want to check if it works.',
                        date: new Date()
                    },
                ];
            }
            inboxController.controllerId = 'inboxController';
            return inboxController;
        })();
        var message = (function () {
            function message() {
            }
            return message;
        })();
        angular.module('app').controller(inboxController.controllerId, [
            '$scope',
            inboxController
        ]);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=inboxController.js.map