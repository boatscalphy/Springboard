from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from random import choice
from surveys import *

app = Flask(__name__)

app.debug = False
app.config['SECRET_KEY'] = 'password1'

toolbar = DebugToolbarExtension(app)
survey = surveys['satisfaction']

@app.route('/')
def main():
    return render_template('index.html', survey=survey)

@app.route('/questions/<int:id>', methods=['GET', 'POST'])
def questionaire(id):

    if 'response' not in session:
        return redirect('/')

    if id > len(session['response']):
        flash('Please answer the question below to proceed:')
        question = len(session['response'])
        return redirect(f'/questions/{question}')

    if id < len(survey.questions):
        question = survey.questions[id].question
        choices = survey.questions[id].choices
        return render_template('questions.html', question = question, choices = choices, id=id)
    else:
        return render_template('complete.html')
    
@app.route('/answer/<int:id>', methods=['POST'])
def answer(id):

    if id == len(session['response']):
        session['response'].append(request.form.get('choice'))
        session.modified = True
    else:
        session['response'][id] = request.form.get('choice')
        session.modified = True

    return redirect(f'/questions/{id+1}')

@app.route('/start', methods=['POST'])
def start_survey():
    session['response'] = []
    return redirect('/questions/0')