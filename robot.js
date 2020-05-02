// incluimos la libreria j5
var five = require("johnny-five");
// incluimos la librería para utilizar los teclados
var keypress = require("keypress");
//configuramos nuestra placa arduino en una variable
var board = new five.Board;
// funcion que se ejecuta cuando la placa ya esta lista
board.on("ready", function() {
// mensaje que se muestra por consola indicando que la placa esta lista
keypress(process.stdin);
console.log("Placa lista.");
//Fncion de keypress
process.stdin.on("keypress", function(ch, key){
// Declaramos los pines para los motores:
var pin1 = new five.Led(2);
var pin2 = new five.Led(4);
var pin3 = new five.Led(7);
var pin4 = new five.Led(8);
// Si presionamos la tecla de direccion arriba
if (key.name ==="up"){
pin1.on();
pin2.off();
pin3.on();
pin4.off();
// Muestra el texto adelante en la consola
console.log("\nAdelante");
}
// Si presionamos la tecla de direccion bajo
if (key.name ==="down"){
pin1.off();
pin2.on();
pin3.off();
pin4.on();
// Muestra en la consola el texto Atras
console.log("\nAtras");
}
// Si presionamos la tecla de direccion Izquierda
if (key.name ==="left"){
pin1.on();
pin2.off();
pin3.off();
pin4.on();
// Muestra en la consola el texto Izquierda
console.log("\nIzquierda");
}
// Si presionamos la tecla de direccion derecha
if (key.name ==="right"){
pin1.off();
pin2.on();
pin3.on();
pin4.off();
// Muetra en la consola el texto Derecha
console.log("\nDerecha");
}
});
});
// mensaje que se muestra por consola mientras se espera a que se inicie la placa
console.log("\nEsperando a que inicialice el dispositivo...");