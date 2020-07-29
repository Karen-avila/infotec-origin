export class User {

    constructor(
        public email: string,
        public password: string,
        public shaded: boolean,
        //opts
        public paso?: string,
        public rePassword?: string
    ) { }
}
