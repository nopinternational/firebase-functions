
import { sendNewUserNotificationEmail } from "./triggers/newUser";
import { sendNewEvenParticipantNotification } from "./triggers/newEventParticipant";
import { sendPendingValidationRequest } from "./triggers/pendingValidationRequestNotification";

export default {
  sendNewEvenParticipantNotification,
  sendNewUserNotificationEmail,
  sendPendingValidationRequest,
};
