describe('Unit tests for helpers.js', function() {

    beforeEach(function() {
        allPayments = {
            payment1: {
                billAmt: 123,
                tipAmt: 1,
                tipPercent: 1
            },

            payment2: {
                billAmt: 100,
                tipAmt: 0,
                tipPercent: 0
            }
        }
    })

    it('should calculate the tip percent', function() {
        expect(calculateTipPercent(100,1)).toEqual(1);
        expect(calculateTipPercent(0,0)).toBeNaN()
    })

    it('should sum the total payments depending on type', function() {
        expect(sumPaymentTotal('billAmt')).toEqual(123+100);
        expect(sumPaymentTotal('tipAmt')).toEqual(1);
        expect(sumPaymentTotal('tipPercent')).toEqual(1);
    })

    it('should create a new row when input is submitted to a td', function() {
        let newTr = document.createElement('tr');
        appendTd(newTr,100);
        expect(newTr.firstChild.innerText).toEqual('100');
        expect(newTr.children.length).toEqual(1);
    })

    afterEach(function() {
        allPayments = {}
    })
});