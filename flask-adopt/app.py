from flask import Flask, render_template, redirect
from flask_debugtoolbar import DebugToolbarExtension
from forms import *
from models import *

app = Flask(__name__)
app.debug = True
app.config['SECRET_KEY'] = 'password1'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///pet_adoption'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SQLALCHEMY_ECHO'] = True

toolbar = DebugToolbarExtension(app)

connect_db(app)
db.create_all()

@app.route('/')
def show_home():
    return 'hello'