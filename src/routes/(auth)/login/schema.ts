import { z } from 'zod'


const stringOrEmail = z
    .string({
        required_error: 'Name is required'
    })
    .min(2, {
        message: 'Wrong Credentials'
    })
    .max(50, {
        message: 'Wrong Credentials'
    })
    .trim().or(
        z
        .string({
            required_error: 'Email is required'
        })
        .min(2, {
            message: 'Wrong Credentials'
        }).max(50, {
            message: 'Wrong Credentials'
        })
        .email({
            message: 'Wrong Credentials'
        }))
export const loginSchema = z.object({
    name: stringOrEmail,
    password: z
    .string({ required_error: 'Password is required'})
    .min(2, {message: 'Wrong Credentials'})
    .max(50, {message: 'Wrong Credentials'})
    .trim()
    })

export type loginSchema = typeof loginSchema;