import { onValueWritten } from "firebase-functions/database";
import { defineSecret } from "firebase-functions/params";

import { MailDataRequired } from "@sendgrid/mail";
import { init, sendSgMail } from "../lib/mail/sendgrid";
import { userEmailLookup } from "../lib/database";

const sendgridAPIKey = defineSecret("SENDGRID_API_KEY");

type Userdata = {
  status: string
}

export const newStatusNotifyUser =
  onValueWritten({ ref: "/validation/{userId}/status/", secrets: [sendgridAPIKey] }, (event) => {
    const original = event.data.after.val();
    const userdata = { ...original } as Userdata;
    const userId = event.params.userId;
    console.log("[newStatusNotifyUser] userdata: ", userdata);

    const statusValue = userdata.status;
    const doSendEmail =
      statusValue != null && statusValue != "PENDING" && statusValue != "RETRY";

    console.log("[newStatusNotifyUser] statusValue", statusValue);
    if (doSendEmail) {
      onNewValidationStatus(userId, statusValue);
    } else {
      console.log("[newStatusNotifyUser] status ignored:", userdata.status);
    }
  });

const onNewValidationStatus = async (userId: string, status: string): Promise<void> => {
  const userEmailEventually = await userEmailLookup(userId);
  console.log("userEmailEventually", userEmailEventually);
  const to = userEmailEventually;
  if (to) {
    sendSendgridEmail(to, { status: status });
  }
};


const sendSendgridEmail = (mailTo: string, { status }: {status: string}): void => {
  // console.log("NOT sending to mailTo: ", mailTo);
  init(sendgridAPIKey.value());

  const mailMsg: MailDataRequired = {
    to: mailTo,
    from: {
      name: "Night of Passion",
      email: "fest@nightofpassion.se",
    },
    subject: "Night of Passion - Ang er verifiering",
    templateId: "d-c026f45b117b4a9693f97f9f952fd4e2",
    dynamicTemplateData: {
      subject: "Night of Passion - Ang er verifiering",
      status,
    },
    text: "Night of Passion - Välkommen",
    html: "<strong>Night of Passion - Välkommen</strong>",
  };
  console.log("sending mail: ", mailMsg);

  sendSgMail(mailMsg);
};

