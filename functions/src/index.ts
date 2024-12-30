
import { sendNewUserNotificationEmail } from "./triggers/newUser";
import { sendNewEvenParticipantNotification } from "./triggers/newEventParticipant";
import { sendPendingValidationRequest } from "./triggers/pendingValidationRequestNotification";
import { newStatusNotifyUser } from "./triggers/newStatusNotifyUser";
import { newUserAuth } from "./triggers/newAuthUser";

export default {
  sendNewEvenParticipantNotification,
  sendNewUserNotificationEmail,
  sendPendingValidationRequest,
  newStatusNotifyUser,
  newUserAuth,
};
