const HOSTNAME = window.location.hostname;
const PORT = 5000;


export default async function queryBuilder(options) {
  const {
    date1,
    date2,
    latitude,
    longitude,
    crimeType,
    distance,
    docFields,
  } = options;
    // isolate search results to UK only
  const queryString = [];

  if (typeof (latitude) !== 'undefined') {
    queryString.push(`latitude=${latitude}`);
  }
  if (typeof (longitude) !== 'undefined') {
    queryString.push(`longitude=${longitude}`);
  }
  if (typeof (distance) !== 'undefined') {
    queryString.push(`distance=${distance}`);
  }
  if (crimeType.length) {
    queryString.push(`crime-type=${crimeType.join(',')}`);
  }
  if (typeof (date1) !== 'undefined') {
    queryString.push(`date1=${date1}`);
  }
  if (typeof (date2) !== 'undefined') {
    queryString.push(`date2=${date2}`);
  }
  if (docFields.length) {
    queryString.push(`doc-fields-=${docFields.join(',')}`);
  }

  queryString.join('&');

  const response = await fetch(`http://${HOSTNAME}:${PORT}/crimes?${queryString}`);
  const data = await response.json();
  return data;
}
