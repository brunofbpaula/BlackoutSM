import * as z from "zod"

export const SignUpValidation = z.object({
    name: z.string().min(2, {message: 'Too short'}),
    username: z.string().min(5, {message: 'Too short'}).max(50),
    email: z.string().email(),
    password: z.string().min(6, {message: 'Password must be at least 6 characters long'})
  });