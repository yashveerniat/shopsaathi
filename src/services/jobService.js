import { api } from "./api";

// MongoDB ka _id aur owner, frontend ke id aur ownerId mein badlo
const mapJob = (j) => ({ ...j, id: j._id, ownerId: j.owner });

export async function createJob(jobData) {
  const job = await api("/jobs", { method: "POST", body: jobData });
  return job._id;
}

export async function getJobsByOwner() {
  const jobs = await api("/jobs/my");
  return jobs.map(mapJob);
}

export async function getAllOpenJobs() {
  const jobs = await api("/jobs");
  return jobs.map(mapJob);
}

export async function getJobById(jobId) {
  try {
    return mapJob(await api(`/jobs/${jobId}`));
  } catch {
    return null;
  }
}