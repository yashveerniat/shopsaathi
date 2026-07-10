import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

// Fetch a user's profile document from Firestore
export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
}

// Update (merge) fields into a user's profile document
export async function updateUserProfile(uid, data) {
  await updateDoc(doc(db, "users", uid), data);
}