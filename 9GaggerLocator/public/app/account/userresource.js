angular.module('app').factory('userResource', ['$resource', function ($resource) {
    var userResource = $resource('/api/users/:id', { _id: '@id' });
    userResource.prototype.isAdmin = function () {
        return this.roles && this.roles.indexOf('admin') > -1;
    };
    return userResource;
}]);
//# sourceMappingURL=userResource.js.map