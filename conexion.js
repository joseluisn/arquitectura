var five = require('johnny-five');
var wifi = require("node-wifi");
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://test.mosquitto.org')

// se crea una nueva board
var board = new five.Board();

//se definen puertos
WiFiClient = client;
WiFiServer = server(80)

//Datos del Wifi
var ssid = "Familia camacho";
var password = "Cualquiera2611";


var data = "";

/* define L298N o L293D pines del control del motor */
var leftMotorForward = new five.pin(2);     /* GPIO2(D4) -> IN3   */
var rightMotorForward = new five.pin(15);   /* GPIO15(D8) -> IN1  */
var leftMotorBackward = new five.pin(0);    /* GPIO0(D3) -> IN4   */
var rightMotorBackward = new five.pin(13);  /* GPIO13(D7) -> IN2  */


/* define L298N o L293D pines habilitados */
var rightMotorENB = new five.pin(14); /* GPIO14(D5) -> Motor-A Enable */
var leftMotorENB = new five.pin(12);  /* GPIO12(D6) -> Motor-B Enable */




//cuando se inicia la board

board.on('ready', function () {


    board.repl.inject({
        leftMotorForward: leftMotorForward,
        rightMotorForward: rightMotorForward,
        leftMotorBackward: leftMotorBackward,
        rightMotorBackward: rightMotorBackward
    });
    five.server.begin();

    client = server.available();
    if (!client) return;
    data = checkClient();



    if (data == "forward") MotorForward();
    /* If the incoming data is "backward", run the "MotorBackward" function */
    else if (data == "backward") MotorBackward();
    /* If the incoming data is "left", run the "TurnLeft" function */
    else if (data == "left") TurnLeft();
    /* If the incoming data is "right", run the "TurnRight" function */
    else if (data == "right") TurnRight();
    /* If the incoming data is "stop", run the "MotorStop" function */
    else if (data == "stop") MotorStop();

});

// hacia adelante
MotorForward(any)
{


    leftMotorENB.high();
    rightMotorENB.high();
    leftMotorForward.high();
    rightMotorForward.high();
    rightMotorBackward.low();
    leftMotorBackward.low();

}

// Atras
MotorBackward(any)
{
    leftMotorENB.high();
    rightMotorENB.high();
    leftMotorForward.high();
    rightMotorForward.high();
    rightMotorBackward.low();
    leftMotorBackward.low();
}

// Voltear a la Izquierda
TurnLeft(any)
{

    leftMotorENB.high();
    rightMotorENB.high();
    leftMotorForward.low();
    rightMotorForward.high();
    rightMotorBackward.low();
    leftMotorBackward.higi();
}

//voltear a la derecha

TurnRight(any)
{
    leftMotorENB.high();
    rightMotorENB.high();
    leftMotorForward.high();
    rightMotorForward.low();
    rightMotorBackward.high();
    leftMotorBackward.low();
}


//parar

MotorStop(any)
{
    leftMotorENB.low();
    rightMotorENB.low();
    leftMotorForward.low();
    leftMotorBackward.low();
    rightMotorForward.low();
    rightMotorBackward.low();
}

checkClient(any)
{
    while (!client.available()) delay(1);
    var request = client.readStringUntil('\r');
    request.remove(0, 5);
    request.remove(request.length() - 9, 9);
    return request;
}
