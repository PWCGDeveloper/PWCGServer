import { Squadron } from './squadron';
import { IpcSocketConnectOpts } from 'net';

export class Campaign {
    name: string;
    date: string;
    isCoop:boolean;

    squadrons: Squadron[] = [
    ]

    constructor() {
    }

}