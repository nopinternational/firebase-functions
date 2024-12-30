import { MailDataRequired } from "@sendgrid/mail";
import * as sgMail from "@sendgrid/mail";
import * as client from "@sendgrid/client";
import { ClientRequest } from "@sendgrid/client/src/request";

export const init = (sendgridApiKey: string) => {
  sgMail.setApiKey(sendgridApiKey);
  client.setApiKey(sendgridApiKey);
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

export const updateSgContact = (email: string, listId: string) => {
  console.log("updateSgContact--------------------");
  console.log("client", client);

  const data = {
    list_ids: [listId],
    contacts: [
      {
        email: email,
      }],
  };

  console.log("data:", data);
  const request: ClientRequest = {
    url: "/v3/marketing/contacts",
    method: "PUT",
    body: data,
  };

  client
    .request(request)
    .then(([response, body]) => {
      console.log(response.statusCode);
      console.log(response.body);
      console.log(body);
    })
    .catch((error) => {
      console.error(error);
    });
};
