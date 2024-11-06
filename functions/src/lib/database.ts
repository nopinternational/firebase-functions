import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

initializeApp();
const firestore = getFirestore();

export const userLookup = async (userId: string): Promise<string> => {
  const docRef = firestore.collection("profiles").doc(userId);
  const userDoc = await docRef.get();
  const user = userDoc.data();
  const username = user?.username || userId;
  return username;
};

export const eventLookup = async (eventId: string): Promise<string> => {
  const docRef = firestore.collection("events").doc(eventId);
  const eventDoc = await docRef.get();
  const event = eventDoc.data();
  const title = event?.title || eventId;
  return title;
};


export const userEmailLookup = async (userId: string) : Promise<string | null> => {
  const auth = getAuth();

  const user = await auth.getUser(userId);
  console.log(user.email);

  return user.email || null;
};
