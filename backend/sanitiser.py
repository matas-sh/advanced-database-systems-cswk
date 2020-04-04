from datetime import datetime as dt

class Sanitiser():

    # Details for the parameter type requirements
    requirements_info = {
        "longitude": {"type": "float", "bounds": (-180.0, 180.0)},
        "latitude": {"type": "float", "bounds": (-90.0, 90.0)},
        "distance": {"type": "int", "bounds":  (0, 10000)},
        "date1": {"type": "date", "bounds": (dt(2018, 2, 1), dt(2020, 1, 1)), "format": "YYYY-MM"},
        "date2": {"type": "date", "bounds": (dt(2018, 2, 1), dt(2020, 1, 1)), "format": "YYYY-MM"}
    }

    requirements_info_enum = {
        "crime-type": {"set": [
            'Anti-social behaviour', 'Bicycle theft', 'Burglary', 'Criminal damage and arson', 
            'Drugs', 'Other crime', 'Other theft', 'Possession of weapons', 'Public order', 
            'Robbery', 'Shoplifting', 'Theft from the person', 'Vehicle crime', 'Violence and sexual offences'
            ],
            "allowed_mult": True
        },
        "option": {"set": [
            'count', 'grouped'
            ],
            "allowed_mult": False
        }
    }

    """
    General checking for all possible parameters.

    Args:
    parameter_name -- The name of the parameter that is being checked.
    parameter_value -- The value of the parameter that is being checked.
    error_dict -- The dictionary of errors, any new errors with parameter is appended.
    """
    def check_parameter(self, parameter_name, parameter_value, error_dict):
        if parameter_name in self.requirements_info:
            # Get the type and bounds of the parameter from the requirements_info dictionary
            required_type = self.requirements_info[parameter_name]["type"]
            required_bounds = self.requirements_info[parameter_name]["bounds"]

            try:
                # Try to parse the type into the type from the requirements_info dictionary
                if required_type == "float":
                    parameter_value = float(parameter_value)

                elif required_type == "int":
                    parameter_value = int(parameter_value)

                elif required_type == "date":
                    # For dates, input must be split by "-" and meet a required format before formatting
                    year_month = parameter_value.split("-")
                    if len(year_month) < 2:
                        # If the format requirement wasn't met, raise FormatError
                        raise FormatError

                    else:
                        # Otherwise try to parse into a datetime
                        parameter_value = dt(int(year_month[0]), int(year_month[1]), 1)

                else:
                    # If required type isn't in requirements_info dictionary
                    print(f"Unknown expected type: {required_type}")
                
                # Check if parsed value is within the required bounds
                if not (parameter_value >= required_bounds[0] and parameter_value <= required_bounds[1]):
                    # Add Out of bounds Error if parameter is outside required bounds
                    error_dict["Invalid Request"].setdefault("Out of Bounds Error", list()).append(f"{parameter_name} - Must be ({required_bounds[0]} <= x <= {required_bounds[1]}) but recieved: {parameter_value}")  
            except ValueError:
                # Return Type Error if parameter couldn't be parsed to required type
                error_dict["Invalid Request"].setdefault("Type Error", list()).append(f"{parameter_name} - Expected type ({required_type}) but recieved: {parameter_value}")
            except FormatError:
                # Return Custom Format Error if parameter doesn't have required format
                parameter_format = self.requirements_info[parameter_name]["format"]
                error_dict["Invalid Request"].setdefault("Incorrect format", list()).append(f"{parameter_name} - Expected format: ({parameter_format}) but recieved: {parameter_value}")
            return parameter_value

    def check_parameter_enum(self, parameter_name, parameter_value, error_dict):
        parameter_value_list = parameter_value.split(",")
        if len(parameter_value_list) > 1 and not self.requirements_info_enum[parameter_name]["allowed_mult"]:
            error_dict["Invalid Request"].setdefault("Too many parameters", list()).append(f"Only one ({parameter_name}) allowed but recieved: {parameter_value_list}")

        for value in parameter_value_list:
            if value not in self.requirements_info_enum[parameter_name]["set"]:
                # If required type isn't in requirements_info dictionary
                error_dict["Invalid Request"].setdefault("Unknown parameter(s)", list()).append(f"Unknown ({parameter_name}) value: {value}")
        return parameter_value_list

    """
    Get sanitised required parameters from request_args
    """
    def get_sanitised_params(self, request_args):
        # Init empty error message
        errors = {"Invalid Request": {}}

        # Get parameters as dictionary
        recieved_params = dict(request_args)

        # For each parameter we require, check if it meets requirements and
        # convert it from a string to the correct type.
        # Modifies error message with all issues with the parameters provided.
        for parameter_name, parameter_value in recieved_params.items():
            if parameter_name in self.requirements_info_enum:
                recieved_params[parameter_name] = self.check_parameter_enum(parameter_name, parameter_value, errors)
            else:
                recieved_params[parameter_name] = self.check_parameter(parameter_name, parameter_value, errors)

        # If anything errored, return the error message
        if errors["Invalid Request"]:
            return errors
        else:
            # Otherwise return the parameters required
            return recieved_params

"""Custom Exception for incorrect format"""
class FormatError(Exception):
    pass