// file with Jasmine syntax for testing 

describe('calculteTaxes tests', function(){

    it('should calculate lower-bracket taxes', function () {
        expect(calculateTaxes(10000)).toEqual(1500); //when we execute this function with this value we expect it to equal this value
        expect(calculateTaxes(20000)).toEqual(3000);
      })
      
      it('should calculate higher-bracket taxes', function () {
        expect(calculateTaxes(50000)).toEqual(12500);
        expect(calculateTaxes(80000)).toEqual(20000);
      })
    
      it('should reject invalid incomes', function(){ //need to wrap in separate function for errors
        expect(() => calculateTaxes('ashdjfkl')).toThrowError(); //if you pass in string for income
        expect(() => calculateTaxes([])).toThrowError(); //if you pass in array for income
        expect(() => calculateTaxes(true)).toThrowError(); //if you pass in boolean for income
      })
})

describe('removeDupes tests', function(){

    it('should remove duplicated from an array', function(){
        expect(removeDupes([1,1,2,2,3,4])).toEqual([1,2,3,4])
      })
    
      it('should remove duplicated from an string', function(){
        expect(removeDupes('hello')).toEqual('helo')
      })
})
/* afterEach(function(){
    code in here will run after every 'it', e.g., resetting input.value or an array. This is cleanup code.
})

beforeEach function will run before each 'it', and beforeAll will run before all 'it'. afterAll
*/

  