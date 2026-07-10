import { collection, addDoc, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

// Worker applies to a job
export async function applyToJob({ jobId, jobTitle, workerId, ownerId, workerSnapshot }) {
  const docRef = await addDoc(collection(db, "applications"), {
    jobId,
    jobTitle,
    workerId,
    ownerId,
    workerSnapshot,
    status: "pending",
    appliedAt: new Date().toISOString(),
  });
  return docRef.id;
}

// Check if this worker already applied to this job (prevents duplicate applies)
export async function hasAlreadyApplied(jobId, workerId) {
  const q = query(
    collection(db, "applications"),
    where("jobId", "==", jobId),
    where("workerId", "==", workerId)
  );
  const snap = await getDocs(q);
  return !snap.empty;
}

// Get all applications a worker has submitted
export async function getApplicationsForWorker(workerId) {
  const q = query(collection(db, "applications"), where("workerId", "==", workerId));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Get all applications an owner has received (across all their jobs)
export async function getApplicationsForOwner(ownerId) {
  const q = query(collection(db, "applications"), where("ownerId", "==", ownerId));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Owner updates an application's status (shortlisted / hired / rejected)
export async function updateApplicationStatus(applicationId, newStatus) {
  await updateDoc(doc(db, "applications", applicationId), { status: newStatus });
}