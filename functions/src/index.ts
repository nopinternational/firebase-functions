import { initializeApp } from "firebase-admin/app";
initializeApp();

import { sendNewUserNotificationEmail } from "./admin-functions/newUser";
export const foo = sendNewUserNotificationEmail;
