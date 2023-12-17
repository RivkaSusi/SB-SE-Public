//hasOddNumber - accepts an array and returns true if the array contains at least one odd number, otherwise it returns false.
function hasOddNumber(arr){
    return arr.some(function(val){
      return val % 2 !== 0;
    })
  }
//hasAZero - accepts a number and returns true if that number contains at least one zero. Otherwise, the function should return false.
function hasAZero(num){
    return num.toString().split('').some(function(val){
      return val === '0';
    })
  }
//hasOnlyOddNumbers - accepts an array and returns true if every single number in the array is odd. If any of the values in the array are not odd, the function should return false.
function hasOnlyOddNumbers(arr){
    return arr.every(function(val){
      return val % 2 !== 0;
    })
  }
//hasNoDuplicates - accepts an array and returns true if there are no duplicate values (more than one element in the array that has the same value as another). If there are any duplicates, the function should return false.
function hasNoDuplicates(arr){
    return arr.every(function(val){
      return arr.indexOf(val) === arr.lastIndexOf(val);
    });
  }
//hasCertainKey - accepts an array of objects and a key, and returns true if every single object in the array contains that key. Otherwise it should return false.
function hasCertainKey(arr, key){
    return arr.every(function(val){
      return key in val
    })
  }
//hasCertainValue - accepts an array of objects and a key, and a value, and returns true if every single object in the array contains that value for the specific key. Otherwise it should return false.
function hasCertainValue(arr, key, searchValue){
    return arr.every(function(val){
      return val[key] === searchValue;
    })
  }