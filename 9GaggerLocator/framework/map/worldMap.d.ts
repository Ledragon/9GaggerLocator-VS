declare module LeDragon.Framework.Map {
    interface IworldMap {
        drawCountries: (countries: TopoJSON.TopoJSONObject) => void;
        addPosition: (longitude: number, latitude: number, color?: string) => void;
    }
    class map implements IworldMap {
        private logger;
        private _group;
        private _countriesGroup;
        private _positionsGroup;
        private _projection;
        private _pathGenerator;
        private _countries;
        private _geoCountries;
        private _positions;
        constructor(container: string, logger: Utilities.Ilogger);
        drawCountries(countries: TopoJSON.TopoJSONObject): void;
        addPosition(longitude: number, latitude: number, color?: string): void;
        centerOnPosition(longitude: number, latitude: number): void;
        private handle(method, message);
    }
}
