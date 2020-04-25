"""Flask app for Cupcakes"""
from flask import Flask, redirect, jsonify, request, render_template
from models import db, connect_db, Cupcake

app = Flask(__name__)

app.debug = True
app.config["SECRET_KEY"] = 'password1'
app.config["SQLALCHEMY_DATABASE_URI"] = 'postgresql:///cupcakes'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True

connect_db(app)

def create_json(item):
    return {
        "id":item.id,
        "flavor":item.flavor,
        "size":item.size,
        "rating":item.rating,
        "image":item.image
    }
    
@app.route('/')
def index():
    return render_template('index.html')
@app.route('/api/cupcakes', methods=["GET", "POST"])
def get_cupcakes():
    cupcakes = Cupcake.get_cupcakes()

    if request.method == "GET":
        return jsonify({"cupcakes":[create_json(c) for c in cupcakes]})

    else:
        flavor = request.json.get("flavor")
        size = request.json.get("size")
        rating = request.json.get("rating")
        image = request.json.get("image")
        new_cupcake = Cupcake(flavor=flavor, size=size, rating=rating, image=image)
        db.session.add(new_cupcake)
        db.session.commit()
        return {"cupcake":create_json(new_cupcake)}

@app.route('/api/cupcakes/<int:id>', methods=["GET", "PATCH", "DELETE"])
def get_cupcake(id):
    cupcake = Cupcake.query.get_or_404(id)

    if request.method == "GET":
        return {"cupcake":create_json(cupcake)}

    elif request.method == "PATCH":
        cupcake.flavor = request.json.get("flavor")
        cupcake.size = request.json.get("size")
        cupcake.rating = request.json.get("rating")
        cupcake.image = request.json.get("image")
        db.session.commit()
        return {"cupcake":create_json(cupcake)}

    else:
        db.session.delete(cupcake)
        db.session.commit()
        return {"message": "Deleted"}