# Put your app in here.
from flask import Flask, request
import operations

app = Flask(__name__)

@app.route('/')
def main():
    return 'Hello!'

@app.route('/math/<operation>')
def math(operation):
    a = float(request.args['a'])
    b = float(request.args['b'])

    if operation == 'add':
        return f'{a} + {b} = {operations.add(a,b)}'
    elif operation == 'sub':
        return f'{a} - {b} = {operations.sub(a,b)}'
    elif operation == 'mult':
        return f'{a} * {b} = {operations.mult(a,b)}'
    elif operation == 'div':
        return f'{a} / {b} = {operations.div(a,b)}'
    else:
        return 'Invalid operation'