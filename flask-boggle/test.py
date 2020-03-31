from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle

app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

test_board = [['A','B','C','D','E'], ['F','G','H','I','J'], ['K','L','M','N','O'], ['P','Q','R','S','T'], ['U','V','W','X','Y']]


class FlaskTests(TestCase):

    # TODO -- write tests for every view function / feature!
    def test_index(self):
        with app.test_client() as client:
            resp = client.get('/')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn("<h3>Boggle Instructions</h3>", html)
            self.assertIn("<li>You will have 60 seconds to play the game</li>", html)

    def test_generate_game(self):
        with app.test_client() as client:
            resp = client.post('/play_boggle')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 302)
            self.assertEqual(resp.location, "http://localhost/play_boggle")

            resp = client.post('/play_boggle', follow_redirects=True)
            self.assertEqual(resp.status_code, 200)

    def test_game(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['visits'] = 0 
                change_session['board'] = test_board

            resp = client.get('/play_boggle')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<title>Play Boggle!</title>', html)
            self.assertIn('<td>A</td>', html)

    def test_submit_word(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['board'] = test_board

            resp = client.post('/submit_word', json={'test-word':'jot'})
            json = resp.get_json()

            self.assertEqual(resp.status_code, 200)
            self.assertEqual({'result':'ok'}, json)

            resp = client.post('/submit_word', json={'test-word':'abcde'})
            json = resp.get_json()

            self.assertEqual(resp.status_code, 200)
            self.assertEqual({'result':'not-word'}, json)

            resp = client.post('/submit_word', json={'test-word':'z'})
            json = resp.get_json()

            self.assertEqual(resp.status_code, 200)
            self.assertEqual({'result':'not-on-board'}, json)

            

            



