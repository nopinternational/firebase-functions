// import { beforeUserCreated } from "firebase-functions/identity";
import functions, { auth } from "firebase-functions/v1";
import { defineString } from "firebase-functions/params";
// The Firebase Admin SDK to access Firestore.
// import admin from "firebase-admin";
// admin.initializeApp();

const paramGEmail = defineString("GMAIL_EMAIL");
const paramGPassword = defineString("GMAIL_PASSWORD");
// import { GmailConfig, sendEmail } from "../lib/mail/gmail";
// import { defineSecret } from "firebase-functions/params";
// import { userLookup } from "../lib/database";

// Define the secret parameter
// const gEmail = defineSecret("GMAIL_EMAIL");
// const gPass = defineSecret("GMAIL_PASSWORD");


// type Userdata = {
//   status: string

// }

console.log("functions", functions);
console.log("auth", auth);
export const newUserAuth = auth.user().onCreate((user) => {
  // ...
  const gmailEmail = paramGEmail.value();
  const gmailPassword = paramGPassword.value();
  // console.log("beforeUserCreated", event.data?.uid, gEmail.value());
  console.log("beforeUserCreated", user);
  console.log("beforeUserCreated", user.uid);
  console.log(gmailEmail, gmailPassword);
});
  // beforeUserCreated({ secrets: [gEmail, gPass] }, (event) => {
  //   // ...
  // // });
  // // onValueWritten({ ref: "/validation/{userId}/status/", secrets: [gEmail, gPass] }, (event) => {
  // });
  //   console.log("after", event.data.after.val());
  //   const original = event.data.after.val();
  //   const userdata = { ...original } as Userdata;
  //   const userId = event.params.userId;
  //   console.log("userdata: ", userdata);

//   if (userdata.status == "PENDING") {
//     onPendingValidationRequest(userId, userdata);
//   } else {
//     console.log("status ignored:", userdata.status);
//   }
// });

// const onPendingValidationRequest = async (userId: string) => {
//   const gmailConfig: GmailConfig = {
//     email: gEmail.value(),
//     password: gPass.value(),
//   };
//   const usernameEventually = await userLookup(userId);

//   const mailContent = onNewUserEmailTemplate({ userId, username: usernameEventually });
//   const to = "fest@nightofpassion.se";
//   return sendEmail(gmailConfig, to, "New NoP validation request", mailContent);
// };

// type EmailTemplateData = {
//   username?: string,
//   userId: string
// }

// const onNewUserEmailTemplate = (data: EmailTemplateData): string => {
//   const text = `New NoP validation request, PENDING:
//   username: ${data.username || "<unknown userId>"}
//   userId: ${data.userId || "<unknown userId>"}

//   https://nop-admin.vercel.app/user/${data.userId}
//   `;
//   return text;
// };

