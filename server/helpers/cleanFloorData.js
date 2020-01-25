const cheerio = require('cheerio');

const CONSTANTS = require('../data/constants');

module.exports = cleanFloorData = (floorData, floor) => {
    const $ = cheerio.load(floorData);

    return {
        floor: floor.name,
        avaliable: $(`${CONSTANTS.HANDLES.CONTAINER} .${CONSTANTS.CLASS_AVALIABLE}`).length,
        reserved: $(`${CONSTANTS.HANDLES.CONTAINER} .${CONSTANTS.CLASS_RESERVED}`).length,
        rented: $(`${CONSTANTS.HANDLES.CONTAINER} .${CONSTANTS.CLASS_RENTED}`).length,
    }
}