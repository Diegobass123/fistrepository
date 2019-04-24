const express = require("express")();
const http = require("http").Server(express);
const serverSocket = require("socket.io")(http);

const porta = process.env.PORT || 8000

http.listen(porta,
    () =>
        console.log("Servidor iniciado em http://localhost:" + porta)
);

express.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

serverSocket.on(
    "connection",
    socket => {
        console.log("cliente "+ socket.id + " conectado");
        socket.on(
            "chat msg", 
            msg => { 
                console.log("msg recebida do cliente " + socket.id + ": " + msg );
                serverSocket.emit("chat msg", msg);
            }
        );
    }
);