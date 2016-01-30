
module app.Controllers {

    interface IinboxControllerScope extends ng.IScope {
        vm: inboxController;
    }

    interface IinboxController {
        messageList: Array<message>;
    }

    class inboxController implements IinboxController {
        static controllerId = 'inboxController';
        messageList: Array<message>;

        constructor(private $scope: IinboxControllerScope) {
            this.messageList = [
                {
                    sender: 'John',
                    title: 'Hello',
                    content: 'This is just a test message. I just want to check if it works.',
                    date: new Date()
                },{
                    sender: 'John',
                    title: 'Hello',
                    content: 'This is just a test message. I just want to check if it works.',
                    date: new Date()
                },{
                    sender: 'John',
                    title: 'Hello',
                    content: 'This is just a test message. I just want to check if it works.',
                    date: new Date()
                },{
                    sender: 'John',
                    title: 'Hello',
                    content: 'This is just a test message. I just want to check if it works.',
                    date: new Date()
                },
            ];

        }

    }

    class message {
        sender: string;
        title: string;
        content: string;
        date: Date;
    }

    angular.module('app').controller(inboxController.controllerId, [
        '$scope',
        inboxController
    ]);
}