const cheerio = require('cheerio');

const CONSTANTS = require('../data/constants');

class FloorDataCleaner {
    constructor() {
        this._availableTraget = `${CONSTANTS.HANDLES.CONTAINER} .${CONSTANTS.CLASS_AVAILABLE}`;
        this._reservedTarget = `${CONSTANTS.HANDLES.CONTAINER} .${CONSTANTS.CLASS_RESERVED}`;
        this._rentedTarget = `${CONSTANTS.HANDLES.CONTAINER} .${CONSTANTS.CLASS_RENTED}`;
    }

    clean(floorData, floor) {
        this._$ = cheerio.load(floorData);

        return {
            name: floor.name,
            url: floor.url,
            available: this._getFloorNumbers(this._$(this._availableTraget)),
            reserved: this._getFloorNumbers(this._$(this._reservedTarget)),
            rented: this._getFloorNumbers(this._$(this._rentedTarget))
        }
    }

    _getFloorNumbers(data) {
        if (!data.length >= 1) return [Math.floor(Math.random() * 2) + 1];

        const arr = [];

        data.each((i, elm) => {
            arr.push(Number(this._$(elm).attr('number')));
        });

        return arr
    }
}

module.exports = new FloorDataCleaner();