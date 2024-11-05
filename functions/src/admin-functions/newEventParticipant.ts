
import {
  onDocumentCreated,
} from "firebase-functions/v2/firestore";
import { GmailConfig, sendEmail } from "../mail/gmail";
import { defineSecret } from "firebase-functions/params";
import { eventLookup, userLookup } from "./database";

// Define the secret parameter
const gEmail = defineSecret("GMAIL_EMAIL");
const gPass = defineSecret("GMAIL_PASSWORD");


export const sendNewEvenParticipantNotification =
onDocumentCreated({ document: "events/{eventId}/participants/{uid}", secrets: [gEmail, gPass] }, (event) => {
  onNewParticipant(event.params.eventId, event.params.uid, event.data?.data());
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const onNewParticipant = async (eventId: string, userId: string, _userdata: unknown) => {
  const gmailConfig: GmailConfig = {
    email: gEmail.value(),
    password: gPass.value(),
  };

  const to = "fest@nightofpassion.se";

  const eventTitleEventually = await eventLookup(eventId);
  const usernameEventually = await userLookup(userId);

  const templateData: EmailTemplateData = {
    eventTitle: eventTitleEventually,
    eventId: eventId,
    username: usernameEventually,
    userId: userId,
  };

  const mailContent = onNewParticipantEmailTemplate(templateData);
  return sendEmail(gmailConfig, to, "New NoP event participant", mailContent);
};

  type EmailTemplateData = {
    userId: string,
    username?: string,
    eventTitle?: string,
    eventId: string
  }


const onNewParticipantEmailTemplate = (data: EmailTemplateData): string => {
  const text = `New participant to event:
Event: ${data.eventTitle || "<unknown event title>"}
EventId: ${data.eventId}
Profile: ${data.username || "<unknown profile>"}     
ProfileId: ${data.userId}`;

  return text;
};


