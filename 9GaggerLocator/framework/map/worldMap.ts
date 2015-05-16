module LeDragon.Framework.Map {
    export interface IworldMap {
        drawCountries: (countries: TopoJSON.TopoJSONObject) => void;
    }

    export class map implements IworldMap {
        private _group: D3.Selection;
        private _projection: D3.Geo.Projection;
        private _pathGenerator: D3.Geo.Path;
        private _countries: TopoJSON.TopoJSONObject;

        constructor(container: string, private logger: Utilities.Ilogger) {
            try {
                var c = d3.select(`#${container}`);
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
                //d3.select(window).on('resize', (e:any) => {
                //    logger.debugFormat('resize');
                //    var w = parseFloat(c.style('width'));
                //    var h = parseFloat(c.style('height'));

                //    this._projection = d3.geo.mercator()
                //        .translate([w / 2, h / 2])
                //        .scale(w / 8);
                //    this._group
                //        .selectAll('.country')
                //        .selectAll('path')
                //        .attr('d', (d: any, i: any) => this._pathGenerator(d));
                //});
            } catch (e) {
                logger.errorFormat(e);
            }
        }

        drawCountries(countries: TopoJSON.TopoJSONObject): void {
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
                    .attr('id', (d: any, i: any) => d.properties.adm0_a3)
                    .append('path')
                    .attr('d', (d: any, i: any) => this._pathGenerator(d))
                    .classed('normal', true);
                this.logger.debugFormat('Map drawn.');
            } catch (e) {
                this.logger.errorFormat('Error while drawing map.');
                this.logger.errorFormat(e.message);
                this.logger.errorFormat(e.stack);
            }
        }

        //updateMap(width: number, height: number) {
        //    this._projection = d3.geo.mercator()
        //        .translate([width / 2, height / 2])
        //        .scale(width / 8);
        //    this._group
        //        .selectAll('.country')
        //        .selectAll('path')
        //        .attr('d', (d: any, i: any) => this._pathGenerator(d));
        //}
    }
}