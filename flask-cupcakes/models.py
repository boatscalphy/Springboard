"""Models for Cupcake app."""
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)

class Cupcake(db.Model):

    @classmethod
    def get_cupcakes(cls):
        return db.session.query(cls).order_by(cls.id).all()

    def __repr__(self):
        return self.flavor

    id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True
    )

    flavor = db.Column(
        db.Text,
        nullable=False
    )

    size = db.Column(
        db.Text,
        nullable=False
    )

    rating = db.Column(
        db.Float,
        nullable=False
    )

    image = db.Column(
        db.Text,
        nullable=False,
        default="https://tinyurl.com/demo-cupcake"
    )

