# Police Data Application
A frontend and backend for querying and displaying data on crimes in the UK provided by UK Police Open Data (https://data.police.uk/data/).



## MongoDB
Relies on a Hyper-V VM hosting a Mongo Database, accessible on local network (mongodb://localhost:27017/).

## Backend
The Backend is a Python Flask server which interacts with the database via PyMongo. It builds queries based on the query parameters provided and returns the resulting data in a json format. All inputted query parameters are sanitised and checked before being used in database queries. If any issue exists with a query parameter, the database is not queried and a detailed error message is returned in json format. All query parameters are completely checked before returning an error message, so the error message contains __ALL__ issues with query paramteres in the request.

To start the backend server, you first need Python3 and Pip3 to run the application and manage dependencies. If these are available, move to the `backend/` directory and install all the requirements with Pip3:
```bash
pip3 install -r requirements.txt
```
Once the requirements are installed, you can start the server with:
```bash
py server.py
```
To test that the server has started up correctly, you can open a browser and go to:
```url
http://{VM_IP}:5000/ping
```
... and expect the response:
```json
{
  "pong": "status up"
}
```

### Endpoints
These are all the endpoints made available by the API:
* `/crimes` - __This is the main endpoint for querying the MongoDB.__ Add query parameters to tailor the response as needed.
* `/all-crime-types` - Gets a list of distinct crime types in the DB.
* `/all-dates` - Gets a list of distinct date objects.
* `/all-year-months` - Gets a list of distinct dates (YYYY-MM) format.
* `/all-falls-within-location` - GEts a list of distinct locations that crimes fall within.
* `/ping` - Returns if server is up.


### Query Parameters
To query the MongoDB through the backend you can hit the `/crimes` endpoint with any combination of the available query parameters:
* `latitude` - Sets the latitude

## Frontend
The Frontend is a Webpack server that collects all the source code and bundles in a single file that get sent to the user's browser once a request to the server is made via port `9000`. There after, the the browser sends GET requests to Flask server via port `5000` using source code to retrieve any data it needs for rendering the UI.

To start the start user needs to move to the 
Because the frontend is a combination of React and many other packages, to ensure that the server runs user needs