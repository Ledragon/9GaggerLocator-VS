(function () {
    var app = angular.module('app');
    app.factory('d3Service', d3Service);
    function d3Service() {
        var d3 = d3;
        return d3;
    }
}());
