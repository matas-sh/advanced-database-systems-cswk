const PORT = 5000;
const HOSTNAME = window.location.hostname;

export default async function getCrimesNearArea(longtitude, latitude, distance) {
  const response = await fetch(`http://${HOSTNAME}:${PORT}/crimes-near-location?longitude=${longtitude}&latitude=${latitude}&distance=${distance}`);
  const data = await response.json();
  return data;
}
