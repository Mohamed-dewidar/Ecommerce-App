

// const admins = require('./db/admins.json')
// const users = require('./db/users.json')

const jsonServer = require('json-server')
const server = jsonServer.create();
const router = jsonServer.router('./db.json')
const middlewares = jsonServer.defaults();
const port = 3005; // Choose the desired port for your server

// const files = ['db/db.json', 'db/users.json']

// module.exports =  () => {
//   return {
//     admins,
//     users
//   }
// }

server.use(middlewares);
server.use(router);



server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
