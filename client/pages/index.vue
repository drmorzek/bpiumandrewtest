<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        nuxt-api-test
      </h1>
        <button @click="message">
          Test socket
        </button>

      </div>
    </div>
</template>

<script>
export default {
  mounted() {

  },
  sockets: {
    connect: () => {

      console.log("Socket connected");
    },
  },
  // },
  methods: {
      message() {
        console.log('message')
        this.$socket.emit("createMessage", {
          text: "FROM CLIENT"
        })
      }
    }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
