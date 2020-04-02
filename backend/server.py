from flask import Flask, request, jsonify
from flask_cors import CORS
from bson import json_util

import pymongo
import pprint
import json

from sanitiser import Sanitiser

# Create the flask server
app = Flask(__name__)
CORS(app)

# Helpers =================

"""
MongoDB returns bson which must be parsed with specific json encoder (bson.json_util.default).
This must then be re-encoded with (flask.jsonify) to create a flask json response
"""
def bson_to_json_response(bson_data):
    # Create a JSON object from bson Cursor
    json_obj = json.loads(json.dumps(list(bson_data), default=json_util.default))
    # Encodes and adds HEaders etc for flask json response
    json_data = jsonify(json_obj)
    return json_data

# Routes =================

@app.route('/')
def index():
    return "Nothing is here yet"

# Route for all crimes near location endpoint
@app.route('/all-crimes-near-location')
def all_crimes_near_location():
    # Detail required parameters
    required_params = [ 
                        {"name": "longitude", "type": "longitude"},
                        {"name": "latitude", "type": "latitude"},
                        {"name": "distance", "type": "distance"}
                    ]

    # Get sanitised query paramteres using Sanitiser and required_params
    parameters = sanitiser.get_sanitised_params(request.args, required_params)

    # If there are any errors with query parameters, return the error instead
    if "Invalid Request" in parameters:
        return jsonify(parameters)
    
    # Otherwise, create a query dict for MongoDB
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

    # Use Query on crimes collection
    bson_data = crimes_collection.find(query)
    # Return the flask json response with returned data from MongoDB
    return bson_to_json_response(bson_data)

# Route for all crimes near location for month endpoint
@app.route('/all-crimes-near-location-for-month')
def all_crimes_near_location_for_month():
    # Detail required parameters
    required_params = [ 
                        {"name": "longitude", "type": "longitude"},
                        {"name": "latitude", "type": "latitude"},
                        {"name": "distance", "type": "distance"},
                        {"name": "date", "type": "date"}
                    ]

    # Get sanitised query paramteres using Sanitiser and required_params
    parameters = sanitiser.get_sanitised_params(request.args, required_params)

    # If there are any errors with query parameters, return the error instead
    if "Invalid Request" in parameters:
        return jsonify(parameters)
    
    # Otherwise, create a query dict for MongoDB
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

    # Use Query on crimes collection
    bson_data = crimes_collection.find(query)
    # Return the flask json response with returned data from MongoDB
    return bson_to_json_response(bson_data)

# Route for all crimes count for month endpoint
@app.route('/all-crimes-in-month')
def all_crimes_in_month():
    # Set the required parameters
    required_params = [ 
                        {"name": "date", "type": "date"}
                    ]
    # Get sanitised query parameters
    parameters = sanitiser.get_sanitised_params(request.args, required_params)

    # Check if parameters have no errors
    if "Invalid Request" in parameters:
        return jsonify(parameters)

    # Form Query
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

    # Send Query and jsonify response
    bson_data = crimes_collection.aggregate(query)
    return bson_to_json_response(bson_data)


# @app.route('/crime-types')
def all_crime_types():
    crime_types = crimes_collection.distinct("crime_type", {})
    return list(crime_types)

# Route for all crimes by type for the endpoint
@app.route('/all-crimes-by-type')
def all_crimes_by_type():
    # Set the required parameters
    required_params = [
        {"name": "crime-type", "type": "crime-type"}
    ]
    # Get sanitised query parameters
    parameters = sanitiser.get_sanitised_params(request.args, required_params)
    print(parameters)
    # Check if parameters have no errors
    if "Invalid Request" in parameters:
        return jsonify(parameters)

    # Form Query
    query = {
        "crime_type": parameters["crime-type"]
    }
    # Send Query and jsonify response
    bson_data = crimes_collection.find(query)

    return bson_to_json_response(bson_data)


@app.route('/test')
def test():
    data = all_crimes_near_location(0.431697010993958, 51.6238441467285, 10000)
    json_data = [json.dumps(datum, default=json_util.default) for datum in data]

    return str(len(json_data))

# RUN =================

if __name__ == '__main__':

    # Connect to Mongo DB adn get collection
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    police_db = client["police"]
    crimes_collection = police_db["crimes"]
    crime_types = all_crime_types()
    print(crime_types)
    # Create a sanitiser object
    sanitiser = Sanitiser()

    # Run the backend server
    app.run(host='0.0.0.0', debug=True)

    
