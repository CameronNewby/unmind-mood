import jsonServer from 'json-server'
import path from 'path'
import moment from 'moment'

const jsonMiddlewares = jsonServer.defaults();

module.exports = (app: any) => {
    
  app.use(jsonMiddlewares);
  app.use(jsonServer.bodyParser);

  app.use((req, res, next) => {
      if (req.method === 'POST' && req.path === '/checkin') {
          req.body.createdAt = moment()
      }
      next()
  })

  let dbRouter = jsonServer.router(path.join(__dirname, '../endpoints/db.json'));

  app.use(jsonServer.rewriter({
      '/checkin/:user_id' : '/checkin?userId=:user_id'
  }))

  app.use('/', dbRouter);
}