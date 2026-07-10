import { collection, addDoc, getDocs, getDoc, doc, query, where } from "firebase/firestore";
import { db } from "./firebase";

// Create a new job posting
export async function createJob(jobData) {
  const docRef = await addDoc(collection(db, "jobs"), {
    ...jobData,
    status: "open",
    createdAt: new Date().toISOString(),
  });
  return docRef.id;
}

// Get all jobs posted by a specific owner
export async function getJobsByOwner(ownerId) {
  const q = query(collection(db, "jobs"), where("ownerId", "==", ownerId));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Get all open jobs (for workers to browse later)
export async function getAllOpenJobs() {
  const q = query(collection(db, "jobs"), where("status", "==", "open"));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Get a single job by its ID (for the Job Details page)
export async function getJobById(jobId) {
  const snap = await getDoc(doc(db, "jobs", jobId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}