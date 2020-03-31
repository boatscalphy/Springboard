from unittest import TestCase
from app import *

app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

class Forex(TestCase):

    def test_check_input(self):
        self.assertEqual(check_input('102.12'), True)
        self.assertEqual(check_input('hello'), False)
        self.assertEqual(check_input('102hs.00'), False)

    def test_index(self):
        with app.test_client() as client:
            resp = client.get('/')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<title>Currency Conversion</title>', html)
            
    def test_forex(self):
        with app.test_client() as client:
            resp = client.get('/forex')

            self.assertEqual(resp.status_code, 302)
            
            resp = client.get('/forex', follow_redirects=True)
            html = resp.get_data(as_text=True)
            
            self.assertEqual(resp.status_code, 200)
            self.assertIn('<title>Currency Conversion</title>', html)

            resp = client.get('/forex?from=USD&to=USD&amount=1')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<title>Foreign Exchange</title>', html)
            self.assertIn('Converting 1.00 USD to USD equates to: 1.00 USD', html)

            resp = client.get('/forex?from=AAA&to=BBB&amount=abc')

            self.assertEqual(resp.status_code, 302)

            resp = client.get('/forex?from=AAA&to=BBB&amount=abc', follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Invalid conversion: AAA', html)
            self.assertIn('Invalid conversion: BBB', html)
            self.assertIn('Invalid amount please input a valid amount', html)

    def test_forex_to_index_home(self):
        with app.test_client() as client:
            resp = client.post('/')
            html = resp.get_data(as_text=True)
            
            self.assertEqual(resp.status_code, 200)
            self.assertIn('<title>Currency Conversion</title>', html)
                
