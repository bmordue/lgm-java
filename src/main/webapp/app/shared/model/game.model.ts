import { IPlayer } from 'app/shared/model//player.model';
import { ITurn } from 'app/shared/model//turn.model';

export interface IGame {
    id?: number;
    players?: IPlayer[];
    turns?: ITurn[];
}

export class Game implements IGame {
    constructor(public id?: number, public players?: IPlayer[], public turns?: ITurn[]) {}
}
