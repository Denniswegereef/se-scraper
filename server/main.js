require('dotenv').config()

const cron = require('node-cron');
const chalk = require('chalk');

const ScraperModule = require('./modules/Scraper');
const MailerModule = require('./modules/Mailer');

const createTimeStamp = require('./helpers/createTimeStamp');
const createMailTemplate = require('./helpers/createMailTemplate');

// Buildings
const nautiqueLiving = require('./data/buildings/nautique_living.json');
const nautiqueLivingTest = require('./data/buildings/nautique_living_test.json');
const CONFIG = require('./data/config.json');
const LOGS = require('./data/logs.json');

const markup = {
    name: 'Dennis Wegereef',
    timestamp: 'vandaag 26-jan',
    buildingName: 'Nautique living',
    floors: [
        {
            name: 'First floor',
            link: 'www.google.nl',
            available: [3, 8],
            reserved: [4, 9],
            rented: [23, 23, 54, 65]
        },
        {
            name: 'Second floor',
            link: 'www.test.nl',
            available: [239, 328],
            reserved: [44, 9, 4],
            rented: [233, 243, 254, 465]
        },
        {
            name: 'Second floor',
            link: 'www.test.nl',
            available: [],
            reserved: [44, 9, 4],
            rented: [233, 243, 254, 465]
        }
    ]
}

const Mailer = new MailerModule({
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD
});

Mailer.send({
    addresses: [process.env.EMAIL_USERNAME],
    subject: LOGS.EMAIL_SUBJECT,
    html: createMailTemplate(markup)
});


// const scrapeCycle = new Scraper(nautiqueLiving);
// */1 10-12 * * Mon-Fri

// });

// cron.schedule('*/10 * 16-20 * * Sun', () => {
//     console.log(chalk.magentaBright(createTimeStamp()));
// });

// cron.schedule(`*/${INTERVAL_SECONDS} * ${CONFIG.BETWEEN_HOURS} * * ${CONFIG.BETWEEN_DAYS}`, () => {
//     console.log(chalk.magentaBright(createTimeStamp()));
// });