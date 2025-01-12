import nodemailer, { Transporter } from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config();


interface EmailOptions {
    email: string,
    subject: string,
    template: string,
    emailData: { [key: string]: any }
}


const sendMail = async (options: EmailOptions): Promise<void> => {
    const transporter: Transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        }
    })

    const { email, subject, template, emailData } = options

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject,
        html: template
    }

    // send mail
    await transporter.sendMail(mailOptions)
}


export default sendMail