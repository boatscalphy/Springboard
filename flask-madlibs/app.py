from stories import *
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def main():
    return render_template('madlibs.html', lst=story.prompts)
    
@app.route('/story')
def display_story():
    arguments = request.args.to_dict()
    return render_template('story.html', string = story.generate(arguments))
