import bcrypt from 'bcrypt'
import { db } from '$lib/database'
import type { Actions, PageServerLoad } from './$types'
import { loginSchema } from './schema'
import { ZodError } from 'zod'
import { fail, redirect } from '@sveltejs/kit'


export const load:PageServerLoad = async ({locals}) => {
    //redirect user if logged in
    if (locals.user) {
        throw redirect(303, '/admin')
    }
}

export const actions: Actions = {
    login: async ({cookies, request}) =>{
        const loginData = Object.fromEntries(await request.formData())
        
        try 
        {
            //Validate
            const {name, password} = loginSchema.parse(loginData)

            //check if user exists
            const user = await db.user.findUnique({
                where: {email: name}
            })
            if (!user) {
                return fail(400, {credentials:true})
            }
            // check if passwords match
            const userpass = await bcrypt.compare(password, user.passwordHash)
            if (!userpass)
            {
                return fail(400, {credentials:true})
            }

            const authedUser = await db.user.update({
                where : {email: name},
                // update the authtoken with a new one for security
                data :{userAuthToken: crypto.randomUUID()}
            })

            cookies.set('prisma_auth', authedUser.userAuthToken, {
                // send cookie for every page
                path: '/',
                // Server side only cookie so you cant use document.cookie
                httpOnly: true,
                // only requests from same site can send cookies
                // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
                sameSite: 'strict',
                // only sent over HTTPS in production
                secure: process.env.NODE_ENV === 'production',
                // set cookie expiry
                maxAge: 60*60
            })
        } catch (err) 
        {
                if (err instanceof ZodError)
                {
                    // Handle Zod validation errors
                    const { fieldErrors: errors } = err.flatten()
                    //strip password
                    const {password, ...rest} = loginData

                return fail(400,{
                    data:rest,
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
        throw redirect(302, '/admin')
    }
}