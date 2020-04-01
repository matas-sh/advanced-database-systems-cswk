from flask import Flask
from flask import request
import pymongo
import pprint
import json
from bson import json_util

app = Flask(__name__)

def crimes_near_location(longitude, latitude, distance):
    myquery = {
       "location": {
         "$near": {
           "$geometry": {
              "type": "Point" ,
              "coordinates": [ longitude , latitude ]
           },
           "$maxDistance": distance
         }
       }
    }

    return mycol.find(myquery)

@app.route('/crimes-near-location')
def index():
    longitude = request.args.get('longitude', type = float)
    latitude = request.args.get('latitude', type = float)
    distance = request.args.get('distance', type = int)

    if not all(item in request.args for item in ["longitude", "latitude", "distance"]) or (None in [longitude, latitude, distance]):
        return "Invalid Request"
    else:
        data = crimes_near_location(longitude, latitude, distance)
        json_data = [json.dumps(datum, default=json_util.default) for datum in data]
        return json.loads(json_data[0])

@app.route('/test')
def test():
    data = crimes_near_location(0.431697010993958, 51.6238441467285, 10000)
    json_data = [json.dumps(datum, default=json_util.default) for datum in data]

    return str(len(json_data))

# Connect to Mongo DB
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["police"]
mycol = mydb["crimes"]

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)

    
