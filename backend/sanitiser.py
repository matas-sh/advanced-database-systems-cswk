from datetime import datetime as dt

class Sanitiser():

    requirements_info = {
        "longitude": {"type": "float", "bounds": (-180.0, 180.0)},
        "latitude": {"type": "float", "bounds": (-90.0, 90.0)},
        "distance": {"type": "int", "bounds":  (0, 1000)},
        "date": {"type": "date", "bounds": (dt(2018, 2, 1), dt(2020, 1, 1)), "format": "YYYY-MM"}
    }

    def check_parameter_type_and_bounds(self, recieved_params, parameter_name, error_dict):
        if parameter_name in recieved_params:

            required_type = self.requirements_info[parameter_name]["type"]
            required_bounds = self.requirements_info[parameter_name]["bounds"]

            value = recieved_params[parameter_name]
            try:
                if required_type == "float":
                    value = float(value)
                elif required_type == "int":
                    value = int(value)
                elif required_type == "date":
                    year_month = value.split("-")
                    if len(year_month) < 2:
                        raise FormatError
                    else:
                        value = dt(int(year_month[0]), int(year_month[1]), 1)
                else:
                    print(f"Unknown expected type: {required_type}")
                
                if value >= required_bounds[0] and value <= required_bounds[1]:
                    recieved_params[parameter_name] = value
                else:
                    error_dict["Invalid Request"].setdefault("Out of Bounds Error", list()).append(f"{parameter_name} - Must be ({required_bounds[0]} <= x <= {required_bounds[1]}) but recieved: {value}")
            except ValueError:
                error_dict["Invalid Request"].setdefault("Type Error", list()).append(f"{parameter_name} - Expected type ({required_type}) but recieved: {value}")
            except FormatError:
                date_format = self.requirements_info[parameter_name]["format"]
                error_dict["Invalid Request"].setdefault("Incorrect date format", list()).append(f"{parameter_name} - Expected format: {date_format}")
        else:
            error_dict["Invalid Request"].setdefault("Missing parameter(s)", list()).append(parameter_name)

    def get_sanitised_params(self, request_args, required_params):
        errors = {"Invalid Request": {}}

        # Get parameters
        recieved_params = dict(request_args)

        # Parameter Checking
        for parameter_name in required_params:
            self.check_parameter_type_and_bounds(recieved_params, parameter_name, errors)

        if errors["Invalid Request"]:
            return errors
        else:
            return recieved_params

class FormatError(Exception):
    pass