

export default class Client{
    io;
    started;

    constructor(){
        this.io=io(); 
        this.started=false;
    }


    makeConexion(){
        this.io.on('number',()=>{this.io.emit("start");  });
        this.io.on('tomany',()=>{document.getElementById("player").innerHTML="To many players : the MAX of players is two ";
        this.io.close(); });
    }


    getIO(){
        return this.io;
    }

    
    start(){
        if(this.players==2){
            console.log("started");
        this.started=!this.started;
        }

    }

    
}