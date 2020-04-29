from flask import Flask, session, render_template, flash, redirect, request
from flask_bcrypt import Bcrypt
from models import db, connect_db, User
from forms import UserRegistration, UserLogin

app = Flask(__name__)
bcrypt = Bcrypt(app)

app.debug = True
app.config["SECRET_KEY"] = 'password1'
app.config["SQLALCHEMY_DATABASE_URI"] = 'postgresql:///authentication'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True

connect_db(app)

@app.route('/')
def index():
    if session.get('user'):
        return 'loggedin'
    else:    
        return redirect('/register')

@app.route('/register', methods=["GET", "POST"])
def register():

    form = UserRegistration()
    if form.validate_on_submit():
        first_name = request.form.get('first_name')
        last_name = request.form.get('last_name')
        username = request.form.get('username')
        password = request.form.get('password')
        email = request.form.get('email')
        if User.query.filter_by(username=username).first() is None:
            password_hash = bcrypt.generate_password_hash(password)
            db.session.add(User(first_name=first_name, last_name=last_name, email=email, username=username, password=password_hash))
            db.session.commit()
            session['user'] = username
            return redirect('/secret')
        else:
            form['username'].errors.append('Username already exists.')
            return render_template('register.html', form=form)

    return render_template('register.html', form=form)
@app.route('/login', methods=["GET", "POST"])
def login():

    if request.method == "GET":
        return render_template('login.html')
    if request.method == "POST":
        return 'post'

@app.route('/secret')
def show_secret():
    if session.get('user'):
        return 'this was my secret'
    else:
        return redirect('/register')

@app.route('/logout', methods=["POST"])
def logout():
    session.pop('user', None)
    return redirect('/register')
