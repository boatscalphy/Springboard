from models import db, Song, Playlist, PlaylistSong
from app import app

db.drop_all()
db.create_all()

song1 = Song(title='dancing in the dark', artist='Joji')
song2 = Song(title='demons', artist='Joji')
playlist = Playlist(name='my playlist', description='test')
db.session.add(song1)
db.session.add(song2)
db.session.add(playlist)
db.session.commit()

playlistsong1 = PlaylistSong(song_id = song1.id, playlist_id = playlist.id)
playlistsong2 = PlaylistSong(song_id = song2.id, playlist_id = playlist.id)
db.session.add(playlistsong1)
db.session.add(playlistsong2)
db.session.commit()
