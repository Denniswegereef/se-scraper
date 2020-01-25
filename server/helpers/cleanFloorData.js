const cheerio = require('cheerio');

const CONSTANTS = require('../data/constants');

module.exports = cleanFloorData = floorData => {
    const $ = cheerio.load(floorData);
    // console.log($('#floorplan_polygon_container').html());
    const floorPlan = $(`${CONSTANTS.HANDLES.CONTAINER} .${CONSTANTS.CLASS_RENTED}`);

    console.log('Verhuurde kamers: ' + floorPlan.length);
    return {

    }
}