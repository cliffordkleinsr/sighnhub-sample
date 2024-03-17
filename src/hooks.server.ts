import type { Handle } from "@sveltejs/kit"
import { db } from '$lib/database'

export const handle: Handle = async ({event, resolve}) =>{
    // get cookies from browser
    const session = event.cookies.get('prisma_auth')
    // console.log(session)see cookie value
    if (!session) {
        // if there is no session load page as usual
        return await resolve(event)
    }

    // find user based on session 
    const user = await db.user.findUnique({
        where: {userAuthToken: session},
        select: {username: true, role: true}
    })

    // If user exists set `events.locals`
    if (user)
    {
        event.locals.user = {
            name: user.username,
            role: user.role.name
        }
    }

    return await resolve(event)
}