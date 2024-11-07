import { MailDataRequired } from "@sendgrid/mail";
import * as sgMail from "@sendgrid/mail";

export const init = (sendgridApiKey: string) => {
  sgMail.setApiKey(sendgridApiKey);
};


export const sendSgMail = (mailMsg: MailDataRequired) => {
  sgMail.send(mailMsg).then(
    () => {/* no-op*/},
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
};
