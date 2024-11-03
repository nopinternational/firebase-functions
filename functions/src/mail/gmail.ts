import { createTransport } from "nodemailer";

export type GmailConfig = {
    email: string,
    password: string,
}

type MailOptions = {
    subject?: string;
    text?: string;
    from: string
    to: string
}

const sendEmail = (gmailConfig: GmailConfig, email: string, subject: string, mailContent: string): void => {
  console.log("gmailConfig,", gmailConfig);

  const mailTransport = createTransport({
    service: "gmail",
    auth: {
      user: gmailConfig.email,
      pass: gmailConfig.password,
    },
  });

  const mailOptions: MailOptions = {
    from: email,
    to: email,
    subject: subject,
    text: mailContent,
  };

  mailTransport.sendMail(mailOptions);
};

export { sendEmail };
