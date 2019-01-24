import { Victory } from './victory';

export class SquadronMember {
    serialNumber: number;
    squadronId: number;
    pilotRank: string;
    pilotName: string;
    victories: Victory[];
    victoryCount: number;

    constructor() {
        this.serialNumber = 0;
        this.pilotName = '';
        this.pilotRank = '';
        this.victories = [];
        this.victoryCount = 0;
    }
}
