const HOSTNAME = window.location.hostname;
const PORT = 5000;

export default async function getAllCrimesByType(crimeType) {
  const response = await fetch(`http://${HOSTNAME}:${PORT}/all-crimes-by-type?crime-type=${crimeType}`);
  const data = await response.json();
  return data;
}

export async function getAllCrimesByTypeCount(crimeType) {
  const response = await fetch(`http://${HOSTNAME}:${PORT}/all-crimes-by-type-count?crime-type=${crimeType}`);
  const data = await response.json();
  return data;
}
