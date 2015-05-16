/// <reference path="../../../typings/geojson/geojson.d.ts" />
declare module app.Services {
    interface IgeoService {
        getCountries(): ng.IPromise<TopoJSON.TopoJSONObject>;
        getGeoJSON(topojsonObjects: any): GeoJSON.FeatureCollection;
        getCountry(countryName: string): ng.IPromise<any>;
        findMe(): ng.IPromise<Position>;
    }
}
