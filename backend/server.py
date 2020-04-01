from flask import Flask, request, jsonify
from flask_cors import CORS
import pymongo
import pprint
import json
from bson import json_util

app = Flask(__name__)
CORS(app)

def bson_to_json_response(bson_data):
    # Create a JSON object from bson Cursor
    json_obj = json.loads(json.dumps(list(bson_data), default=json_util.default))
    json_data = jsonify(json_obj)
    return json_data

@app.route('/')
def index():
    return "Nothing is here yet"

@app.route('/crimes-near-location')
def crimes_near_location():
    longitude = request.args.get('longitude', type = float)
    latitude = request.args.get('latitude', type = float)
    distance = request.args.get('distance', type = int)

    if not all(item in request.args for item in ["longitude", "latitude", "distance"]) or (None in [longitude, latitude, distance]):
        return "Invalid Request"
    else:
        query = {
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

        bson_data = crimes_collection.find(query)
        return bson_to_json_response(bson_data)


@app.route('/crimes-a-month')
def crimes_a_month():
    year_month = request.args.get('year-month', type = str)

    if not all(item in request.args for item in ["year-month"]) or (None in [year_month]):
        return "Invalid Request"
    else:

        bson_data = crimes_collection.aggregate([
            {
                "$match": {
                    "month" : {
                        "$eq": year_month
                    }
                }
            },
            {"$count": "count"}]
        )

        for doc in bson_data:
            print(doc)
        return bson_data.count


@app.route('/test')
def test():
    data = crimes_near_location(0.431697010993958, 51.6238441467285, 10000)
    json_data = [json.dumps(datum, default=json_util.default) for datum in data]

    return str(len(json_data))

# Connect to Mongo DB
client = pymongo.MongoClient("mongodb://localhost:27017/")
police_db = client["police"]
crimes_collection = police_db["crimes"]

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)

    
