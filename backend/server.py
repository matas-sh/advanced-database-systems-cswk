from flask import Flask, request, jsonify
from flask_cors import CORS
from bson import json_util

import pymongo
import pprint
import json

import time

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

# Get all types of crime in DB
@app.route('/all-crime-types')
def all_crime_types():
    crime_types = crimes_collection.distinct("crime_type", {})
    return bson_to_json_response(crime_types)


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

# Route for all crimes near location count endpoint
@app.route('/all-crimes-near-location-count')
def all_crimes_near_location_count():
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
    count = crimes_collection.count(query)
    # Return the flask json response with returned data from MongoDB
    return bson_to_json_response([{"count": count}])


# Route for all crimes for month endpoint
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
    query = {
        "date" : parameters["date"]
    }

    # Send Query and jsonify response
    bson_data = crimes_collection.find(query)
    return bson_to_json_response(bson_data)

# Route for all crimes count for month endpoint
@app.route('/all-crimes-in-month-count')
def all_crimes_in_month_count():
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
    query = {
        "date" : parameters["date"]
    }

    # Send Query and jsonify response
    count = crimes_collection.count(query)
    return bson_to_json_response([{"count": count}])


# Route for all crimes in date range endpoint
@app.route('/all-crimes-in-date-range')
def all_crimes_in_date_range():
    # Set the required parameters
    required_params = [ 
                        {"name": "date1", "type": "date"},
                        {"name": "date2", "type": "date"}
                    ]
    # Get sanitised query parameters
    parameters = sanitiser.get_sanitised_params(request.args, required_params)

    # Check if parameters have no errors
    if "Invalid Request" in parameters:
        return jsonify(parameters)

    # Sort dates by time
    ordered_dates = sorted(list(parameters.values()))

    # Form Query
    query = [
        {
            "$match": {
                "date" : {
                    "$gte": ordered_dates[0],
                    "$lte": ordered_dates[1]
                }
            }
        },
    ]

    # Send Query and jsonify response
    bson_data = crimes_collection.aggregate(query)
    return bson_to_json_response(bson_data)

# Route for all crimes in date range endpoint
@app.route('/all-crimes-in-date-range-count')
def all_crimes_in_date_range_count():
    # Set the required parameters
    required_params = [ 
                        {"name": "date1", "type": "date"},
                        {"name": "date2", "type": "date"}
                    ]
    # Get sanitised query parameters
    parameters = sanitiser.get_sanitised_params(request.args, required_params)

    # Check if parameters have no errors
    if "Invalid Request" in parameters:
        return jsonify(parameters)
    
    # Sort the dates by time
    ordered_dates = sorted(list(parameters.values()))

    # Form Query
    query = [
        {
            "$match": {
                "date" : {
                    "$gte": ordered_dates[0],
                    "$lte": ordered_dates[1]
                }
            }
        },
        {"$count": "count"}
    ]

    # Send Query and jsonify response
    bson_data = crimes_collection.aggregate(query)
    return bson_to_json_response(bson_data)


# Route for all crimes by type for the endpoint
@app.route('/all-crimes-by-type')
def all_crimes_by_type():
    # Set the required parameters
    required_params = [
        {"name": "crime-type", "type": "crime-type"}
    ]
    
    # Get sanitised query parameters
    parameters = sanitiser.get_sanitised_params(request.args, required_params)

    # Check if parameters have no errors
    if "Invalid Request" in parameters:
        return jsonify(parameters)

    # Form Query
    query = {
        "crime_type" : parameters["crime-type"]
    }

    # Send Query and jsonify response
    bson_data = crimes_collection.find(query)
    return bson_to_json_response(bson_data)

# Route for all crimes by type for the endpoint
@app.route('/all-crimes-by-type-count')
def all_crimes_by_type_count():
    # Set the required parameters
    required_params = [
        {"name": "crime-type", "type": "crime-type"}
    ]
    
    # Get sanitised query parameters
    parameters = sanitiser.get_sanitised_params(request.args, required_params)

    # Check if parameters have no errors
    if "Invalid Request" in parameters:
        return jsonify(parameters)

    # Form Query
    query = {
        "crime_type" : parameters["crime-type"]
    }

    # Send Query and jsonify response
    count = crimes_collection.count(query)
    return bson_to_json_response([{"count": count}])


