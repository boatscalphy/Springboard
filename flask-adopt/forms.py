from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SelectField, BooleanField
from wtforms.validators import InputRequired, Optional


class AddPetForm(FlaskForm):

    name = StringField('Pet Name', validators=[InputRequired()])
    species = SelectField('Species', validators=[InputRequired()], choices=[('dog', 'Dog'), ('cat', 'Cat'), ('porcupine', 'Porcupine')])
    photo_url = StringField('Photo URL', validators=[Optional()])
    age = IntegerField('Age', validators=[InputRequired()])
    notes = TextAreaField('Notes', validators=[Optional()])

class EditPetForm(FlaskForm):
    photo_url = StringField('Photo URL', validators=[Optional()])
    notes = TextAreaField('Notes', validators=[Optional()])
    available = BooleanField('Available', default="checked")