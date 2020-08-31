import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'


export default function({store}){
  let portIO = process.env.PORTIO || 3030;
  let url = (process.env.BASE_URL !== undefined) ? process.env.BASE_URL + `:${portIO}` : "http://localhost:3030/";
  Vue.use(
    new VueSocketIO({
      debug: true,
      connection: url,
      // wsEngine: "eiows",
      // transports: ['websocket',
      //   'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling'
      // ],
      // upgrade: true,
      // upgradeTimeout: 6000000,
      // pingTimeout: 15000000000,
      // pingInterval: 1500000000,
      // maxHttpBufferSize: 10000000
      options: {
          upgrade: true,
        transports: [
          'websocket',
          'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling'
      ]
      },
      vuex: {
        store,
        actionPrefix: "SOCKET_",
        mutationPrefix: "SOCKET_"
      }
    })
  );
}
