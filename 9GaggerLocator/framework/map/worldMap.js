var LeDragon;
(function (LeDragon) {
    var Framework;
    (function (Framework) {
        var Map;
        (function (Map) {
            var map = (function () {
                function map(container, logger) {
                    this.logger = logger;
                    try {
                        var c = d3.select("#" + container);
                        this._group = c
                            .append('g')
                            .classed('map', true);
                        var width = parseFloat(c.style('width'));
                        var height = parseFloat(c.style('height'));
                        this._projection = d3.geo.mercator()
                            .center([0, 0])
                            .translate([width / 2, height / 2])
                            .scale(width / 8);
                        this._pathGenerator = d3.geo.path().projection(this._projection);
                    }
                    catch (e) {
                        logger.errorFormat(e);
                    }
                }
                map.prototype.drawCountries = function (countries) {
                    var _this = this;
                    try {
                        this.logger.debugFormat('Drawing map.');
                        this._countries = countries;
                        var geo = topojson.feature(countries, countries.objects.countries);
                        this._group
                            .selectAll('path')
                            .data(geo.features)
                            .enter()
                            .append('g')
                            .classed('country', true)
                            .attr('id', function (d, i) { return d.properties.adm0_a3; })
                            .append('path')
                            .attr('d', function (d, i) { return _this._pathGenerator(d); })
                            .classed('normal', true);
                        this.logger.debugFormat('Map drawn.');
                    }
                    catch (e) {
                        this.logger.errorFormat('Error while drawing map.');
                        this.logger.errorFormat(e.message);
                        this.logger.errorFormat(e.stack);
                    }
                };
                return map;
            })();
            Map.map = map;
        })(Map = Framework.Map || (Framework.Map = {}));
    })(Framework = LeDragon.Framework || (LeDragon.Framework = {}));
})(LeDragon || (LeDragon = {}));
//# sourceMappingURL=worldMap.js.map