const port = process.env.PORT || 3000
const isProd = process.env.NODE_ENV === 'production'

const klawSync = require("klaw-sync");
const path = require("path");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");

const http = require('http')
const app = require('express')()
const server = http.createServer(app)
const io = require('socket.io')(server)

const { Nuxt, Builder } = require('nuxt')
// We instantiate Nuxt.js with the options
const config = require('../nuxt.config.js')
config.dev = !isProd

const nuxt = new Nuxt(config)
// Start build process in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

app.use(cookieParser());
app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use((req, res, next) => {
  req.io = io;
  next()
})

// подключение контроллеров
    const controllersList = klawSync('./server/src/controllers', {
      nodir: true
    });
    controllersList.forEach(file => {
      if (
        path.basename(file.path) === '_' ||
        path.basename(file.path) === '.'
      ) {
        return;
      };


      if (typeof require(file.path) === 'function') {
        // console.log('check ' + file.path)
        app.use('/api', require(file.path));
      } else {
        console.warn(`No controller: ${file.path}`);
      }
    });



app.use(nuxt.render)

// Listen the server
server.listen(port, '0.0.0.0')
console.log('Server listening on localhost:' + port) // eslint-disable-line no-console

// Socket.io
io.on('connection', (socket) => {
  console.log('IO connected server')
    socket.on("createMessage", msg => {
      console.log(msg)
       socket.emit("newMessage", {
         text: "From server"
       });
    })
})
