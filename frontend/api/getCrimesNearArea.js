STATIC_TRISTAN_SERVER  = `192.168.0.83`;
LOCALHOST = `0.0.0.0`

async function getCrimesNearArea(longtitude, latitude, distance) 
{
    let response = await fetch(`http://${STATIC_TRISTAN_SERVER}/crimes-near-location?longtitude=${longtitude}&latitude=${latitude}&distance=${distance}`);
    let data = await response.json()

    return data;
}
