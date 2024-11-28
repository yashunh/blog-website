import z from "zod";

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().optional()
})

export const createPostInput = z.object({
    title: z.string(),
    content: z.string().min(6),
    published: z.boolean().optional()
})

export const updatePostInput = z.object({
    title: z.string(),
    content: z.string().min(6),
    id: z.string().uuid()
})

export type SigninInput = z.infer<typeof signinInput>

export type SignupInput = z.infer<typeof signupInput>

export type UpdatePostInput = z.infer<typeof updatePostInput>

export type CreatePostInput = z.infer<typeof createPostInput>