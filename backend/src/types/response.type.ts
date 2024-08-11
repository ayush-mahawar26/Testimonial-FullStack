
export enum Code {
    UserError = 400 ,
    ServerError = 500 ,
    Success = 200
}


export type ResponseDataType = {
    mssg : string ,
    code : Code ,
    data : {}
}