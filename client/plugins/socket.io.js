

import Vue from "vue";
import io from "socket.io-client";
import VueSocketIO from "vue-socket.io";


export default ({ store, env }) => {
    
    let url = env.WS_URL;

    const socket = io({
      connection: process.env.WS_URL,
      // wsEngine: "eiows",
      // transports: ["jsonp-polling"],
      // reconnection: true,
      // reconnectionAttempts: Infinity,
      // autoConnect: true
    });

    Vue.use(
      new VueSocketIO({
        debug: false,
        connection: socket,
        vuex: {
          store,
          actionPrefix: "SOCKET_",
          mutationPrefix: "SOCKET_",
        },
      })
    );
};

