from models import *
from app import app

db.drop_all()
db.create_all()

Meepo = Pet(name="Meepo", species="Dog", available=False)
Sandy = Pet(name="Sandy", species="Squirrel")
Goldie = Pet(name="Goldie", species="Dog", notes=None)
Beau = Pet(name="Beau", species="Deer", age="5", photo_url=None, notes=None)
db.session.add(Sandy)
db.session.add(Meepo)
db.session.add(Goldie)
db.session.add(Beau)
db.session.commit()