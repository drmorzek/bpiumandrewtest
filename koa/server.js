const isProd = process.env.NODE_ENV === 'production'
// const HOST = process.env.HOST || `0.0.0.0`;
const PORT = process.env.PORT || 3000;

const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const cookieParser = require("koa-cookie");


const klawSync = require("klaw-sync");
const path = require("path");
const http = require("http");

// подключаем nuxt
const {
  Nuxt,
  Builder
} = require('nuxt')
const koaNuxt = require("@hiswe/koa-nuxt");
const config = require('../nuxt.config.js')
config.dev = !isProd
const nuxt = new Nuxt(config)
// Start build process in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// подключаем sockt.io
const app = new Koa();
const server = http.createServer(app.callback())
const io = require('socket.io')(server)

//koa middleware
app.use(bodyParser());
app.use(async (ctx, next) => {
    ctx.req.body = ctx.request.body;
    await next()
});
app.use(cookieParser.default());
app.use(async (ctx, next) => {
    ctx.io = io
    await next()
} )

// подключение контроллеров
const api = Router({prefix: '/api'})
const controllersList = klawSync("./koa/src/controllers", {
  nodir: true,
});
// console.log(app);
controllersList.forEach((file) => {
  if (path.basename(file.path) === "_" || path.basename(file.path) === ".") {
    return;
  }
  require(file.path).init({api})
});
app.use(api.routes());
app.use(api.allowedMethods())

// рендер nuxt
app.use(ctx => {
  ctx.status = 200
  ctx.respond = false // Mark request as handled for Koa
  ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
  nuxt.render(ctx.req, ctx.res)
})

server.listen(PORT, '0.0.0.0', () => {
    console.log('Server listening on localhost:' + PORT)
});

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
