from flask import Flask, request, jsonify
from flask_cors import CORS
from bson import json_util

import pymongo
import pprint
import json

from sanitiser import Sanitiser

app = Flask(__name__)
CORS(app)

# Helpers =================

def bson_to_json_response(bson_data):
    # Create a JSON object from bson Cursor
    json_obj = json.loads(json.dumps(list(bson_data), default=json_util.default))
    json_data = jsonify(json_obj)
    return json_data

# Routes =================

@app.route('/')
def index():
    return "Nothing is here yet"

@app.route('/crimes-near-location')
def crimes_near_location():
    required_params = ["longitude", "latitude", "distance"]
    parameters = sanitiser.get_sanitised_params(request.args, required_params)

    if "Invalid Request" in parameters:
        return jsonify(parameters)
    
    query = {
        "location": {
            "$near": {
            "$geometry": {
                "type": "Point" ,
                "coordinates": [ parameters["longitude"] , parameters["latitude"] ]
            },
            "$maxDistance": parameters["distance"]
            }
        }
    }

    bson_data = crimes_collection.find(query)
    return bson_to_json_response(bson_data)


@app.route('/crimes-in-month')
def crimes_in_month():
    required_params = ["date"]
    parameters = sanitiser.get_sanitised_params(request.args, required_params)

    if "Invalid Request" in parameters:
        return jsonify(parameters)

    query = [
        {
            "$match": {
                "date" : {
                    "$eq": parameters["date"]
                }
            }
        },
        {"$count": "count"}
    ]

    bson_data = crimes_collection.aggregate(query)
    return bson_to_json_response(bson_data)

@app.route('/test')
def test():
    data = crimes_near_location(0.431697010993958, 51.6238441467285, 10000)
    json_data = [json.dumps(datum, default=json_util.default) for datum in data]

    return str(len(json_data))

# RUN =================

if __name__ == '__main__':

    # Connect to Mongo DB
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    police_db = client["police"]
    crimes_collection = police_db["crimes"]

    sanitiser = Sanitiser()

    app.run(host='0.0.0.0', debug=True)

    
