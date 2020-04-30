from flask import Flask, session, render_template, flash, redirect, request
from flask_bcrypt import Bcrypt
from models import db, connect_db, User, Feedback
from forms import UserRegistration, UserLogin, FeedbackForm

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
        return redirect(f'/users/{session.get("user")}')

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

        if not User.check_user(username):
            password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
            db.session.add(User(first_name=first_name, last_name=last_name, email=email, username=username, password=password_hash))
            db.session.commit()
            session['user'] = username
            return redirect('/secret')

        else:
            form['username'].errors.append('Username already exists.')
            return render_template('register.html', form=form)

    if session.get('user'):
        return redirect(f"/users/{session.get('user')}")

    return render_template('register.html', form=form)

@app.route('/login', methods=["GET", "POST"])
def login():

    form = UserLogin()
    
    if form.validate_on_submit():
        username = request.form.get('username')
        password = request.form.get('password')

        if User.check_user(username):
            user = User.query.filter_by(username=username).one()

            if bcrypt.check_password_hash(user.password, password):
                session['user'] = username
                return redirect(f'/users/{username}')

        else:
            form['username'].errors.append(f"Invalid username/password")
            return render_template('login.html', form=form)

    if session.get('user'):
        return redirect(f"/users/{session['user']}")

    return render_template('login.html', form=form)

@app.route('/secret')
def show_secret():

    if session.get('user'):
        return render_template('secret.html')

    else:
        return redirect('/register')

@app.route('/users/<username>')
def show_user(username):

    if session.get('user'):
        user = User.query.get_or_404(username)
        return render_template('user.html', user=user)

    else:
        return redirect('/register')

@app.route('/users/<username>/delete', methods=["POST"])
def delete_user(username):
    user = User.query.get_or_404(username)

    if session.get('user'):

        if session.get('user') == username:
            db.session.delete(user)
            db.session.commit()
            session.pop('user', None)
            flash(f'{username} has been deleted!')
            return redirect('/register')

    else:
        return {'message': 'You are not allowed to delete this user'}, 401

@app.route('/users/<username>/feedback')
def add_feedback(username):
    return redirect(f'/users/{username}/feedback/add')

@app.route('/users/<username>/feedback/add', methods=["GET", "POST"])
def feedback_form(username):
    form = FeedbackForm()

    if form.validate_on_submit():
        title = request.form.get('title')
        content = request.form.get('content')
        feedback = Feedback(title=title, content=content, username=username)
        db.session.add(feedback)
        db.session.commit()
        flash('Feedback posted!')
        return redirect(f'/users/{username}')

    elif session.get('user') == username:
        return render_template('feedback.html', form=form)

    else:
        return redirect('/register')

@app.route('/logout', methods=["POST"])
def logout():
    session.pop('user', None)
    return redirect('/register')
