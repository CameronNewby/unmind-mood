const jsonServer = require('json-server');
const path = require('path');

const jsonMiddlewares = jsonServer.defaults();

module.exports = (app: any) => {
    
  app.use(jsonMiddlewares);
  app.use(jsonServer.bodyParser);

  app.use((req, res, next) => {
      if (req.method === 'POST' && req.path === '/checkin') {
          req.body.createdAt = Date.now()
      }
      next()
  })

  let dbRouter = jsonServer.router(path.join(__dirname, '../endpoints/db.json'));

  app.use('/', dbRouter);
}