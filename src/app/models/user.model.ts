export class User{

    constructor(
        public email:string,
        public password:string,
        //opts
        public paso?:string,
        public rePassword?:string
        ){}


}