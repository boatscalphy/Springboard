from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)

class Pet(db.Model):

    __tablename__ = 'pets'

    def __repr__(cls):
        return cls.name

    id = db.Column(db.Integer, 
        primary_key = True,
        auto_increment = True
    )

    name = db.Column(db.Text, nullable = False)

    age = db.Column(db.Integer)

    species = db.Column(db.Text, nullable = False)

    photo_url = db.Column(db.Text, default="https://www.997wooffm.com/wp-content/uploads/2019/01/noimagedog.jpg")

    notes = db.Column(db.Text)

    available = db.Column(db.Boolean, nullable = False, default=True)

    @classmethod
    def get_pets(cls):
        return db.session.query(cls).all()
    
    @classmethod
    def add_pet(cls, name, age, species, notes, photo_url=None):
        db.session.add(cls(name=name, age=age, species=species, notes=notes, photo_url=photo_url))
        db.session.commit()
        return True