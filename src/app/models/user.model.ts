export class User {

    constructor(
        public email: string,
        public password: string,
        public shaded: string,
        //opts
        public paso?: string,
        public rePassword?: string
    ) { }
}
