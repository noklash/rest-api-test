// const nodemailer = require("nodemailer")
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// Set up OAuth2 client

const dotenv = require('dotenv').config()

// const oauth2Client = new google.auth.OAuth2(
//     process.env.CLIENT_ID,
//     // 'YOUR_CLIENT_SECRET',
//     process.env.CLIENT_SECRET
// );


module.exports.sendingMail = async({from, to, subject, text }) => {
    
    try {
        let mailOptions = ({
            from,
            to,
            subject,
            text
        })

        const Transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: 'OAuth2',
                user: 'njokugoodluck2k@gmail.com',
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                // refreshToken: 'YOUR_REFRESH_TOKEN',
                // accessToken: 'YOUR_ACCESS_TOKEN', // optional, leave undefined for auto-refresh
            },
        });

        return await Transporter.sendMail(mailOptions) 
        } catch (error) {
            console.log(error)
            }
}