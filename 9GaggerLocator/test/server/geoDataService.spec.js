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

    it('should define getCountry', function () {
        expect(geo.getCountry).to.be.ok;
    });

    it('should return one element for belgium', function (done) {
        geo.getCountry('belgium', function (error, data) {
            expect(data.properties.name).to.equal('Belgium');
            done();
        });
    });

    it('should define getStates10m', function () {
        expect(geo.getStates10m).to.be.ok;
    });

    it('should return 101 elements for France', function (done) {
        geo.getStates10m('France', function (error, data) {
            expect(data.length).to.equal(101);
            done();
        });
    });

    it('should return 11 elements for belgium', function (done) {
        geo.getStates10m('belgium', function (error, data) {
            expect(data.length).to.equal(11);
            done();
        });
    });
});