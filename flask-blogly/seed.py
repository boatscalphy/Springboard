from models import db, User, Post, Tag, PostTag
from app import app

db.drop_all()
db.create_all()

User.query.delete()
Post.query.delete()
Tag.query.delete()
PostTag.query.delete()


calvin = User(first_name='Calvin', last_name='La')
post = Post(title='Test', post_content='Hello', author_id=1)
tag1 = Tag(name='testing')
tag2 = Tag(name='funny')
posttag1 = PostTag(post_id=1, tag_id=1)
posttag2 = PostTag(post_id=1, tag_id=2)
db.session.add(calvin)
db.session.add(post)
db.session.add(tag1)
db.session.add(tag2)
db.session.add(posttag1)
db.session.add(posttag2)
db.session.commit()