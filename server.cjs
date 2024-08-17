import jsonServer from 'json-server';
import auth from 'json-server-auth';
import path from 'path';

const server = jsonServer.create();
const router = jsonServer.router(path.join(process.cwd(), 'db.json'));
const middlewares = jsonServer.defaults();

const rules = auth.rewriter({
  "/register": "/users",
  "/login": "/users",
  "/users*": "/600/users$1",
  "/posts*": "/644/posts$1"
});

server.use(middlewares);
server.use(rules);
server.use(auth);
server.use(router);

server.listen(5000, () => {
  console.log('JSON Server is running on port 5000');
});
