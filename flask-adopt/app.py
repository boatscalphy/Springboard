from flask import Flask, render_template, redirect, flash
from flask_debugtoolbar import DebugToolbarExtension
from forms import AddPetForm, EditPetForm
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
    print(form.species.data)
    if form.validate_on_submit():
        print('******************************************************')
        name = form.name.data
        species = form.species.data
        age = form.age.data
        image = form.photo_url.data
        notes = form.notes.data
        if image == "":
            Pet.add_pet(name=name, age=age, species=species, notes=notes)
        else:
            Pet.add_pet(name=name, age=age, species=species, notes=notes, photo_url=image)
        flash('Successfully added pet!')
        return redirect('/')

    return render_template('add_pet.html', form=form)

@app.route('/<int:pet_id>', methods=["GET", "POST"])
def view_pet(pet_id):
    pet = Pet.query.get_or_404(pet_id)
    form = EditPetForm(obj=pet)

    if form.validate_on_submit():
        image = form.photo_url.data
        notes = form.notes.data
        available = form.available.data
        pet.photo_url = image
        pet.notes = notes
        print(available)
        pet.available = available
        db.session.commit()
        flash(f'Successfully Edited {pet.name}!')
        redirect(f'/{pet_id}')

    return render_template('pet.html', pet=pet, form=form)

@app.route('/<int:pet_id>/delete', methods=["POST"])
def delete_pet(pet_id):
    pet = Pet.query.get_or_404(pet_id)
    db.session.delete(pet)
    db.session.commit()
    flash(f'Successfully deleted {pet.name}!')
    return redirect('/')
