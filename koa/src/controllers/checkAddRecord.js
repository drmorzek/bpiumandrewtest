
const {sendToBpium} = require('../utils/sendToBpium');


exports.init = ({
  api
}) => api.post("/checkAddRecord", async (ctx) => {
  try {
    // let bpiumFrom = JSON.stringify(req.body)
    console.log(ctx.req.body)
    const fetchConfig = {
      method: 'post',
      url: '/api/v1/catalogs/14/records/'
    }

    let commentLead = ctx.req.body.payload.values['3'];
    let leadJSON = [{
      'catalogId': ctx.req.body.payload.catalogId,
      'recordId': ctx.req.body.payload.recordId
    }]


    fetchConfig.data = {
      values: {
        '4': commentLead,
        '3': leadJSON
      },
      message: 'Добавлен заказ в заказы2'
    };
    // let bpiumTo = JSON.stringify(fetchConfig)

    await ctx.io.sockets.emit("newMessage", {
      route: "/checkAddRecord",
      bpiumFrom: ctx.req.body,
      bpiumTo: fetchConfig
    });
    await sendToBpium(fetchConfig);
    ctx.body ={
      message: 'Добавлен заказа в заказы2'
    }
  } catch (e) {
    console.log(e)
  }
})



