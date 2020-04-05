const HOSTNAME = window.location.hostname;
const PORT = 5000;


export default async function queryBuilder(options) {
  const {
    date1,
    date2,
    position,
    crimeType,
    distance,
    option,
  } = options;
    // isolate search results to UK only
  let queryString = [];

  if (typeof (position) !== 'undefined') {
    queryString.push(`longitude=${position[1]}&latitude=${position[0]}`);
  }
  if (typeof (distance) !== 'undefined') {
    queryString.push(`distance=${distance}`);
  }
  if (crimeType.size > 0 && crimeType.size < 11) {
    queryString.push(`crime-type=${Array.from(crimeType.values()).join(',')}`);
  }
  if (typeof (date1) !== 'undefined') {
    queryString.push(`date1=${date1}`);
  }
  if (typeof (date2) !== 'undefined') {
    queryString.push(`date2=${date2}`);
  }
  if (typeof (option) !== 'undefined') {
    queryString.push(`option=${option}`);
  }

  queryString = queryString.join('&');

  const response = await fetch(`http://${HOSTNAME}:${PORT}/crimes?${queryString}`);
  const data = await response.json();

  return data;
}
