const PORT = 5000;
const LOCALHOST = '192.168.0.82';
// const options = {
//   headers: {
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Origin': 'http://192.168.0.82:5000',
//   },
// };

export default async function getCrimesNearArea(longtitude, latitude, distance) {
  const response = await fetch(`http://${LOCALHOST}:${PORT}/crimes-near-location?longitude=${longtitude}&latitude=${latitude}&distance=${distance}`);
  const data = await response.json();
  return data;
}
