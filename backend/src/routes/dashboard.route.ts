import { Hono } from "hono";
import { Code, ResponseDataType } from "../types/response.type";
import { verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { ProjectAddZod } from "../types/project.types";

export const dashBoardRoute = new Hono<{
    Bindings : {
        DATABASE_URL : string
        JWT_SECRET : string
    } ,
    Variables : {
        userId : string
    }
}> ;

dashBoardRoute.use(async( c, next ) => {

    const jwt = c.req.header('Authorization')

    if(!jwt){
        return c.json<ResponseDataType>({
            code : Code.UserError , 
            mssg : 'Missing token',
            data : {}
        })
    }

    const token  = jwt!.split(' ')[1] ;

    try {
        const payload = await verify(token , c.env.JWT_SECRET) ;
        if(!payload) {
            return  c.json<ResponseDataType>({
                code : Code.UserError, 
                mssg : 'Unauthorized',
                data : {}
            })
        }
        c.set('jwtPayload' , payload.id)
        await next()
    } catch (error) {
        return c.json<ResponseDataType>({
            code : Code.UserError, 
            mssg : 'Unauthorized',
            data : {}
        })
    }
})

// get all the projects of a user
dashBoardRoute.get('/' , async (c) => {

    const id = c.get('jwtPayload') ;
    

    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const projects = await prisma.projects.findMany({
        where : {
            userId : id
        }, 
    })


    if(!projects) {
        return c.json<ResponseDataType>({
            mssg : "Server Error" ,
            code : Code.ServerError ,
            data : {}
        })
    }

    return c.json<ResponseDataType>({
        mssg : "Fetched Projects" ,
        code : Code.Success,
        data : {
            projects
        }
    }) ;
})

// Add project for user
dashBoardRoute.post('/' , async (c) => {
    const userId = c.get("jwtPayload")

    const body = await c.req.json() ;

    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate()) 

    if(ProjectAddZod.safeParse(body)){ 
        try {
            const project = await prisma.projects.create({
                data :{
                    userId : userId ,
                    projectname : body.projectname
                }
            })

            return  c.json<ResponseDataType>({
                mssg:  "Project Added",
                code : Code.Success ,
                data : {
                    project
                }
            })

        } catch (error) {
            return c.json<ResponseDataType>({
                mssg:  "Server Error",
                code : Code.ServerError ,
                data : {}
            })
        }
        
    }else{
        return c.json<ResponseDataType>({
            mssg: "Invalid Data type" ,
            code : Code.UserError ,
            data : {}
        })
    }
})