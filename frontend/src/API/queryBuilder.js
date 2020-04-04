const HOSTNAME = window.location.hostname;
const PORT = 5000;


export default async function queryBuilder(options) {
  const {
    date1,
    date2,
    position,
    crimeType,
    distance,
    docFields,
  } = options;
    // isolate search results to UK only
  let queryString = [];

  if (typeof (position) !== 'undefined') {
    queryString.push(`longitude=${position[0]}&latitude=${position[1]}`);
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
    console.log('docFields:', docFields);
    queryString.push(`fields=${docFields.join(',')}`);
  }

  queryString = queryString.join('&');
  console.log('QUERY BUILEEEEER: ', queryString);

  const response = await fetch(`http://${HOSTNAME}:${PORT}/crimes?${queryString}`);
  const data = await response.json();

  return data;
}
