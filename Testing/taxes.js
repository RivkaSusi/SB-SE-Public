// file with js code we're testing

function calculateTaxes(income) {
    if (!Number.isFinite(income)){
        throw new Error('Invalid income!')
    }
    if (income > 30000) {
      return income * 0.25;
    } else {
      return income * 0.15;
    }
  }

  
  console.log(calculateTaxes(500))

  function removeDupes(values){
    const arr = [...new Set(values)] //turned into set and turned into array
    if (typeof values === 'string') return arr.join('') //can now also pass in string
    return arr;
  }