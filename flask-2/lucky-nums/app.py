from flask import Flask, render_template, jsonify, request
import requests
import random

app = Flask(__name__)

def check_contents(contents):

    return_error = False
    valid_colors = ['red', 'green', 'blue', 'orange']
    URL = 'http://numbersapi.com'
    
    errors = {}

    num_fact = {}
    year_fact = {}

    name = contents.get('name')
    email = contents.get('email')
    color = contents.get('color').lower()


    try:
        year = int(contents.get('year'))
        if year < 1900 or year > 2000:
            errors.update({"year": ['year input must be between 1900 and 2000']})
            return_error = True
    except ValueError:
            errors.update({"year": ["please enter a valid year"]})
            return_error = True

    if name is "":
        errors.update({"name": ['name input is required']})
        return_error = True
    
    if email is "":
        errors.update({"email": ['email input is required']})
        return_error = True

    if color is "":
        errors.update({'color': ['color input is required']})
        return_error = True
    
    elif color not in valid_colors:
        errors.update({'color': ['color must be one of: red, green, orange, or blue']})
        return_error = True
    
    if return_error:
        return {"errors": errors}

    else:
        lucky_num = random.randint(0,100)
        headers = {"Content-Type": "application/json"}

        req_num = requests.get(f'{URL}/{lucky_num}', headers=headers)
        num_data = req_num.json()
        num_fact["fact"] = num_data['text']
        num_fact["num"] = num_data['number']

        req_year = requests.get(f'{URL}/{year}/year', headers=headers)
        year_data = req_year.json()
        year_fact["fact"] = year_data['text']
        year_fact["num"] =  year_data['number']
        
        return {
            "num": num_fact,
            "year": year_fact
        }

@app.route("/")
def homepage():
    """Show homepage."""

    return render_template("index.html")

@app.route('/api/get-lucky-num', methods = ["POST"])
def lucky_num():

    contents = request.get_json(force=True)
    res = check_contents(contents)

    return jsonify(res)

