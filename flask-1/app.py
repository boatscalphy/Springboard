from flask import Flask, session, request, flash, render_template, redirect
from flask_debugtoolbar import DebugToolbarExtension
from forex_python.converter import CurrencyRates, CurrencyCodes

app = Flask(__name__)

app.debug = True
app.config['SECRET_KEY'] = 'password1'

toolbar = DebugToolbarExtension(app)

# Assigning forex objects
rates = CurrencyRates(force_decimal=False)
codes = CurrencyCodes()
# Getting list of available currency abbreviations
ABR = [key for key in rates.get_rates('USD').keys()]
ABR.sort()

# Define functions to:
#   1. Check input amount is a valid float.
def check_input(string):
    try:
        float(string)
        return True
    except ValueError:
        return False

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html', ABR=ABR)

@app.route('/forex')
def convert_currency():
    
    if 'from' in request.args and 'to' in request.args and 'amount' in request.args:
        currency_from = request.args.get('from')
        currency_to = request.args.get('to')
        currency_amount = request.args.get('amount')
        print(True)

        if check_input(currency_amount) and currency_from in ABR and currency_to in ABR:
            
            conversion_rate = rates.get_rate(currency_from, currency_to)
            original_amount = '{:,.2f}'.format(float(currency_amount))
            conversion_amount = '{:,.2f}'.format(round(float(currency_amount) * conversion_rate,2))
            amount = f'{conversion_amount} {currency_to}'
            return render_template('forex.html', currency_from = currency_from, currency_to = currency_to, original_amount = original_amount, amount = amount)

        else:

            if not currency_from in ABR:
                flash(f'Invalid conversion: {currency_from}')
            
            if not currency_to in ABR:
                flash(f'Invalid conversion: {currency_to}')

            if not check_input(currency_amount):
                flash('Invalid amount please input a valid amount')

    return redirect('/')
