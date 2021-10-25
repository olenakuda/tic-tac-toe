import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../game';
import { GameService } from '../game.service';
import { Player } from '../player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  player!: Player;
  game!: Game;

  constructor(public gameService: GameService) { }
  
  ngOnInit(): void {
    this.player = {
      name: "",
      symbol: "",
      isCPU: false
    };
  }

  startGame(){
    this.gameService.startGame(this.player);
  }
}
