import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

initializeApp();
const firestore = getFirestore();

export const userLookup = async (userId: string): Promise<string> => {
  const docRef = firestore.collection("profiles").doc(userId);
  const userDoc = await docRef.get();
  console.log("eventDoc", userDoc);
  console.log("----------------");
  const user = userDoc.data();
  console.log("user", user);
  console.log("user.title", user?.title);
  const username = user?.username || userId;
  console.log("username", username);
  return username;
};

export const eventLookup = async (eventId: string): Promise<string> => {
  const docRef = firestore.collection("events").doc(eventId);
  const eventDoc = await docRef.get();
  console.log("eventDoc", eventDoc);
  console.log("----------------");
  const event = eventDoc.data();
  console.log("event", event);
  console.log("event.title", event?.title);
  const title = event?.title || eventId;
  console.log("title", title);
  return title;
};
