export class PersonalReferences{

  constructor(
      public firstName:string,
      public lastName:string, 
      public relationshipId:number,
      public genderId:number,
      public professionId:number,
      public maritalStatusId:number,
      public dateOfBirth:string,
      public locale:string,
      public dateFormat:string,
      public mobileNumber:string,
      public middleName?:string
      ){}

  
  
}