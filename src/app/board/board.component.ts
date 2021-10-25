import { Component, OnInit } from '@angular/core';
import { Game } from '../game';
import { GameService } from '../game.service';
import { Player } from '../player';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  player!: Player; 
  game!: Game;

  constructor(public gameService: GameService) {
    this.game = gameService.getGame();
    this.player = gameService.player;
  }

  ngOnInit(): void { 
  }

  newGame() {
    this.gameService.newGame();
    console.log(this.game);
  }
}