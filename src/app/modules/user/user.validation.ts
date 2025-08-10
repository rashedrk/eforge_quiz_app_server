import { z } from "zod";
import { USER_ROLE } from "./user.constant";



const userValidationSchema = z.object({
    body: z.object({
        name: z.string({ invalid_type_error: 'name must be string' }),
        email: z.string({ invalid_type_error: 'email must be string' }).email(),
        password: z.string({ invalid_type_error: 'password must be string' })
        .max(20, { message: 'Password cannot be bigger than 20 characters' }),
        role: z.enum(Object.values(USER_ROLE) as [string, ...string[]]),
        isVerified: z.boolean().optional(),
    })
});

export const userValidation = {
    userValidationSchema
}