const cheerio = require('cheerio');

const CONSTANTS = require('../data/constants');

module.exports = cleanFloorData = (floorData, floor) => {
    const $ = cheerio.load(floorData);

    return {
        floor: floor.name,
        available: $(`${CONSTANTS.HANDLES.CONTAINER} .${CONSTANTS.CLASS_AVAILABLE}`).length,
        reserved: $(`${CONSTANTS.HANDLES.CONTAINER} .${CONSTANTS.CLASS_RESERVED}`).length,
        rented: $(`${CONSTANTS.HANDLES.CONTAINER} .${CONSTANTS.CLASS_RENTED}`).length,
    }
}