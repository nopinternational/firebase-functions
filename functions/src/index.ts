import { initializeApp } from "firebase-admin/app";
import { sendNewUserNotificationEmail } from "./admin-functions/newUser";
import { sendNewEvenParticipantNotification } from "./admin-functions/newEventParticipant";

initializeApp();


export default { sendNewEvenParticipantNotification, sendNewUserNotificationEmail };