# Route for all crimes near location for month endpoint
@app.route('/crimes-near-location-in-month')
def crimes_near_location_in_month():
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
    query = [
        {
            "$geoNear": {
                "near": {
                    "type": "Point" ,
                    "coordinates": [ parameters["latitude"] , parameters["longitude"] ]
                },
                "distanceField": "dist.calculated",
                "maxDistance": parameters["distance"]
                }
        },
        {
            "$match": {
                "date" : parameters["date"]
            }
        }
    ]

    # Use Query on crimes collection
    bson_data = crimes_collection.aggregate(query)
    # Return the flask json response with returned data from MongoDB
    return bson_to_json_response(bson_data)

# Route for all crimes near location for month count endpoint
@app.route('/crimes-near-location-in-month-count')
def crimes_near_location_in_month_count():
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
    query = [
        {
            "$geoNear": {
                "near": {
                    "type": "Point" ,
                    "coordinates": [ parameters["latitude"] , parameters["longitude"] ]
                },
                "distanceField": "dist.calculated",
                "maxDistance": parameters["distance"]
                }
        },
        {
            "$match": {
                "date" : parameters["date"]
            }
        },
        {"$count": "count"}
    ]

    # Use Query on crimes collection
    bson_data = crimes_collection.aggregate(query)
    # Return the flask json response with returned data from MongoDB
    return bson_to_json_response(bson_data)


# Route for all crimes near location by type endpoint
@app.route('/crimes-near-location-by-type')
def crimes_near_location_by_type():
    # Detail required parameters
    required_params = [ 
                        {"name": "longitude", "type": "longitude"},
                        {"name": "latitude", "type": "latitude"},
                        {"name": "distance", "type": "distance"},
                        {"name": "crime-type", "type": "crime-type"}
                    ]

    # Get sanitised query paramteres using Sanitiser and required_params
    parameters = sanitiser.get_sanitised_params(request.args, required_params)

    # If there are any errors with query parameters, return the error instead
    if "Invalid Request" in parameters:
        return jsonify(parameters)
    
    # Otherwise, create a query dict for MongoDB
    query = [
        {
            "$geoNear": {
                "near": {
                    "type": "Point" ,
                    "coordinates": [ parameters["latitude"] , parameters["longitude"] ]
                },
                "distanceField": "dist.calculated",
                "maxDistance": parameters["distance"]
                }
        },
        {
            "$match": {
                "crime_type" : parameters["crime-type"]
            }
        }
    ]

    # Use Query on crimes collection
    bson_data = crimes_collection.aggregate(query)
    # Return the flask json response with returned data from MongoDB
    return bson_to_json_response(bson_data)

# Route for all crimes near location by type count endpoint
@app.route('/crimes-near-location-by-type-count')
def crimes_near_location_by_type_count():
    # Detail required parameters
    required_params = [ 
                        {"name": "longitude", "type": "longitude"},
                        {"name": "latitude", "type": "latitude"},
                        {"name": "distance", "type": "distance"},
                        {"name": "crime-type", "type": "crime-type"}
                    ]

    # Get sanitised query paramteres using Sanitiser and required_params
    parameters = sanitiser.get_sanitised_params(request.args, required_params)

    # If there are any errors with query parameters, return the error instead
    if "Invalid Request" in parameters:
        return jsonify(parameters)
    
    # Otherwise, create a query dict for MongoDB
    query = [
        {
            "$geoNear": {
                "near": {
                    "type": "Point" ,
                    "coordinates": [ parameters["latitude"] , parameters["longitude"] ]
                },
                "distanceField": "dist.calculated",
                "maxDistance": parameters["distance"]
                }
        },
        {
            "$match": {
                "crime_type" : parameters["crime-type"]
            }
        },
        {"$count": "count"}
    ]

    # Use Query on crimes collection
    bson_data = crimes_collection.aggregate(query)
    # Return the flask json response with returned data from MongoDB
    return bson_to_json_response(bson_data)


