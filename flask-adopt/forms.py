from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import InputRequired, Optional


class AddPetForm(FlaskForm):

    name = StringField('Pet Name', validators=[InputRequired()])
    species = StringField('Species', validators=[InputRequired()])
    image = StringField('Photo URL', validators=[Optional()])
    age = IntegerField('Age', validators=[InputRequired()])
    notes = TextAreaField('Notes', validators=[Optional()])
