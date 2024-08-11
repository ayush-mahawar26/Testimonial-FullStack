import { Hono } from "hono";
import { userSigninType, UserSignInZod, userSignupType, UserSignUpZod } from "../types/auth.types";
import { PrismaClient } from "@prisma/client/edge";
import {withAccelerate} from "@prisma/extension-accelerate"
import { sign } from "hono/jwt";
import { Code, ResponseDataType } from "../types/response.type";

export const userRoute = new Hono<{
    Bindings : {
        DATABASE_URL : string
        JWT_SECRET: string
    }
}>() ;


userRoute.get('/verify/:id' , async (c) => {
    const id = c.req.param('id') ;

    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())
    
    const user = await prisma.user.update({
        where : {
            id : id
        },
        data : {
            verified : true
        }
    })

    if(user.verified === true){
        return c.json<ResponseDataType>({
            code : Code.Success,
            data : {} ,
            mssg : "User Verified"
        })
    }

    return c.json<ResponseDataType>({
        code : Code.ServerError ,
        data : {} ,
        mssg : "Server error in verify your account"
    })

    
})

userRoute.post("/signup" ,async(c) =>{
    const body = await c.req.json<userSignupType>() ;

    const userbody = UserSignUpZod.safeParse(body)

    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())
    
    if(userbody.success) {
        console.log("hello");
        
        const email = body.useremail 
        const password = body.userpassword
        const name = body.username

        const userExist = await prisma.user.findUnique({
            where : {
                useremail : email
            }
        })

        if(userExist) {
            return c.json<ResponseDataType>({
                code : Code.UserError,
                data : {} ,
                mssg : "Useremail already exist"
            })
        }

        const user = await prisma.user.create({
            data : {
                useremail : email ,
                username : name, 
                userpassword : password
            },

            select : {
                id: true ,
                useremail : true ,
                username : true
            }
        })

        const token = await sign({
            id : user.id ,
            email : user.useremail
        } , c.env.JWT_SECRET) ;

        return c.json<ResponseDataType>({
            code : Code.Success ,
            mssg : "User created" , 
            data  :{
                user , 
                token
            }
        }) 
    
    }else{
        return c.json<ResponseDataType>({
            code : Code.UserError,
            data : {} ,
            mssg : "Enter valid data"
        })
    }

})


userRoute.post('/signin' , async (c) => {
    const body : userSigninType= await c.req.json()

    const userData  = UserSignInZod.safeParse(body)

    if(userData.success) {
        const prisma = new PrismaClient({
            datasourceUrl : c.env.DATABASE_URL
        }).$extends(withAccelerate())

        try {
            const user = await prisma.user.findUnique({
                where : {
                    useremail : body.useremail
                },
            })
    
            if(user){
                if(user.userpassword !== body.userpassword) {
                    return c.json<ResponseDataType>({
                        code : Code.UserError,
                        data : {} ,
                        mssg : "Invalid Credentials"
                    })
                }
                const token = await sign({
                     id : user.id ,
                     email : user.useremail
                } , c.env.JWT_SECRET) ;
    
                return c.json<ResponseDataType>({
                    code : Code.Success,
                    data : {
                        user,
                        token
                    } ,
                    mssg : "User Signedin"
                })
            }else{
                return c.json<ResponseDataType>({
                    code : Code.UserError,
                    data : {} ,
                    mssg : "User doesnt exist"
                })
            }
        } catch (error) {
            return c.json<ResponseDataType>({
                mssg : "Server Error" ,
                code : Code.ServerError ,
                data : {}
            })
        }

    }else{
        return c.json<ResponseDataType>({
            code : Code.UserError ,
            data : {} ,
            mssg : "Enter valid data"
        })
    }
})
