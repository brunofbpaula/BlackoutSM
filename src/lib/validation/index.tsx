import * as z from "zod"

export const SignUpValidation = z.object({
    name: z.string().min(2, {message: 'Name too short'}),
    username: z.string().min(4, {message: 'Username must be at least 4 characters long'}).max(50),
    email: z.string().email(),
    password: z.string().min(6, {message: 'Password must be at least 6 characters long'})
  });