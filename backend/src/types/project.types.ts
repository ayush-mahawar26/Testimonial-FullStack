import {z} from 'zod'

export const ProjectAddZod = z.object({
    projectname : z.string()
})

export type ProjectAddType = z.infer<typeof ProjectAddZod>