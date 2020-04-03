export default async function getLocationByString(stringLocation) {
  const response = await fetch(`https://www.mapquestapi.com/search/v2/radius?origin=${stringLocation}&radius=${0.001}&maxMatches=${1}&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|581208&outFormat=json&key=gCYSU62ZAZcCuHXdGp9gEZRvzMke54z3`);
  const data = await response.json();
  return data;
}
