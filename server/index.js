const cluster = require('cluster');
const os = require('os');
const pid = process.pid;
var url = require('url');

let workers = []
let io = [];

if (cluster.isMaster) {
    const cpusCount = os.cpus().length;
    console.log(`CPUs: ${cpusCount}`);
    console.log(`Master cluster started. Pid: ${pid}`);

    for (let i = 0; i < 4; i++) {
    // for (let i = 0; i < cpusCount-1; i++) {
        let worker = cluster.fork();

        //Слушаем сообщение от workera
        worker.on('message', function (data) {
          //отправляем всем worker'ам сообщение
          for (var j in workers) {
            workers[j].send(data);
          }
        });
        //Добавляем объект worker в массив

        workers.push(worker);
    }

    cluster.on('exit', (worker, code) => {
        console.log(`Worker died! Pid: ${worker.process.pid}. `);
        // delete workers[cluster.worker.id]
        if (code === 1) {
           workers.push( cluster.fork())
        }
    });
}

//тут запускается сервер
if (cluster.isWorker) {
    // require('./app.js');

    let worker_id = cluster.worker.id;


    const klawSync = require("klaw-sync");
    const path = require("path");
    const bodyparser = require("body-parser");
    const cookieParser = require("cookie-parser");
    const consola = require("consola");

    const express = require("express");
    const expressIO = express();
    const serverIO = require("http").createServer(expressIO);

    console.log(`Worker cluster started. Pid: ${process.pid}`)
    io[worker_id] = require("socket.io")(serverIO, {
      upgrade: true,
      transports: [
        "websocket",
        "flashsocket",
        "htmlfile",
        "xhr-polling",
        "jsonp-polling",
        "polling"
      ]
    })
    let urlIO = process.env.BASE_URL || "http://localhost:3000/"
    let portIO = process.env.PORTIO || 3030;
    serverIO.listen(portIO);

    io[worker_id].sockets.on('connection', async (socket) => {
      console.log('SERVERIO connected ' +
        process.pid
      );
      try {
        socket.on("createMessage", msg => {
          for (var j in io) {
            io[j].sockets.emit("newMessage", {
              text: "From server"
            })
          }
        })
      } catch (e) {
        console.log(e.message)
      }

    });

    const app = express();
    //подключение NuxtJS
    const {
      Nuxt,
      Builder
    } = require("nuxt");

    let config = require("../nuxt.config.js");
    config.dev = !(process.env.NODE_ENV === "production");


    //кастомные middleware
    app.use(cookieParser());
    app.use(bodyparser.json());
    app.use(
      bodyparser.urlencoded({
        extended: true
      })
    );
    // app.use(function (req, res, next) {
    //   req.$socket = process.send;
    //   // req.$socket.emit = io.sockets;
    //   next();
    // });



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
        console.log('check ' + file.path)
        app.use('/api', require(file.path));
      } else {
        console.warn(`No controller: ${file.path}`);
      }
    });




    async function master() {
      const nuxt = new Nuxt(config);

      const {
        host,
        port
      } = nuxt.options.server;

      if (config.dev) {
        const builder = new Builder(nuxt);
        await builder.build();
      } else {
        await nuxt.ready();
      }


      let appUrl = url.parse(urlIO, true)
      let portApp = process.env.PORT || 3000;
      // console.log(appUrl)

      app.use(nuxt.render);

      app.listen(portApp, () => {

        consola.ready({
          message: `Server listening on ${appUrl.href}`,
          badge: true
        });
      });


    }
    master();

    //Обработка сообщений от worker//
    process.on('message', function (msg) {
      console.log(worker_id);

      for (var j in io) {
        io[j].sockets.emit('newMessage', msg)
      }


    });
}
