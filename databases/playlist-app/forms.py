"""Forms for playlist app."""

from wtforms import SelectField, StringField, SelectMultipleField
from wtforms.validators import InputRequired
from flask_wtf import FlaskForm


class PlaylistForm(FlaskForm):
    """Form for adding playlists."""

    # Add the necessary code to use this form
    name = StringField('Playlist Name', validators = [InputRequired()])

    description = StringField('Description', validators = [InputRequired()])

class SongForm(FlaskForm):
    """Form for adding songs."""
    # Add the necessary code to use this form

    title = StringField('Title', validators = [InputRequired()])

    artist = StringField('Artist', validators = [InputRequired()])


# DO NOT MODIFY THIS FORM - EVERYTHING YOU NEED IS HERE
class NewSongForPlaylistForm(FlaskForm):
    """Form for adding a song to playlist."""

    song = SelectMultipleField('Song To Add', coerce=int)
