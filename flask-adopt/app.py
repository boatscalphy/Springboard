from flask import Flask, render_template, redirect
from flask_debugtoolbar import DebugToolbarExtension
from forms import AddPetForm
from models import db, connect_db, Pet

app = Flask(__name__)
app.debug = True
app.config['SECRET_KEY'] = 'password1'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///pet_adoption'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = True
app.config['SQLALCHEMY_ECHO'] = True

toolbar = DebugToolbarExtension(app)

connect_db(app)
db.create_all()

@app.route('/')
def show_home():

    pet_list = Pet.get_pets()
    return render_template('home.html', pet_list=pet_list)

@app.route('/add', methods=["GET", "POST"])
def add_pet():
    form = AddPetForm()
    print(form.validate_on_submit())
    if form.validate_on_submit():
        print('******************************************************')
        name = form.name.data
        species = form.species.data
        age = form.age.data
        image = form.image.data
        notes = form.notes.data
        if image == "":
            Pet.add_pet(name=name, age=age, species=species, notes=notes)
        else:
            Pet.add_pet(name=name, age=age, species=species, notes=notes, photo_url=image)
        return redirect('/')

    return render_template('add_pet.html', form=form)
