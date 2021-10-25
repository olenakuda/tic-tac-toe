import { Player } from "./player";

export interface Game {
    humanSymbol: string,
    cpuSymbol: string,
    round: number,
    player: Player,
    squares: any[],
    isPlayerTurn: boolean,
    winner: string | undefined | null
}
