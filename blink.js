//llamamos la librería johnny-five
var five = require("johnny-five");

console.log('Hi Johnny Five from Jose luis');
// configuramos la tarjeta arduino en una variable
var board = new five.Board();
// cuando la tarjeta esta lista ejecutar una funcion.
board.on("ready", function() {
    console.log('The board is ready!');
// Declarar el pin 13 en la variable led
var led = new five.Led(13);
// Parpadear el led cada 500 milisegundos
led.blink(500);
console.log('The led is blinking!');
});