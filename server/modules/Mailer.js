const nodemailer = require('nodemailer');
const chalk = require('chalk');

const CONFIG = require('../data/config.json');

module.exports = class Mailer {
    constructor(config = {}) {
        this._username = config.username;
        this._password = config.password;
    }

    send(details = {}) {
        this._mailOptions = {
            from: this._username,
            to: details.addresses,
            subject: details.subject,
            html: details.html
        }

        this._createTransport();
    }

    async _createTransport() {
        this._transport = nodemailer.createTransport({
            service: CONFIG.MAIL_SERVICE,
            auth: {
                user: this._username,
                pass: this._password
            }
        });

        this._sendMail();
    }

    _sendMail() {
        if (!CONFIG.MAILER_ACTIVE) return;

        try {
            this._transport.sendMail(this._mailOptions);
        }

        catch (e) {
            console.error(chalk.red(e));
        }
    }
}

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USERNAME,
//         pass: process.env.EMAIL_PASSWORD
//     }
// });

// const mailOptions = {
//     from: 'denniswegereef@gmail.com',
//     to: 'denniswegereef@gmail.com',
//     subject: 'Test email',
//     html: '<p>Test email</p>'
// };

// transporter.sendMail(mailOptions, (err, info) => {
//     if (err) {
//         console.log(err)
//     }
//     else {
//         console.log(info);
//}
