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

const scraperNautique = new ScraperModule(nautiqueLivingTest);

scraperNautique.start().then(response => {
    const testObject = {
        name: 'Dennis Wegereef',
        timestamp: createTimeStamp(),
        buildingName: nautiqueLiving.name,
        floors: response
    }

    response.map(floor => {
        return {}
    })


    console.log(response)



    console.log(createMailTemplate(testObject));
});


// const Mailer = new MailerModule({
//     username: process.env.EMAIL_USERNAME,
//     password: process.env.EMAIL_PASSWORD
// });

// Mailer.send({
//     addresses: [process.env.EMAIL_USERNAME],
//     subject: LOGS.EMAIL_SUBJECT,
//     html: createMailTemplate(markup)
// });


// const scrapeCycle = new Scraper(nautiqueLiving);
// */1 10-12 * * Mon-Fri

// });

// cron.schedule('*/10 * 16-20 * * Sun', () => {
//     console.log(chalk.magentaBright(createTimeStamp()));
// });

// cron.schedule(`*/${INTERVAL_SECONDS} * ${CONFIG.BETWEEN_HOURS} * * ${CONFIG.BETWEEN_DAYS}`, () => {
//     console.log(chalk.magentaBright(createTimeStamp()));
// });