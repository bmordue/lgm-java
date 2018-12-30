import { ITurn } from 'app/shared/model//turn.model';

export interface ILandscape {
    id?: number;
    width?: number;
    height?: number;
    cells?: string;
    turn?: ITurn;
}

export class Landscape implements ILandscape {
    constructor(public id?: number, public width?: number, public height?: number, public cells?: string, public turn?: ITurn) {}
}
