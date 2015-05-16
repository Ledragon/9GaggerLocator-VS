declare module LeDragon.Framework.Map {
    interface IworldMap {
        drawCountries: (countries: TopoJSON.TopoJSONObject) => void;
    }
    class map implements IworldMap {
        private logger;
        private _group;
        private _projection;
        private _pathGenerator;
        private _countries;
        constructor(container: string, logger: Utilities.Ilogger);
        drawCountries(countries: TopoJSON.TopoJSONObject): void;
    }
}
