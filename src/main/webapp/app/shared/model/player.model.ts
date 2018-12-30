import { IActor } from 'app/shared/model//actor.model';
import { IGame } from 'app/shared/model//game.model';

export interface IPlayer {
    id?: number;
    name?: string;
    actors?: IActor[];
    game?: IGame;
}

export class Player implements IPlayer {
    constructor(public id?: number, public name?: string, public actors?: IActor[], public game?: IGame) {}
}
