describe('tests for payment.js', function() {
    beforeEach(function(){
        billAmtInput.value = 100;
        tipAmtInput.value = 50;
    });

    it('should return falsey if billamt is empty or an object containing the payment', function() {
        expect(createCurPayment()).toEqual({
            billAmt: '100',
            tipAmt: '50',
            tipPercent: 50
        })
        
        billAmtInput.value = "";
        tipAmtInput.value = "";
        expect(createCurPayment()).toBeUndefined();

        tipAmtInput.value = 100;
        expect(createCurPayment()).toBeUndefined();
    })

    it('should update the shift summary table with the totals of the bill amounts, but not update if payment details are empty', function() {
        
    })

    afterEach(function() {
        billAmtInput.value = "";
        tipAmtInput.value = "";
        paymentID = 0;
        allPayments = {};
    })
})