require('dotenv').config()
const cron = require('node-cron');
const chalk = require('chalk');

// Modules
const ScraperModule = require('./modules/Scraper');
const MailerModule = require('./modules/Mailer');

// Helpers
const createMailTemplate = require('./helpers/createMailTemplate');
const combineFloors = require('./helpers/combineFloorsData');
const compareFloors = require('./helpers/compareFloors');

// Language
const CONFIG = require('./data/config.json');
const LOGS = require('./data/logs.json');
const CONSTANTS = require('./data/constants.json');

// Buildings
const nautiqueLiving = require('./data/buildings/nautique_living.json');
const nautiqueLivingTest = require('./data/buildings/nautique_living_test.json');

//setup
const Mailer = new MailerModule({
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD
});
const scraperNautique = new ScraperModule(CONFIG.DEV_TEST ? nautiqueLivingTest : nautiqueLiving);

let oldFloorsResponse = {};
let newFloorsResponse = {};

function scrapeBuilding() {
    scraperNautique.start().then(response => {
        if (!(CONSTANTS.AVAILABLE_KEY in oldFloorsResponse)) oldFloorsResponse = combineFloors(response);

        newFloorsResponse = combineFloors(response);

        if (compareFloors(oldFloorsResponse, newFloorsResponse)) {
            console.log(chalk.green(LOGS.ROOMS_FOUND));

            Mailer.send({
                addresses: [process.env.EMAIL_USERNAME],
                subject: LOGS.EMAIL_SUBJECT,
                html: createMailTemplate(response)
            });
        } else {
            console.log(chalk.red(LOGS.ROOMS_NOT_FOUND))
        }

        oldFloorsResponse = newFloorsResponse;
    });
}

if (!CONFIG.DEV_TEST) cron.schedule(`*/${CONFIG.INTERVAL_SECONDS} * ${CONFIG.BETWEEN_HOURS} * * ${CONFIG.BETWEEN_DAYS}`, () => scrapeBuilding());
if (CONFIG.DEV_TEST) setInterval(() => scrapeBuilding(), CONFIG.TEST_INTERVAL_SECONDS * 1000);