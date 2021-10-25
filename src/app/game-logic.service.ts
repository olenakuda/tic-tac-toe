import { Injectable } from '@angular/core';
import { Game } from './game';
import { Move } from './move';

@Injectable({
  providedIn: 'root'
})
export class GameLogicService {

  constructor() { }

  getBestMoveIndex(game: Game): number {
    var moves: Move[] = this.getPossibleMoves(game, game.squares);

    const maxValue = moves.map(x => x.score).reduce((x, y) => x > y ? x : y);

    const filteredMoves = moves.filter(x => x.score === maxValue);

    if (filteredMoves.length > 1) {
      const index = this.randomNumber(filteredMoves.length);
      return filteredMoves[index].index;
    }
    return filteredMoves[0].index;
  }

  getPossibleMoves(game: Game, squares: string[]): Move[] {
    var moves = [];

    var availableSpots = this.getEmptySquareIndexes(squares);

    for (var i = 0; i < availableSpots.length; i++) {
      var move: Move = { index: 0, score: 0 };
      const currentIterationMoveIndex = availableSpots[i];
      move.index = currentIterationMoveIndex;
      this.calculateMoveScore(game, game.cpuSymbol, squares, currentIterationMoveIndex, move, 0);
      moves.push(move);
    }
    return moves;
  }

  randomNumber(max: number) {
    return Math.floor(Math.random() * max)
  }

  getEmptySquareIndexes(currentStateBoard: any[]): number[] {
    return currentStateBoard.reduce((indexies, squareValue, index) => {
      if (squareValue === null) {
        indexies.push(index);
      }
      return indexies;
    }, []);
  }

  calculateMoveScore(game: Game, currentPlayer: string, squares: string[], moveIndex: number, move: Move, deep: number) {
    var squaresCopy = squares.map((x) => x);

    if (squaresCopy[moveIndex]) {
      return;
    }

    const numberOfAvailableSlots = this.getEmptySquareIndexes(squaresCopy).length;

    if (numberOfAvailableSlots <= 0) {
      return;
    }

    squaresCopy[moveIndex] = currentPlayer;

    move.score += this.minimax(game, squaresCopy);

    const availableMoveIndexes = this.getEmptySquareIndexes(squaresCopy);

    if (availableMoveIndexes.length > 0) {
      const nextPlayer = game.cpuSymbol === currentPlayer ? game.humanSymbol : game.cpuSymbol;

      for (let index = 0; index < availableMoveIndexes.length; index++) {
        const nextMoveIndex = availableMoveIndexes[index];
        deep = deep + 1;
        this.calculateMoveScore(game, nextPlayer, squaresCopy, nextMoveIndex, move, deep);
      }
    }
  }

  minimax(game: Game, squares: string[]): number {
    if (this.isWinner(game.humanSymbol, squares)) {
      return -1;
    }
    if (this.isWinner(game.cpuSymbol, squares)) {
      return +1;
    }
    return 0;
  }

  calculateWinner(game: Game) {
    if (this.isWinner(game.player.symbol, game.squares)) {
      return game.player.name;
    }
    if (game.round > 8) {
      return 'It\'s a tie!';
    }
    return null;
  }


  isWinner(playerSymbol: string, board: string[]): boolean {
    let player = playerSymbol;
    return (
      (board[0] == player && board[1] == player && board[2] == player) ||
      (board[3] == player && board[4] == player && board[5] == player) ||
      (board[6] == player && board[7] == player && board[8] == player) ||
      (board[0] == player && board[3] == player && board[6] == player) ||
      (board[1] == player && board[4] == player && board[7] == player) ||
      (board[2] == player && board[5] == player && board[8] == player) ||
      (board[0] == player && board[4] == player && board[8] == player) ||
      (board[2] == player && board[4] == player && board[6] == player)
    );
  }
}
