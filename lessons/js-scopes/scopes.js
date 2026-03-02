/**
 * JavaScript BEFORE ES6
 * Only global & function scope existed.
 * var does NOT respect block boundaries.
 */

var es5Bool = true;

if (es5Bool) {
    var a = 10;
}

console.log('VAR outside block:', a); // ✅ 10



/**
 * JavaScript AFTER ES6
 * let and const introduce true block scope.
 */

let es6Bool = true;

if (es6Bool) {
    const b = 10;
}

// console.log('CONST outside block:', b); // ❌ ReferenceError


/**
 * Closure Example - Return a function
 */

function closuseReturnsFunction() {
    let message = "Hello";
    function inner() {
        console.log(message);
    }

    return inner;
}
const fn = closuseReturnsFunction();

fn();


/**
 * Closure example with 3 inner levels
 * 
 */

/**
 * 3-Level Nested Closure Example
 * Function inside a function inside a function
 */

// console.log('threeLevelClosure before declaration', threeLevelClosure);  // ❌ ReferenceError

const threeLevelClosure = 'I am from Global'

function outer() {
    // Variable created in the outer function scope
    let outerVar = "I am from outer";

    function middle() {
        // Variable created in the middle function scope
        let middleVar = "I am from middle";

        function inner() {
            /**
             * inner() forms a closure.
             *
             * It has access to:
             * 1. Its own scope
             * 2. middle() scope
             * 3. outer() scope
             * 4. global scope
             *
             * This happens because of lexical scope (scope chain).
             */

            console.log(outerVar);   // accessible from global scope
            console.log(outerVar);   // accessible from outer scope
            console.log(middleVar);  // accessible from middle scope
        }

        // Calling inner function inside middle
        inner();
    }

    // Calling middle function inside outer
    middle();
}

// Starting execution
outer();
