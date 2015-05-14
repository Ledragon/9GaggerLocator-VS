var chai = require('chai');
//var expect = require('chai').expect;
var geo = require('../../server/controllers/geo');
//suite('test', function () {
//    test('test 1', function() {
//        expect(1).to.equal(1);
//    });
//});
describe('chai', function() {
    it('should exist',function() {
        chai.expect(chai).to.be.ok;
    })
});
describe('geo controller', function () {
    it('should exists', function () {
        expect(geo).to.be.ok;
    });
});