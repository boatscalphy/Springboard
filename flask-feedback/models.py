from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)

class User(db.Model):

    __tablename__ = "users"

    @classmethod
    def check_user(cls, username):
        user = cls.query.filter(cls.username.ilike(username)).first()
        return True if user is not None else False

    def __repr__(self):
        return f"<{self.username}>"

    username = db.Column(db.String(20),
        nullable = False,
        unique = True,
        primary_key = True)

    password = db.Column(db.Text,
        nullable = False)
    
    email = db.Column(db.String(50),
        nullable = False,
        unique = True)
    
    first_name = db.Column(db.String(30),
        nullable = False)
        
    last_name = db.Column(db.String(30),
         nullable = False)

    feedback = db.relationship('Feedback', backref="user", cascade="all")

class Feedback(db.Model):

    __tablename__ = "feedback"

    def __repr__(self):
        return f'<{self.title}>'

    id = db.Column(db.Integer,
        primary_key = True)
        
    title = db.Column(db.String(100),
        nullable = False)

    content = db.Column(db.Text,
        nullable = False)

    username = db.Column(db.String(20),
        db.ForeignKey("users.username"),
        nullable = False)
