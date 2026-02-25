function first() {
    debugger
    console.log("first start");
    second();
    console.log("first end");
}

function second() {
    debugger
    console.log("second start");
    third();
    console.log("second end");
}

function third() {
    debugger
    console.log("third start");
    console.log("third end");
}

window.addEventListener('load', function () {
    debugger
    console.log('Load Event Initiated')
    first()
    console.log('Load Event Finished')
})