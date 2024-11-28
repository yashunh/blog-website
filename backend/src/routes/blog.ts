import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { createPostInput, updatePostInput } from '@yashunh/blog-common'

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_Secret: string
    },
    Variables:{
        userID: string
    }
}>()

blogRouter.use('/*', async (c, next) => {
    const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
	const payload = await verify(token, c.env.JWT_Secret);
	if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	c.set('userID', payload.id);
	await next()
})

blogRouter.post('/', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json()

    const { success } = createPostInput.safeParse(body);

    if(!success){
        c.status(400);
		return c.json({ error: "invalid input" });
    }

    const id = await c.get('userID')
    const response = await prisma.post.create({
        data :{
            title: body.title,
            content: body.content,
            authorId: id
        }
    })
    return c.json({
        id: response.id
    })
})

blogRouter.put('/', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json()

    const { success } = updatePostInput.safeParse(body);

    if(!success){
        c.status(400);
		return c.json({ error: "invalid input" });
    }

    const response = await prisma.post.update({
        where:{
            id: body.id
        },
        data :{
            title: body.title,
            content: body.content,
        }
    })
    return c.json({
        id: response.id
    })
})

blogRouter.get('/bulk', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const response = await prisma.post.findMany({
        select: {
            id: true,
            title: true,
            content: true,
            createdOn: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    })
    return c.json({
        response
    })
})

blogRouter.get('/:id', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const id = c.req.param('id')
    try{
        const response = await prisma.post.findFirst({
            where:{
                id: id
            },
            select:{
                title:true,
                content: true,
                createdOn: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json({
            response
        })
    }
    catch(err){
        c.status(404)
        return c.json({
            msg: "error"
        })
    }
})