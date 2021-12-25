import { Move } from "./move.model";

export class Contact {

    constructor(public _id?: string, public name: string = '', public email: string = '', public phone: string = '', public coins: number = 100, public moves: Array<Move> = [{
        toId: '',
        to: '',
        at: 0,
        amount: 0
    }]) {

    }

    setId?(length=8) {
        // Implement your own set Id
        var txt = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (var i = 0; i < length; i++) {
            txt += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return txt;
    }
}

