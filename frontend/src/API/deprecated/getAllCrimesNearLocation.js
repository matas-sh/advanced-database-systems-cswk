const HOSTNAME = window.location.hostname;
const PORT = 5000;

export default async function getAllCrimesNearArea(longtitude, latitude, distance) {
  const response = await fetch(`http://${HOSTNAME}:${PORT}/crimes-near-location?longitude=${longtitude}&latitude=${latitude}&distance=${distance}`);
  const data = await response.json();
  return data;
}

export async function getAllCrimesNearAreaCount(longtitude, latitude, distance) {
  const response = await fetch(`http://${HOSTNAME}:${PORT}/crimes-near-location-count?longitude=${longtitude}&latitude=${latitude}&distance=${distance}`);
  const data = await response.json();
  return data;
}
