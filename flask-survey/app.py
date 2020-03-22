from flask import Flask, request, render_template, redirect, flash
from flask_debugtoolbar import DebugToolbarExtension
from random import choice
from surveys import *

app = Flask(__name__)

app.debug = False
app.config['SECRET_KEY'] = 'password1'

toolbar = DebugToolbarExtension(app)
response = []
question_num = 0
survey = surveys['satisfaction']

@app.route('/')
def main():
    return render_template('index.html', survey=survey)

@app.route('/questions/<int:id>', methods=['GET', 'POST'])
def questionaire(id):

    if id > len(response):
        flash('Please answer the question below to proceed:')
        return redirect(f'/questions/{len(response)}')

    if id < len(survey.questions):
        question = survey.questions[id].question
        choices = survey.questions[id].choices
        print(len(response))
        return render_template('questions.html', question = question, choices = choices, id=id)
    else:
        print(response)
        return render_template('complete.html')
    
@app.route('/answer/<int:id>', methods=['POST'])
def answer(id):

    if id == len(response):
        response.append(request.form.get('choice'))
    else:
        response[id] = request.form.get('choice')

    return redirect(f'/questions/{id+1}')