import { StorageEngine } from "multer"
import { isConstructorDeclaration } from "typescript"

export enum Code {
    UserError = 400 ,
    ServerError = 500 ,
    Success = 200 
}

export class ApiReponse {

    statusCode : Code  
    data : {} 
    message : string

    constructor(statusCode : Code , data : {} , message : string){
        this.statusCode = statusCode ,
        this.data = data , 
        this.message = message
    }
}

