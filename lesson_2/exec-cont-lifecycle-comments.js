// ===== Global Execution Context =====

console.clear();

/*
  (1) We pause immediately at the top of the file.
  At this moment the GLOBAL execution context has already been created.

  In DevTools -> Scope, you can observe the "creation phase" results:
  - globalValue exists in memory but is currently: undefined  (because it's a var)
  - outer exists in memory as a function reference            (function declaration)
  - result and result_two exist in memory but are: undefined  (var declarations)
*/
debugger;

console.log("=== Global execution start ===");

/*
  (2) We are now in the EXECUTION phase of the GLOBAL context.
  The engine runs code top-to-bottom, line-by-line.
*/

// globalValue was allocated during creation phase as "undefined"
// but the assignment (var globalValue = 2) has NOT run yet
console.log(globalValue, "globalValue (before assignment)"); // undefined

// outer is a function declaration, so it already exists in memory before its code location
console.log(outer, "outer (function reference in memory)"); // function outer(a) { ... }

// Function exists, but globalValue has not been assigned yet (still undefined)
console.log(outer(globalValue), 'outer invocation (globalValue is undefined here)');

/*
  (3) Now the assignment runs.
  globalValue finally gets its actual value during the execution phase.
*/
var globalValue = 2;

/*
  (4) Function declaration.
  Important: this function was already placed into memory during the creation phase,
  which is why it was accessible earlier.
*/
function outer(a) {
  /*
    (5) FUNCTION EXECUTION CONTEXT (local context) is created NOW,
    every time outer(...) is called.

    Creation phase for this function call:
    - parameter a is allocated and receives the argument value
    - local variable result is allocated as undefined

    Execution phase:
    - result is assigned the computed value
  */

  // result was allocated during the function context creation phase (as undefined),
  // and now gets assigned during execution
  var result = a + a;

  /*
    (6) Pause inside outer.
    In DevTools -> Call Stack, you'll see:
    - outer  (top)
    - (global) underneath

    In DevTools -> Scope, you'll see a and result for THIS call.
    Each call to outer creates a fresh, independent set of these variables.
  */
  debugger;

  // Returning ends this function execution context.
  // After return, this context is popped off the call stack.
  return result;
}

/*
  (7) Now we call outer(globalValue).
  At this moment globalValue is already 2 (because its assignment ran above).
  This creates a NEW function execution context for this call.
*/
var result = outer(globalValue); // outer(2) -> returns 4

/*
  (8) Another call to the same function.
  This creates ANOTHER independent function execution context.
  The previous one is already gone (popped off the call stack).
*/
var result_two = outer(4); // returns 8

console.log("Global Variable Value:", globalValue); // 2
console.log("Result:", result);                     // 4
console.log("Result Two:", result_two);             // 8
console.log("=== Global execution end ===");

/*
  (9) Final pause back in global context.
  At this point:
  - globalValue is 2
  - result is 4
  - result_two is 8
  - the function contexts from outer(...) calls are already destroyed (popped)
*/
debugger;

/*
  (10) Program finished.
  The global execution context will be removed from the call stack.
 */
