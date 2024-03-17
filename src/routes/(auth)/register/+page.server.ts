import bcrypt from 'bcrypt'
import { db } from '$lib/database'
import type { PageServerLoad, Actions } from './$types'
import { formSchema } from "./schema";
import { fail, redirect } from '@sveltejs/kit'
import { ZodError } from 'zod'




enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export const load:PageServerLoad = async ({locals}) => {
    // redirect user if logged in
    if (locals.user) {
        throw redirect(303, '/admin')
    }
}

export const actions: Actions = { 
    register: async ({request}) =>{
        const formData = Object.fromEntries(await request.formData())
        
        try
        {
            // Validate data
            const {name, email, password}  = formSchema.parse(formData)
            // console.log(result)

            // Check for existing user
            const user = await db.user.findUnique({
                where: { username: name} 
            })
            if (user) 
            {
                return fail(400,{
                    user:true
                })
            }
            // Create user
            const newUser = await db.user.create({
                data:{
                    username: name,
                    email,
                    passwordHash: await bcrypt.hash(password, 10),
                    userAuthToken: crypto.randomUUID(),
                    role: { connect: { name: Role.USER } }
                    
                }
            })
        }
            
        catch (err: any)
        {
            if (err instanceof ZodError)
            {
                // Handle Zod validation errors
                const { fieldErrors: errors } = err.flatten()
                //strip password
                const {password, ...rest} = formData

                return fail(400,{
                    data: rest,
                    errors
                })
            }
            else 
            {
                // Handle other types of errors (e.g., database errors)
                // Log or report the error appropriately
                console.error("Unexpected error:", err);
                return fail(500,{
                     message: "Internal server error"
                })
            
            }      
        }
        // Handle successful registration (e.g., redirect)
        throw redirect(303, '/login')
    }
}
