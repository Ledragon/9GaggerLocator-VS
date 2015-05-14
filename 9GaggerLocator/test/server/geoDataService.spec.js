var chai = require('chai');
var expect = chai.expect;
var geo = require('../../server/services/geoDataService');
//suite('test', function () {
//    test('test 1', function() {
//        expect(1).to.equal(1);
//    });
//});
describe('chai', function() {
    it('should exist', function() {
        chai.expect(chai).to.be.ok;
    });
    it('should define expect', function() {
        chai.expect(expect).to.be.ok;
    });
});
describe('geo data service', function() {
    it('should exists', function() {
        expect(geo).to.be.ok;
    });
    it('should define getCountries110m', function() {
        expect(geo.getCountries110m).to.be.ok;
    });
    it('should return countries', function(done) {
        geo.getCountries110m(function (error, data) {
            expect(data.length).to.be.above(0);
            done();
        });
    });

    it('should define getClosestCity', function() {
        expect(geo.getClosestCity).to.be.ok;
    });
    it('should return San Fancisco when coordinates are (-122.416667, 37.783333)', function (done) {
        geo.getClosestCity(-122.416667, 37.783333, function (error, data) {
            expect(data.name).to.equal('San Francisco');
            done();
        });
    });
    it('should return Liege when coordinates are (5.65, 50.7)', function (done) {
        geo.getClosestCity(5.65, 50.7, function (error, data) {
            expect(data.name).to.equal('Liege');
            done();
        });
    });
});