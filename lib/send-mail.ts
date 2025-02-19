import nodemailer, { Transporter } from "nodemailer";
// import ejs from "ejs";
import path from "path";

interface EmailOptions {
    email: string,
    subject: string,
    template?: string,
    html?: string,
    data?: { [key: string]: any }
}

const sendEmail = async (options: EmailOptions): Promise<void> => {
    const transporter: Transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASS,
        }
    });

    const { email, subject, template, data, html } = options;

    if (template && data) {
        //get the path of email template file
        const templatePath = path.join(__dirname, "../mails", template);

        //Render the email template with ejs
        // const html: string = await ejs.renderFile(templatePath, data);

        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: email,
            subject,
            // html,
        }
        await transporter.sendMail(mailOptions);
    } else {
        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: email,
            subject,
            html: html
        }
        await transporter.sendMail(mailOptions);
    }
}

export default sendEmail;