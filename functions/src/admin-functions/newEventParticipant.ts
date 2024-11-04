
import {
  onDocumentCreated,
} from "firebase-functions/v2/firestore";
import { GmailConfig, sendEmail } from "../mail/gmail";
import { defineSecret } from "firebase-functions/params";

// Define the secret parameter
const gEmail = defineSecret("GMAIL_EMAIL");
const gPass = defineSecret("GMAIL_PASSWORD");

export const sendNewEvenParticipantNotification = onDocumentCreated("events/{eventId}/participants/{uid}", (event) => {
  console.log("events/{eventId}/participants/{uid}", event);
  console.log("events/{eventId}/participants/{uid} - event.params", event.params);
  console.log("events/{eventId}/participants/{uid} - event.before", event.data?.data());
  // console.log("events/{eventId}/participants/{uid} - event.before", event.data?.before.data());
  // console.log("events/{eventId}/participants/{uid} - event.after", event.data?.after.data());
  onNewParticipant(event.params.eventId, event.params.uid, event.data?.data());
});

const onNewParticipant = (eventId: string, userId: string, userdata: any) => {
  console.log("notifyNewparticipant: ", eventId, userId, userdata);

  const gmailConfig: GmailConfig = {
    email: gEmail.value(),
    password: gPass.value(),
  };

  const to = "fest@nightofpassion.se";

  const mailContent = onNewParticipantEmailTemplate({ eventId, userId });
  return sendEmail(gmailConfig, to, "New NoP event participant", mailContent);
};

  type EmailTemplateData = {
    userId: string,
    eventId: string
  }


const onNewParticipantEmailTemplate = (data: EmailTemplateData): string => {
  const text = `New participant to event:
Event: ${data.eventId || "<unknown event>"}    
User: ${data.userId || "<unknown user>"}     
`;
  return text;
};
