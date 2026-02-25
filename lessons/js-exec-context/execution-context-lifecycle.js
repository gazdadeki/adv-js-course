// ===== Global Execution Context =====
debugger;
console.log("=== Global execution start ===");
console.log(globalValue, 'globalValue');
<<<<<<< Updated upstream
console.log(outer, 'outer in memory before declaration');
=======
>>>>>>> Stashed changes

var globalValue = 2;

function outer(a) {
  debugger;
  var result = a + a;

  console.log('inner function declaration', inner);
  function inner(b) {
    debugger

    console.log('innerResult before declaration', innerResult)
    var innerResult = b * b

    return innerResult;
  }

  inner(result)

  return result;
}

var result = outer(globalValue);
var result_two = outer(4);


console.log("Global Variable Value:", globalValue);
console.log("Result:", result);
console.log("Result Two:", result_two);
console.log("=== Global execution end ===");

debugger; 