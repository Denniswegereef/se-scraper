require('dotenv').config()
const cron = require('node-cron');
const chalk = require('chalk');

// Modules
const ScraperModule = require('./modules/Scraper');
const MailerModule = require('./modules/Mailer');

// Helpers
const createTimeStamp = require('./helpers/createTimeStamp');
const createMailTemplate = require('./helpers/createMailTemplate');
const combineFloors = require('./helpers/combineFloorsData');
const compareFloors = require('./helpers/compareFloors');

// Language
const CONFIG = require('./data/config.json');
const LOGS = require('./data/logs.json');

// Buildings
const nautiqueLiving = require('./data/buildings/nautique_living.json');
const nautiqueLivingTest = require('./data/buildings/nautique_living_test.json');

const scraperNautique = new ScraperModule(nautiqueLivingTest);
const Mailer = new MailerModule({
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD
});

let oldFloorsResponse = {};
let newFloorsResponse = {};

cron.schedule(`*/${CONFIG.INTERVAL_SECONDS} * ${CONFIG.BETWEEN_HOURS} * * ${CONFIG.BETWEEN_DAYS}`, () => {
    console.log(chalk.magentaBright(createTimeStamp()));

    scraperNautique.start().then(response => {
        if (!("available" in oldFloorsResponse)) oldFloorsResponse = combineFloors(response);

        newFloorsResponse = combineFloors(response);

        console.log(`New avaliable rooms: ${newFloorsResponse.available}`)
        console.log(`Old avaliable rooms: ${oldFloorsResponse.available}`)

        if (compareFloors(oldFloorsResponse, newFloorsResponse)) {
            console.log('Available found');

            Mailer.send({
                addresses: [process.env.EMAIL_USERNAME],
                subject: LOGS.EMAIL_SUBJECT,
                html: createMailTemplate(response)
            });
        }

        oldFloorsResponse = newFloorsResponse;
    });
});

setInterval(() => {
    console.log(chalk.magentaBright(createTimeStamp()));

    scraperNautique.start().then(response => {
        if (!("available" in oldFloorsResponse)) oldFloorsResponse = combineFloors(response);

        newFloorsResponse = combineFloors(response);

        console.log(`New avaliable rooms: ${newFloorsResponse.available}`)
        console.log(`Old avaliable rooms: ${oldFloorsResponse.available}`)

        if (compareFloors(oldFloorsResponse, newFloorsResponse)) {
            console.log('Available room found');

            Mailer.send({
                addresses: [process.env.EMAIL_USERNAME],
                subject: LOGS.EMAIL_SUBJECT,
                html: createMailTemplate(response)
            });
        }

        oldFloorsResponse = newFloorsResponse;
    });
}, 5000);