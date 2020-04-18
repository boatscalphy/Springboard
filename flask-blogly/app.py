"""Blogly application."""

from flask import Flask, render_template, flash, request, redirect
from flask_debugtoolbar import DebugToolbarExtension
from models import *
from datetime import datetime

app = Flask(__name__)
app.debug = True
app.config['SECRET_KEY'] = 'password1'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
toolbar = DebugToolbarExtension(app)

connect_db(app)
db.create_all()

def datetimeformat(value, format='%m-%d-%Y %H:%M'):
    return value.strftime(format)

app.jinja_env.filters['datetimeformat'] = datetimeformat

@app.route('/')
def home():
    posts = Post.query.order_by(Post.created_at.desc()).limit(5)
    return render_template('index.html',posts = posts)

@app.route('/users')
def users():
    users = User.query.all()
    return render_template('users.html', users=users)

@app.route('/create_user', methods=["GET", "POST"])
def create_form():
    if request.method == "GET":
        return render_template('create_form.html')
    else:
        first_name = request.form.get("first_name")
        last_name = request.form.get("last_name")
        img_url = request.form.get('img_url')
        if img_url == "":
            new_user = User(first_name = first_name, last_name = last_name)
        else:
            new_user = User(first_name = first_name, last_name = last_name, img_url = img_url)

        db.session.add(new_user)
        db.session.commit()
        flash(f'User Created: {new_user.first_name} {new_user.last_name}')
        return redirect('/users')

@app.route('/user/id/<int:user_id>', methods=["GET", "POST"])
def profile(user_id):
    user = User.query.get_or_404(user_id)
    posts = Post.query.filter_by(author_id=user_id)    

    if request.method == "GET":
        return render_template('user.html', user=user, posts=posts)

    else:
        first_name = request.form.get("first_name")
        last_name = request.form.get("last_name")
        img_url = request.form.get("img_url")

        if first_name is not "":
            user.first_name = first_name
        if last_name is not "":
            user.last_name = last_name
        if user.image_url is not img_url and img_url is not "":
            user.image_url = img_url

        db.session.commit()
        flash('Successfully edited!')
        return redirect(f'/user/id/{user_id}')

@app.route('/user/delete/<int:user_id>', methods=["POST"])
def delete_user(user_id):
    user = User.query.get(user_id)
    db.session.delete(user)
    db.session.commit()
    flash('User deleted')
    return redirect('/users')

@app.route('/user/id/<int:user_id>/posts/new', methods=["GET", "POST"])
def new_post(user_id):
    user = User.query.get_or_404(user_id)
    
    if request.method == "GET":
        tags = Tag.query.all()
        return render_template('new_post.html', user=user, tags=tags)

    else:
        title = request.form.get('title')
        content = request.form.get('post-content')
        tags = request.form.getlist('tags')
        post = Post(title=title, post_content=content, author_id=user.id)
        db.session.add(post)
        db.session.commit()
        if len(tags) > 0:
            for tag in tags:
                tag_id = Tag.query.filter_by(name=tag).first().id
                print('-----------------------------------------')
                print(tag_id)
                print('-----------------------------------------')
                post_tag = PostTag(post_id=post.id, tag_id=tag_id)
                db.session.add(post_tag)
                db.session.commit()
        flash('Post successful!')
        return redirect(f'/user/id/{user_id}')

@app.route('/posts')
def show_posts():
    posts = Post.query.order_by(Post.created_at.desc()).limit(10)
    return render_template('show_posts.html', posts = posts)

@app.route('/posts/<int:post_id>')
def show_post(post_id):
    post = Post.query.get_or_404(post_id)
    tags = PostTag.query.filter_by(post_id=post_id).all()
    return render_template('posts.html', post = post, tags=tags)

@app.route('/posts/<int:post_id>/edit', methods=["GET", "POST"])
def edit_post(post_id):
    post = Post.query.get_or_404(post_id)

    if request.method == "GET":
        tags = Tag.query.all()
        return render_template('edit_post.html', post=post, tags=tags)
    
    else:
        title = request.form.get('title')
        post_content = request.form.get('post-content')
        tags = request.form.getlist('tags')
        post.title = title
        post.post_content = post_content

        db.session.commit()
        return redirect(f'/posts/{post_id}')

@app.route('/posts/<int:post_id>/delete', methods=["POST"])
def delete_post(post_id):
    post = Post.query.filter_by(id=post_id).first()
    db.session.delete(post)
    db.session.commit()
    return redirect('/posts')

@app.route('/tags')
def show_tags():
    tags = Tag.query.all()
    return render_template('show_tags.html', tags = tags)

@app.route('/tags/new', methods=["GET", "POST"])
def create_tag():

    if request.method == "GET":
        return render_template('create_tag.html')
    else:
        tag_name = request.form.get('tag_name')
        if tag_name is not "":
            new_tag = Tag(name=tag_name)
            db.session.add(new_tag)
            db.session.commit()
            return redirect('/tags')

@app.route('/tags/<int:tag_id>')
def show_tag(tag_id):
    tag_name = Tag.query.filter_by(id=tag_id).first()
    posts = PostTag.query.filter_by(tag_id = tag_id).all()
    return render_template('tag_posts.html', posts=posts, tag_name=tag_name.name, tag_id=tag_id)

@app.route('/tags/<int:tag_id>/delete', methods=["POST"])
def delete_tag(tag_id):
    Tag.query.filter_by(id=tag_id).delete()
    db.session.commit()
    return redirect('/tags')



