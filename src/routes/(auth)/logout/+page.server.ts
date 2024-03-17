import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({locals}) =>{
    //redirect user if logged in
    if (locals.user) {
        throw redirect(303, '/admin')
    }
}
export const actions: Actions =  {
    default({ cookies }) {
        // ingest cookie
        cookies.set('prisma_auth', '', {
            path: '/',
            expires: new Date(0),
        })

        throw redirect(303, '/login')
    }
    
}