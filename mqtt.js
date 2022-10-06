        // Create a client instance
        var host = "10.10.148.220";
        var port = 9001;
        var coordinateX;
        var coordinateY;
        client = new Paho.MQTT.Client(host, Number(port), "Web Interface");

        // set callback handlers
        client.onConnectionLost = onConnectionLost;
        client.onMessageArrived = onMessageArrived;

        // connect the client
        client.connect({ onSuccess: onConnect, mqttVersion: 3 });

        // called when the client connects
        function onConnect() {
            // Once a connection has been made, make a subscription and send a message.
            console.log("onConnect");
            client.subscribe("espX");
            client.subscribe("espY");
            /* message = new Paho.MQTT.Message("BISA ANJINGGGGG!!!!!");
            message.destinationName = "/World";
            client.send(message); */
        }

        // called when the client loses its connection
        function onConnectionLost(responseObject) {
            if (responseObject.errorCode !== 0) {
                console.log("onConnectionLost:" + responseObject.errorMessage);
            }
        }

        // called when a message arrives
        function onMessageArrived(message) {
            if (message.destinationName == "espX") {
                coordinateX = message.payloadString;
                /* console.log("onMessageArrived: X " + coordinateX); */
                document.getElementById("x_in").value = coordinateX;

                return coordinateX;
            }
            else if (message.destinationName == "espY") {
                coordinateY = message.payloadString;
                /* console.log("onMessageArrived: Y " + coordinateY); */
                document.getElementById("y_in").value = coordinateY;

                return coordinateY;
            }
        }