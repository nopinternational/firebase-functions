
import { sendNewUserNotificationEmail } from "./admin-functions/newUser";
import { sendNewEvenParticipantNotification } from "./admin-functions/newEventParticipant";
import { sendPendingValidationRequest } from "./admin-functions/pendingValidationRequestNotification";

export default {
  sendNewEvenParticipantNotification,
  sendNewUserNotificationEmail,
  sendPendingValidationRequest,
};
