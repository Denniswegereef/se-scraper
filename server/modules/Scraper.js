const axios = require('axios');
const chalk = require('chalk');

const cleanFloorData = require('../helpers/cleanFloorData');

const LOGS = require('../data/logs.json');

module.exports = class Scraper {
    constructor(building) {
        this._building = building

        this._startScraping();
    }

    async _startScraping() {
        console.log(chalk.bgGreen.black(`${LOGS.START_SCRAPE} ${this._building.name}`));

        const scrapedPagesPromises = await this._building.floors.map(floor => this._scrapePage(floor));
        const scrapedPages = await Promise.all(scrapedPagesPromises);

        const cleanedScrapedPages = scrapedPages.map((floorData, i) => cleanFloorData(floorData.data, this._building.floors[i]));

        console.log(cleanedScrapedPages);
    }

    async _scrapePage(floor) {
        console.log(chalk.magentaBright(`${LOGS.SCRAPE_FLOOR} ${floor.name}`));

        try {
            return axios.get(floor.url);
        }

        catch (e) {
            console.error(chalk.red(e));
        }
    }
}