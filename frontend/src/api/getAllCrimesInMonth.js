const HOSTNAME = window.location.hostname;
const PORT = 5000;

export default async function getAllCrimesInMonth(date) {
  const response = await fetch(`http://${HOSTNAME}:${PORT}/crimes-in-month?date=${date}`);
  const data = await response.json();
  return data;
}

export async function getAllCrimesInMonthCount(date) {
  const response = await fetch(`http://${HOSTNAME}:${PORT}/crimes-in-month-count?date=${date}`);
  const data = await response.json();
  return data;
}
