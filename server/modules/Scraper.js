const axios = require('axios');
const chalk = require('chalk');

const FloorDataCleaner = require('../helpers/FloorDataCleaner');
const createTimeStamp = require('../helpers/createTimeStamp');

const LOGS = require('../data/logs.json');

module.exports = class Scraper {
    constructor(building) {
        this._building = building
    }

    async start() {
        console.log(`${LOGS.START_FETCHCING} ${chalk.green(createTimeStamp())}`);

        const scrapedData = await this._startScraping();
        return scrapedData
    }

    async _startScraping() {
        console.log(chalk.bgGreen.black(`${LOGS.START_SCRAPE} ${this._building.name}`));

        const scrapedPagesPromises = await this._building.floors.map(floor => this._scrapePage(floor));
        const scrapedPages = await Promise.all(scrapedPagesPromises);

        return {
            name: this._building,
            timestamp: createTimeStamp(),
            floors: scrapedPages.map((floorData, i) => FloorDataCleaner.clean(floorData.data, this._building.floors[i]))
        }
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