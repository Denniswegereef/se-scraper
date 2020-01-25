const axios = require('axios');
const cheerio = require('cheerio');
const chalk = require('chalk');

const Scraper = require('./modules/Scraper');

// Buildings
const nautiqueLiving = require('./data/buildings/nautique-living.json');

const scrapeCycle = new Scraper(nautiqueLiving);