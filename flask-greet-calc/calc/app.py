# Put your app in here.
from flask import Flask, request
import operations

app = Flask(__name__)

@app.route('/')
def main():
    return 'Hello!'

@app.route('/math/<operation>')
def math(operation):
    
    try:
        a = int(request.args['a'])
        b = int(request.args['b'])
    except:
        return 'Invalid inputs!'

    if operation == 'add':
        return f'{operations.add(a,b)}'
    elif operation == 'sub':
        return f'{operations.sub(a,b)}'
    elif operation == 'mult':
        return f'{operations.mult(a,b)}'
    elif operation == 'div':
        return f'{operations.div(a,b)}'
    else:
        return 'Invalid operation'

@app.route('/add')
def add():
    
    try:
        a = int(request.args['a'])
        b = int(request.args['b'])
    except:
        return 'Invalid inputs!'


    return f'{operations.add(a,b)}'

@app.route('/sub')
def sub():
    
    try:
        a = int(request.args['a'])
        b = int(request.args['b'])
    except:
        return 'Invalid inputs!'


    return f'{operations.sub(a,b)}'

@app.route('/mult')
def mult():
    
    try:
        a = int(request.args['a'])
        b = int(request.args['b'])
    except:
        return 'Invalid inputs!'


    return f'{operations.mult(a,b)}'

@app.route('/div')
def div():
    
    try:
        a = int(request.args['a'])
        b = int(request.args['b'])
    except:
        return 'Invalid inputs!'


    return f'{operations.div(a,b)}'
