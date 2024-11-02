//import nodemailer from 'nodemailer';
const nodemailer = require('nodemailer');
type GmailConfig = {
    email: string,
    password: string,
}
const gmailConfig: GmailConfig = {
    email: "fest@nightofpassiona.se",
    password: "qlhuahdvkngbdasd",
};

const gmailEmail = gmailConfig.email; // functions.config().gmail.email;
const gmailPassword = gmailConfig.password; // functions.config().gmail.password;

const mailTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: gmailEmail,
        pass: gmailPassword,
    },
});

type NewUserSignup = {
    username: string,
    message: string
}

type MailOptions = {
    subject?: string;
    text?: string;
    from: string
    to: string
}
function sendEmail(email: string, data: NewUserSignup): void {

    const mailOptions: MailOptions = {
        from: email,
        to: email,
    };

    const text = `New NoP signup:
user: ${data.username || "<unknown user>"}    
message: ${data.message || "<unknown msg>"}     
`;

    // The user subscribed to the newsletter.
    mailOptions.subject = "New NoP signup";
    mailOptions.text = text;

    mailTransport.sendMail(mailOptions);
}

export { sendEmail };
