import { api } from "./api";

// _id ko id mein, createdAt ko appliedAt mein badlo
const mapApp = (a) => ({ ...a, id: a._id, appliedAt: a.createdAt });

export async function applyToJob({ jobId }) {
  const app = await api("/applications", { method: "POST", body: { jobId } });
  return app._id;
}

export async function hasAlreadyApplied(jobId) {
  const apps = await api("/applications/worker");
  return apps.some((a) => a.job === jobId);
}

export async function getApplicationsForWorker() {
  const apps = await api("/applications/worker");
  return apps.map(mapApp);
}

export async function getApplicationsForOwner() {
  const apps = await api("/applications/owner");
  return apps.map(mapApp);
}

export async function updateApplicationStatus(applicationId, newStatus) {
  await api(`/applications/${applicationId}/status`, {
    method: "PUT",
    body: { status: newStatus },
  });
}