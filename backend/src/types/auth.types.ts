
import {z} from "zod" ;

export const UserSignUpZod = z.object({
    username : z.string() ,
    userpassword : z.string() ,
    useremail : z.string().email(),
})

export const UserSignInZod = z.object({
    useremail : z.string() ,
    userpassword : z.string() 
})

export type userSignupType = z.infer<typeof UserSignUpZod> 
export type userSigninType = z.infer<typeof UserSignInZod> 