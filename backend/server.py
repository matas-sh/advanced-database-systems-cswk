from flask import Flask, request, jsonify
from flask_cors import CORS
import pymongo
import pprint
import json
from bson import json_util

app = Flask(__name__)
CORS(app)

# Helpers =================

def bson_to_json_response(bson_data):
    # Create a JSON object from bson Cursor
    json_obj = json.loads(json.dumps(list(bson_data), default=json_util.default))
    json_data = jsonify(json_obj)
    return json_data

def check_parameter_type_and_bounds(required_params, recieved_params, error_dict, parameter_name, required_type, bounds):
    if parameter_name in recieved_params:
        value = recieved_params[parameter_name]
        try:
            if required_type == "float":
                value = float(value)
            elif required_type == "int":
                value = int(value)
            else:
                print(f"Unknown expected type: {required_type}")
                
            if value > bounds[0] and value <= bounds[1]:
                recieved_params[parameter_name] = value
            else:
                error_dict["Invalid Request"].setdefault("Out of Bounds Error", list()).append(f"{parameter_name} - Must be ({bounds[0]} < x <= {bounds[1]}) but recieved: {value}")
        except ValueError:
            error_dict["Invalid Request"].setdefault("Type Error", list()).append(f"{parameter_name} - Expected type ({required_type}) but recieved: {value}")
    else:
        error_dict["Invalid Request"].setdefault("Missing parameter(s)", list()).append(parameter_name)

def get_sanitised_params(required_params):
    errors = {"Invalid Request": {}}

    # Get parameters
    recieved_params = dict(request.args)

    # Parameter Checking
    for parameter_detail in required_params:
        check_parameter_type_and_bounds(required_params, recieved_params, errors, parameter_detail[0], parameter_detail[1], parameter_detail[2])
    
    if errors["Invalid Request"]:
        return errors
    else:
        return recieved_params

# Routes =================

@app.route('/')
def index():
    return "Nothing is here yet"

@app.route('/crimes-near-location')
def crimes_near_location():
    required_params = [("longitude", "float", (-180.0, 180.0)), ("latitude", "float", (-90.0, 90.0)), ("distance", "int", (0, 1000))]
    
    parameters = get_sanitised_params(required_params)

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

    
