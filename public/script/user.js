import Client from './client.js';

const init = () => {
    const client = new Client();
    client.makeConexion();
    buttonHandler(client);
    pfcReply(client);
}

const buttonHandler = (client) => {
    client.io.on("started", () => { pfcMessage(client); });
}

const pfcMessage = (client) => {
    document.getElementById('rock').addEventListener('click', () => client.io.emit("played", "rock"));
    document.getElementById('paper').addEventListener('click', () => client.io.emit("played", "paper"));
    document.getElementById('scissors').addEventListener('click', () => client.io.emit("played", "scissors"));
}

const pfcReply = (client) => {
    client.io.on("winner", (message) => { 
        document.getElementById("status").innerHTML = message
    });
}


window.addEventListener('onload', init());





