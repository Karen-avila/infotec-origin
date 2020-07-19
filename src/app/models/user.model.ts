export class User{

    constructor(
        public email:string,
        public password:string,
        //opts
        public rePassword?:string,
        public paso?:string
        ){}


}