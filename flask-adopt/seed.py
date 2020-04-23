from models import *
from app import app

db.drop_all()
db.create_all()

Sandy = Pet(name="Sandy", species="Squirrel")
db.session.add(Sandy)
db.session.commit()