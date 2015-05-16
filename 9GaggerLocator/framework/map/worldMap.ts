module LeDragon.Framework.Map {
    export class worldMap {
        private _group: D3.Selection;

        constructor(container: string|any) {
            this._group = d3.select(container)
                .append('g')
                .classed('map', true);
        }
    }
}