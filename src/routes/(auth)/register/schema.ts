import { z } from "zod";
 
export const formSchema = z.object({
  name: z
  .string({ required_error: 'Name is required'})
  .min(2 , {message: 'Name is required'})
  .max(50, {message: 'Name must have a maximum of 50 chars'})
  .trim(),
  email: z
  .string({ required_error: 'Email is required'})
  .min(2, {message: 'Email must have atleast 2 chars'}
  ).max(50, {message: 'Email must have a maximum 50 chars'})
  .email({message: 'Must be a valid Email Address'}),
  password: z
  .string({ required_error: 'Password is required'})
  .min(2, {message: 'Password must have atleast 2 chars'})
  .max(50, {message: 'Password must have atleast 50 chars'})
  .trim(),
  passwordConfirm: z
  .string({ required_error: 'Password is required'})
  .min(2, {message: 'Password must have atleast 2 chars'})
  .max(50, {message: 'Password must have atleast 50 chars'})
  .trim()
}).superRefine(({passwordConfirm, password}, ctx) =>{
    if (passwordConfirm !== password) {
        ctx.addIssue({
            code: 'custom',
            message: 'Passwords and Confirm Password Must match',
            path:['password']
        })
        ctx.addIssue({
            code: 'custom',
            message: 'Passwords and Confirm Password Must match',
            path:['passwordConfirm']
        })
    }
})


export type FormSchema = typeof formSchema;