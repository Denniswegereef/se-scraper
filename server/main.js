const cron = require('node-cron');
const chalk = require('chalk');

const Scraper = require('./modules/Scraper');

const createTimeStamp = require('./helpers/createTimeStamp');

// Buildings
const nautiqueLiving = require('./data/buildings/nautique_living.json');
const CONFIG = require('./data/config.json');

// const scrapeCycle = new Scraper(nautiqueLiving);
// */1 10-12 * * Mon-Fri

cron.schedule('*/10 * 19-20 * * Sat', () => {
    console.log(chalk.magentaBright(createTimeStamp()));
});

// cron.schedule(`*/${INTERVAL_SECONDS} * ${CONFIG.BETWEEN_HOURS} * * ${CONFIG.BETWEEN_DAYS}`, () => {
//     console.log(chalk.magentaBright(createTimeStamp()));
// });