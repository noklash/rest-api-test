const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const sendingMail = async ({ from, to, subject, text }) => {
    try {
        // const oauth2Client = new google.auth.OAuth2(
        //     process.env.CLIENT_ID,
        //     process.env.CLIENT_SECRET,
        //     // "https://developers.google.com/oauthplayground" // Redirect URI, you can set it to OAuth 2.0 Playground for testing
        //     "http://127.0.0.1:3000/oauth"
        //     );

        // oauth2Client.setCredentials({
        //     refresh_token: process.env.REFRESH_TOKEN,
        // });

        // const accessToken = await oauth2Client.getAccessToken();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'njokugoodluck2k@gmail.com',
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: process.env.ACCESS_TOKEN
            },
        });

        const mailOptions = {
            from,
            to,
            subject,
            text,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log("Email sent:", result);

        return result;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

module.exports = { sendingMail };
