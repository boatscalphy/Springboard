"""Models for Playlist app."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Playlist(db.Model):
    """Playlist."""
    
    # ADD THE NECESSARY CODE HERE

    __tablename__ = 'playlists'

    @classmethod
    def get_playlist_songs(cls, id):
        playlists = cls.query.join(PlaylistSong, PlaylistSong.playlist_id == cls.id).join(Song, PlaylistSong.song_id == song.id).all()
        return playlists


    id = db.Column(
        db.Integer,
        primary_key = True
    )

    name = db.Column(db.Text,
        nullable = False
    )

    description = db.Column(db.Text)

    relationship = db.relationship('PlaylistSong', backref="playlists", cascade="all")

    def __repr__(self):
        return f'<{self.name}>'

class Song(db.Model):
    """Song."""
    # ADD THE NECESSARY CODE HERE
    __tablename__ = 'songs'

    id = db.Column(db.Integer,
        primary_key = True
    )

    title = db.Column(db.Text,
        nullable = False
    )

    artist = db.Column(db.Text,
        nullable = False
    )
        
    relationship = db.relationship('PlaylistSong', backref="songs", cascade="all")

    def __repr__(self):
        return f'<{self.title}>'

class PlaylistSong(db.Model):
    """Mapping of a playlist to a song."""

    # ADD THE NECESSARY CODE HERE

    __tablename__ = 'playlistsongs'

    id = db.Column(db.Integer,
        primary_key = True
    )

    playlist_id = db.Column(db.Integer,
        db.ForeignKey('playlists.id')
    )

    song_id = db.Column(db.Integer,
        db.ForeignKey('songs.id', ondelete="CASCADE")
    )


# DO NOT MODIFY THIS FUNCTION
def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)
