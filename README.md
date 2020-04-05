# Police Data Application
A frontend and backend for querying and displaying data on crimes in the UK provided by UK Police Open Data (https://data.police.uk/data/).



## MongoDB
Relies on a Hyper-V VM hosting a Mongo Database, accessible on local network (mongodb://localhost:27017/). VM can be found on SSD returned in the root directory and can be imported into Hyper-V using the Hyper-V Manager. In the `Actions` tab of Hyper-V Manager, there will be an `Import Virtual Machine...` option. After selecting this, navigate to the SSD and __select the Mongo folder in the root directory__. Then follow the steps detailed in the setup wizard. You should then be able to start the VM in Hyper-V Manager by selecting the Mongo VM in the `Virtual Machines` section and choosing `Start`

If you receive an error about the VM being unable to connect to the network switch, you will be prompted to update the network switch in the import wizard. Simply follow the instructions to set it to your own network switch.

## Backend
The Backend is a Python Flask server which interacts with the database via PyMongo. It builds queries based on the query parameters provided and returns the resulting data in a json format. All inputted query parameters are sanitised and checked before being used in database queries. If any issue exists with a query parameter, the database is not queried, and a detailed error message is returned in json format. All query parameters are completely checked before returning an error message, so the error message contains __ALL__ issues with query parameters in the request.

To start the backend server, you first need Python3 and Pip3 to run the application and manage dependencies. If these are available, move to the `~/Projects/adavanced-database-systems-cswk/backend/` directory and install all the requirements with Pip3:
```bash
pip3 install -r requirements.txt
```
Once the requirements are installed, you can start the server with:
```bash
py server.py
```
Which should start the server on port `5000`.

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
* `/all-falls-within-location` - Gets a list of distinct locations that crimes fall within.
* `/ping` - Returns if server is up.

### Query Parameters
To query the MongoDB through the backend you can hit the `/crimes` endpoint with any combination of the available query parameters (All locations parameters are required):
* `latitude` - Sets the latitude (REQUIRED)
* `longitude` - Sets the longitude (REQUIRED)
* `distance` - Sets the radius around the Lat-Long point to query (REQUIRED)
* `date1` - Sets the month to query for.
* `date2` - Sets the month to query for (If used in combination with date1, will query for inclusive date range).
* `crime-type` - Limits the type of crime returned by crime-type list provided. If not set, returns all crime-types.
* `option` - Sets option parameters (Only one option allowed):
  * `count` - Returns a count of the crimes instead of the doc.
  * `grouped-month` - Returns a count of crimes for each month.
  * `grouped-location` - Returns a count of crimes for each type present grouped by location with street name included (Used in frontend map).
* `fields` - Limit the response to contain only the fields requested in list provided (Ignored if an option is set).

### Examples
Some sample queries to test functionality. Replace {VM_IP} with your VM's IP.

```
http://{VM_IP}:5000/crimes?latitude=51.6238441467285&longitude=0.431697010993958&distance=1000
```
```
http://{VM_IP}:5000/crimes?latitude=51.6238441467285&longitude=0.431697010993958&distance=1000&date1=2018-02&crime-type=Anti-social%20behaviour,Burglary
```
```
http://{VM_IP}:5000/crimes?latitude=51.6238441467285&longitude=0.431697010993958&distance=1000&date2=2019-07&option=grouped-location
```
```
http://{VM_IP}:5000/crimes?latitude=51.6238441467285&longitude=0.431697010993958&distance=5000&date2=2019-07&option=count
```

## Frontend
The Frontend is a Webpack server that collects all the source code and bundles in a single file that get sent to the user's browser once a request to the server is made via port `9000`. Thereafter, the browser sends GET requests to Flask server via port `5000` using source code to retrieve any data it needs for rendering the UI.

(this assumes that the machine has either yarn or npm installed and that the node module packages for frontend have been installed). For machines other than this virtual machine the user would have to install those packages with `npm install` or `yarn install`. As the server is a combination of Webpack, React and many other JavaScript packages.

To start the server the user has to move to the `~/Projects/adavanced-database-systems-cswk/frontend` directory via command:
```bash
cd ../frontend
```
and then run the fallowing command:
```bash
npm start
```
This will start the bundling process and once finished will display `Compiled successfully` message at the bottom of the logs in the terminal.

Once compiled, the UI will be available on the network at following URL that can be accessed via browser:
```http://{VM_IP}:9000/```