import nodemailer from 'nodemailer'
import { config as configdotenv } from 'dotenv'
configdotenv({ path: '.env' })
export const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: true, // Use true for port 465, false for all other ports
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
    tls: {
        minVersion: 'TLSv1.2',
        maxVersion: 'TLSv1.3',
        rejectUnauthorized: false,
    },
    //  logger: true,
    //  debug: true 
});


transporter.verify().then(() => {
    console.log('ready for send  emails')
})