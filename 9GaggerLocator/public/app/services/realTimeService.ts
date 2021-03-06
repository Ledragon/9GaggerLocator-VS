﻿/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/socket.io-client/socket.io-client.d.ts" />
module app.Services {
    export interface IrealTimeService {
        emit(event, ...args: Array<any>);
        on(event, callback);
    }

    class realTimeService implements IrealTimeService {
        public static serviceId = 'realTimeService';

        private _socket: SocketIOClient.Socket;

        constructor(private identityService: Services.IidentityService) {
            this._socket = io();
        }

        public emit(event, ...args: Array<any>) {
            this._socket.emit(event, this.identityService.currentUser.username, args);
        }

        public on(event, callback) {
            this._socket.on(event, callback);
        }

    }

    angular.module('app').factory(realTimeService.serviceId, [
        'identityService',
        (identityService) => new realTimeService(identityService)
    ]);
}