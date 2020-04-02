from datetime import datetime as dt

class Sanitiser():

    # Details for the parameter type requirements
    requirements_info = {
        "longitude": {"type": "float", "bounds": (-180.0, 180.0)},
        "latitude": {"type": "float", "bounds": (-90.0, 90.0)},
        "distance": {"type": "int", "bounds":  (0, 10000)},
        "date": {"type": "date", "bounds": (dt(2018, 2, 1), dt(2020, 1, 1)), "format": "YYYY-MM"}
    }

    requirements_info_enum = {
        "crime-type": {"set": [
            'Anti-social behaviour', 'Bicycle theft', 'Burglary', 'Criminal damage and arson', 
            'Drugs', 'Other crime', 'Other theft', 'Possession of weapons', 'Public order', 
            'Robbery', 'Shoplifting', 'Theft from the person', 'Vehicle crime', 'Violence and sexual offences'
            ]
        }
    }

    """
    General checking for all possible parameters.

    Args:
    recieved_params -- Dictionary of the parameters provided, to be checked and sanitised.
    parameter_name -- The name of the parameter that is being checked.
    parameter_type -- The type of the parameter that is being checked.
    error_dict -- The dictionary of errors, any new errors with parameter is appended.
    """
    def check_parameter(self, recieved_params, parameter_name, parameter_type, error_dict):
        # Check if parameter has actually been provided
        if parameter_name in recieved_params:

            # Get the type and bounds of the parameter from the requirements_info dictionary
            required_type = self.requirements_info[parameter_type]["type"]
            required_bounds = self.requirements_info[parameter_type]["bounds"]

            # Get the value for the parameter
            value = recieved_params[parameter_name]

            try:
                # Try to parse the type into the type from the requirements_info dictionary
                if required_type == "float":
                    value = float(value)
                elif required_type == "int":
                    value = int(value)
                elif required_type == "date":

                    # For dates, input must be split by "-" and meet a required format before formatting
                    year_month = value.split("-")
                    if len(year_month) < 2:
                        # If the format requirement wasn't met, raise FormatError
                        raise FormatError
                    else:
                        # Otherwise try to parse into a datetime
                        value = dt(int(year_month[0]), int(year_month[1]), 1)
                else:
                    # If required type isn't in requirements_info dictionary
                    print(f"Unknown expected type: {required_type}")
                
                # Check if parsed value is within the required bounds
                if value >= required_bounds[0] and value <= required_bounds[1]:
                    # Update paramter to parsed value
                    recieved_params[parameter_name] = value
                else:
                    # Add Out of bounds Error if parameter is outside required bounds
                    error_dict["Invalid Request"].setdefault("Out of Bounds Error", list()).append(f"{parameter_name} - Must be ({required_bounds[0]} <= x <= {required_bounds[1]}) but recieved: {value}")
            except ValueError:
                # Return Type Error if parameter couldn't be parsed to required type
                error_dict["Invalid Request"].setdefault("Type Error", list()).append(f"{parameter_name} - Expected type ({required_type}) but recieved: {value}")
            except FormatError:
                # Return Custom Format Error if parameter doesn't have required format
                date_format = self.requirements_info[parameter_type]["format"]
                error_dict["Invalid Request"].setdefault("Incorrect date format", list()).append(f"{parameter_name} - Expected format: ({date_format})  but recieved: {value}")
        else:
            # Add to error message if parameter is missing
            error_dict["Invalid Request"].setdefault("Missing parameter(s)", list()).append(parameter_name)

    def check_parameter_enum(self, recieved_params, parameter_name, parameter_type, error_dict):
        if parameter_name in recieved_params:
            value = recieved_params[parameter_name]
            if value in self.requirements_info_enum[parameter_type]["set"]:
                recieved_params[parameter_name] = value
            else:
                # If required type isn't in requirements_info dictionary
                error_dict["Invalid Request"].setdefault("Unknown parameter(s)", list()).append(f"Unknown ({parameter_name}) value: {value}")
        else:
            # Add to error message if parameter is missing
            error_dict["Invalid Request"].setdefault("Missing parameter(s)", list()).append(parameter_name)

    """
    Get sanitised required parameters from request_args
    """
    def get_sanitised_params(self, request_args, required_params):
        # Init empty error message
        errors = {"Invalid Request": {}}

        # Get parameters as dictionary
        recieved_params = dict(request_args)

        # For each parameter we require, check if it exists, meets requirements and
        # convert it from a string to the correct type.
        # Modifies error message with all issues with the parameters provided.
        for parameter in required_params:
            param_type = parameter["type"]
            if param_type in self.requirements_info_enum:
                self.check_parameter_enum(recieved_params, parameter["name"], param_type, errors)
            else:
                self.check_parameter(recieved_params, parameter["name"], param_type, errors)

        # If anything errored, return the error message
        if errors["Invalid Request"]:
            return errors
        else:
            # Otherwise return the parameters required
            return recieved_params

"""Custom Exception for incorrect format"""
class FormatError(Exception):
    pass