# Get all crimes in month by type
@app.route('/crimes-in-month-by-type')
def crimes_in_month_by_type():
    # Set the required parameters
    required_params = [
        {"name": "crime-type", "type": "crime-type"},
        {"name": "date", "type": "date"}
    ]

    # Get sanitised query parameters
    parameters = sanitiser.get_sanitised_params(request.args, required_params)
    # Check if parameters have no errors
    if "Invalid Request" in parameters:
        return jsonify(parameters)

    # Form Query
    query = {
            "date" : parameters["date"],
            "crime_type": parameters["crime-type"]
    }

    # Send Query and jsonify response
    bson_data = crimes_collection.find(query)
    return bson_to_json_response(bson_data)

# Get all crimes in month by type count
@app.route('/crimes-in-month-by-type-count')
def crimes_in_month_by_type_count():
    # Set the required parameters
    required_params = [
        {"name": "crime-type", "type": "crime-type"},
        {"name": "date", "type": "date"}
    ]

    # Get sanitised query parameters
    parameters = sanitiser.get_sanitised_params(request.args, required_params)
    # Check if parameters have no errors
    if "Invalid Request" in parameters:
        return jsonify(parameters)

    # Form Query
    query = {
        "date" : parameters["date"],
        "crime_type": parameters["crime-type"]
    }

    # Send Query and jsonify response
    count = crimes_collection.count(query)
    return bson_to_json_response([{"count": count}])


# Route for all crimes near location in month by type endpoint
@app.route('/crimes-near-location-in-month-by-type')
def crimes_near_location_in_month_by_type():
    # Detail required parameters
    required_params = [ 
                        {"name": "longitude", "type": "longitude"},
                        {"name": "latitude", "type": "latitude"},
                        {"name": "distance", "type": "distance"},
                        {"name": "date", "type": "date"},
                        {"name": "crime-type", "type": "crime-type"}
                    ]

    # Get sanitised query paramteres using Sanitiser and required_params
    parameters = sanitiser.get_sanitised_params(request.args, required_params)

    # If there are any errors with query parameters, return the error instead
    if "Invalid Request" in parameters:
        return jsonify(parameters)
    
    # Otherwise, create a query dict for MongoDB
    query = [
        {
            "$geoNear": {
                "near": {
                    "type": "Point" ,
                    "coordinates": [ parameters["latitude"] , parameters["longitude"] ]
                },
                "distanceField": "dist.calculated",
                "maxDistance": parameters["distance"]
                }
        },
        {
            "$match": {
                 "date" : parameters["date"]
            }
        },
        {
            "$match": {
                "crime_type" : parameters["crime-type"]
            }
        }
    ]

    # Use Query on crimes collection
    bson_data = crimes_collection.aggregate(query)
    # Return the flask json response with returned data from MongoDB
    return bson_to_json_response(bson_data)

# Route for all crimes near location in month by type count endpoint
@app.route('/crimes-near-location-in-month-by-type-count')
def crimes_near_location_in_month_by_type_count():
    # Detail required parameters
    required_params = [ 
                        {"name": "longitude", "type": "longitude"},
                        {"name": "latitude", "type": "latitude"},
                        {"name": "distance", "type": "distance"},
                        {"name": "date", "type": "date"},
                        {"name": "crime-type", "type": "crime-type"}
                    ]

    # Get sanitised query paramteres using Sanitiser and required_params
    parameters = sanitiser.get_sanitised_params(request.args, required_params)

    # If there are any errors with query parameters, return the error instead
    if "Invalid Request" in parameters:
        return jsonify(parameters)
    
    # Otherwise, create a query dict for MongoDB
    query = [
        {
            "$geoNear": {
                "near": {
                    "type": "Point" ,
                    "coordinates": [ parameters["latitude"] , parameters["longitude"] ]
                },
                "distanceField": "dist.calculated",
                "maxDistance": parameters["distance"]
                }
        },
        {
            "$match": {
                 "date" : parameters["date"]
            }
        },
        {
            "$match": {
                "crime_type" : parameters["crime-type"]
            }
        },
        {"$count": "count"}
    ]

    # Use Query on crimes collection
    bson_data = crimes_collection.aggregate(query)
    # Return the flask json response with returned data from MongoDB
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
    # crime_types = all_crime_types()
    # print(crime_types)
    # Create a sanitiser object
    sanitiser = Sanitiser()

    # Run the backend server
    app.run(host='0.0.0.0', debug=True)

    
