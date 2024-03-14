

export default class IOcontroller {
   IO;
   players;
   pos;
   pos2;
   actionPlayer1;
   actionPlayer2;
   winner;
   round;
   scorePlayer1;
   scorePlayer2;

   constructor(IO) {
      this.IO = IO;
      this.players = new Map();
      this.playersPos = new Map();
      this.pos = 0;
      this.pos2 = 0;
      this.winner = null;
      this.actionPlayer1 = null;
      this.actionPlayer2 = null;
      this.round = 0;
      this.scorePlayer1 = 0;
      this.scorePlayer2 = 0;
   }

   registerSocket(socket) {
      this.leave(socket);
      this.handlesocket(socket);
      this.start(socket);
      this.messageListner();
   }

   leave(socket) {
      socket.on("disconnect", () => {
         this.actionPlayer1 = null;
         this.actionPlayer2 = null;
         this.winner = "";
         const sockPos = this.playersPos.get(socket.id);
         this.players.delete(sockPos);
         this.playersPos.delete(socket.id);
      });
   }

   handlesocket(socket) {
      if (this.pos >= 2) {
         this.pos = 0;
      }
      if (this.players.size < 2) {
         //console.log(`new connection with id ${socket.id}`);
         this.pos2++;
         this.players.set(this.pos2, socket);
         this.playersPos.set(socket.id, this.pos2);
         socket.emit("number");

      }
      else {
         socket.emit("tomany");
      }
   }

   messageListner() {
      if (this.players.size == 2) {
         let it = this.players.values();
         const player1 = it.next().value;
         const player2 = it.next().value;
         player1.on("played", (value) => {
            this.actionPlayer1 = value;
            console.log("you played " + value);
            this.playOneRound(player1, player2);
            //this.count();
         });
         player2.on("played", (value) => {
            this.actionPlayer2 = value;
            console.log("the other played " + value);
            this.playOneRound(player1, player2);
            //this.count();
         });
      }
   }

   playOneRound(player1, player2) {
      if (this.actionPlayer1 != null && this.actionPlayer2 != null ) {
         const winner =this.play(this.actionPlayer1, this.actionPlayer2);
         console.log("winner is " + winner);
         if (winner == "player1") {
            player1.emit("winner", ' you have chosen ' + this.actionPlayer1 + ' and the second player chosed ' + this.actionPlayer2 + ' : YOU WIN');
            player2.emit("winner", ' you have chosen ' + this.actionPlayer2 + ' and the second player chosed ' + this.actionPlayer1 + ' : YOU LOSE');
            this.count();
         }
         else if (winner == "player2") {
            player1.emit("winner", ' you have chosen ' + this.actionPlayer1 + ' and the second player chosed ' + this.actionPlayer2 + ' : YOU LOSE ');
            player2.emit("winner", ' you have chosen ' + this.actionPlayer2 + ' and the second player chosed ' + this.actionPlayer1 + ' : YOU WIN ');
            this.count();
         }   

      }
      
   }

   start(socket) {
      socket.on("start", () => { this.IO.emit("started") });

   }

   count() {
      this.pos++;
      console.log(this.pos);
      if (this.pos >= 3) {
         this.winner = "";
         this.actionPlayer2 = null;
         this.actionPlayer1 = null;
         this.pos=0;
      }

   }

   play(actionPlayer1, actionPlayer2) {
      let winner;
      if (actionPlayer1==="rock" && actionPlayer2 ==="scissors") {
         winner="player1";
      }
      else if (actionPlayer1==="rock" && actionPlayer2==="paper") {
         winner="player2";
      }
      else if (actionPlayer1==="scissors" && actionPlayer2==="rock") {
         winner="player2";
      }
      else if (actionPlayer1==="scissors" && actionPlayer2==="paper") {
         winner="player1";
      }
      else if (actionPlayer1==="paper" && actionPlayer2==="rock") {
         winner="player1";
      }
      else if (actionPlayer1==="paper" && actionPlayer2==="scissors") {
         winner="player2";
      }
      else {
         winner = "noWinner";
      }
      return winner;
   }

}