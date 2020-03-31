from boggle import Boggle
from flask import Flask, render_template, session, flash, redirect, request, jsonify
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.debug = True
app.config['SECRET_KEY'] = 'password1'

toolbar = DebugToolbarExtension(app)

boggle_game = Boggle()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/play_boggle', methods=['POST'])
def generate_game():
    boggle_board = boggle_game.make_board()
    session['board'] = boggle_board
    return redirect('play_boggle')

@app.route('/play_boggle')
def game():
    if 'visits' in session:
        session['visits'] = session['visits'] + 1
    else:
        session['visits'] = 1
    return render_template('boggle.html')

@app.route('/submit_word', methods=['POST'])
def check_word():
    word = request.json['test-word']
    return jsonify({"result":boggle_game.check_valid_word(session['board'], word)})

