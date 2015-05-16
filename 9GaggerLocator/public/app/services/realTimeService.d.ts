/// <reference path="../../../typings/angularjs/angular.d.ts" />
declare module app.Services {
    interface IrealTimeService {
        emit(event: any, ...args: Array<any>): any;
        on(event: any, callback: any): any;
    }
}
