export class UserData {
    username: string;
    password: string;
    note: string;
    approved: boolean;


    constructor() {
        this.approved = false;
    }
}