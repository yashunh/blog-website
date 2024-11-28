import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { blogRouter } from './routes/blog';
import { userRouter } from './routes/user';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_Secret: string
  }
}>();

app.use(
  '*',
  cors({
    origin: 'http://localhost:5173',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
    credentials: true,
  })
);

app.route('/api/v1/blog', blogRouter);
app.route('/api/v1/user', userRouter);

export default app;
