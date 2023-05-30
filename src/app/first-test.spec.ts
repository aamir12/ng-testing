describe('First Test Case',() => {
    let testVariable:any;
    beforeEach(()=> {
        testVariable = {};
    })
    it('should return true if is true',() => {
        testVariable.a = true;
        expect(testVariable.a).toBe(true);
    });
})