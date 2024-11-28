import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signinInput, signupInput } from '@yashunh/blog-common'

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_Secret: string
    }
}>()

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()

    const { success } = signupInput.safeParse(body);

    if(!success){
        c.status(400);
		return c.json({ error: "invalid input" });
    }

    let response = await prisma.user.create({
        data: {
            email: body.email,
            password: body.password,
            name: body.name || null
        }
    })

    const token = await sign({ id: response.id }, c.env.JWT_Secret);

    return c.json({ token })
})

userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();

    const { success } = signinInput.safeParse(body);

    if(!success){
        c.status(400);
		return c.json({ error: "invalid input" });
    }

	const user = await prisma.user.findUnique({
		where: {
			email: body.email,
            password: body.password
		}
	});

	if (!user) {
		c.status(403);
		return c.json({ error: "user not found" });
	}

	const token = await sign({ id: user.id }, c.env.JWT_Secret);
	return c.json({ token });
})

// export default userRouter;