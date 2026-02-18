// ===== Global Execution Context =====
console.clear();
debugger;
console.log("=== Global execution start ===");
console.log(globalValue, 'globalValue');
console.log(outer, 'outer in memory before declaration');
console.log(outer(globalValue), 'outer invocation');

var globalValue = 2;

function outer(a) {
  var result = a + a;

  debugger;

  return result;
}

var result = outer(globalValue);
var result_two = outer(4);

console.log("Global Variable Value:", globalValue);
console.log("Result:", result);
console.log("Result Two:", result_two);
console.log("=== Global execution end ===");

debugger; 