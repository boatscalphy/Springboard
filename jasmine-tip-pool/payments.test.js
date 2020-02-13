describe('tests for payment.js', function() {
    beforeEach(function(){
        billAmtInput.value = 100;
        tipAmtInput.value = 50;
    });
    
    it('should update the allPayments object with payment details', function() {
        submitPaymentInfo();
        expect(paymentId).toEqual(1)
        expect(allPayments.payment1.billAmt).toEqual('100');
        expect(allPayments.payment1.tipAmt).toEqual('50');
        expect(allPayments.payment1.tipPercent).toEqual(50);
    })
    
    it('should update shift totals', function() {
        submitPaymentInfo();
        expect(summaryTds[0].innerText).toEqual("$100");
        expect(summaryTds[1].innerText).toEqual("$50");
        expect(summaryTds[2].innerText).toEqual("50%");
    })

    it('should not update allPayments object if billAmt is invalid', function() {
        billAmtInput.value = 0;
        tipAmtInput.value = 0;
        submitPaymentInfo();

        expect(paymentId).toEqual(0);
        expect(Object.keys(allPayments).length).toEqual(0);
    })

    it('should return undefined if billamt is empty or an object containing the payment', function() {
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

    it('should create a new row for payment information', function() {
        appendPaymentTable(createCurPayment());
        expect(paymentTbody.rows.length).toEqual(1)

        billAmtInput.value = 100;
        tipAmtInput.value = 50;
        appendPaymentTable(createCurPayment());
        expect(paymentTbody.rows.length).toEqual(2);
    })

    afterEach(function() {
        billAmtInput.value = "";
        tipAmtInput.value = "";
        paymentTbody.innerHTML = "";
        paymentId = 0;
        allPayments = {};
        summaryTds[0].innerText = "";
        summaryTds[1].innerText = "";
        summaryTds[2].innerText = "";
    })
})