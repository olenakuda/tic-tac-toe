import { Injectable } from '@angular/core';
import { Game } from './game';
import { GameLogicService } from './game-logic.service';
import { Player } from './player';

@Injectable({
  providedIn: 'root'
})

export class GameService {
  game!: Game;
  player!: Player;

  cpuPlayer: Player = {
    name: "Computer",
    symbol: "X",
    isCPU: true
  }

  constructor(private service: GameLogicService) {
  }

  getGame() {
    return this.game;
  }

  startGame(currentPlayer: Player) {
    this.player = currentPlayer;
    if (currentPlayer.symbol === 'X') {
      this.cpuPlayer.symbol = 'O'
    }
    return this.game = {
      humanSymbol: currentPlayer.symbol,
      cpuSymbol: this.cpuPlayer.symbol,
      round: 0,
      player: this.player,
      squares: Array(9).fill(null),
      isPlayerTurn: true,
      winner: undefined
    }
  }

  newGame() {
    this.player = {
      name: "",
      symbol: "",
      isCPU: false
    }
    this.game.round = 0;
    this.cpuPlayer.symbol = "X";
  }

  makeMove(index: number) {
    if (this.game.squares[index]) { return; }
    if (this.game.winner) { return; }
   
    this.move(index, this.game.player.symbol);
    if (this.game.winner) { return; }
    this.game.player = this.cpuPlayer;
   
    index = this.service.getBestMoveIndex(this.game);
  
    this.move(index, this.game.player.symbol);
    if (this.game.winner) { return; }
    this.game.player = this.player;
  }

  move(index: number, symbol: string) {  
    this.game.squares.splice(index, 1, symbol);
    this.game.round++;
    this.game.winner = this.service.calculateWinner(this.game);    
  }
}