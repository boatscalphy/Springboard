"""Models for Blogly."""
from flask_sqlalchemy import SQLAlchemy 
from datetime import datetime

db = SQLAlchemy()

def connect_db(app):

    db.app = app
    db.init_app(app)

class User(db.Model):

    __tablename__ = 'users'

    id = db.Column(
        db.Integer,
        primary_key = True,
        autoincrement = True
    )

    first_name = db.Column(
        db.Text,
        nullable = False
    ) 

    last_name = db.Column(
        db.Text,
        nullable = False
    )

    image_url = db.Column(
        db.Text,
        default='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png'
    )

    posts = db.relationship('Post', backref='user', cascade="all, delete-orphan")

class Post(db.Model):

    __tablename__ = 'posts'

    id = db.Column(
        db.Integer,
        primary_key = True,
        autoincrement = True
    )

    title = db.Column(
        db.String(50),
        nullable = False,
    )

    post_content = db.Column(
        db.Text
    )

    created_at = db.Column(
        db.DateTime(timezone=False),
        nullable = False,
        default = datetime.utcnow
    )

    author_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id'),
        nullable = False
    )