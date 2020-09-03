const {axios, sendToBpium} = require('../utils/sendToBpium');

exports.init = ({
  api
}) => api.post("/checkState", async (ctx) => {
  try {
    // let bpiumFrom = JSON.stringify(req.body)
    const fetchConfig = {
      method: 'patch',
      url: '/api/v1/catalogs/13/records/'
    }

    let respJSONfromTestBpiumRu = await axios.get('https://test.bpium.ru/api/webrequest/request/');
    let valuesToComment = String(respJSONfromTestBpiumRu.data.value)

    fetchConfig.url += ctx.req.body.payload.recordId;
    fetchConfig.data = {
      values: {
        '3': valuesToComment
      },
      message: {
        title: 'Изменение статуса',
        text: 'Изменён комментарий при изменении статуса'
      }
    };
    // let bpiumTo = JSON.stringify(fetchConfig)
    await ctx.io.sockets.emit("newMessage", {
      route: "/checkState",
      bpiumFrom: ctx.req.body,
      bpiumTo: fetchConfig
    });

    await sendToBpium(fetchConfig);

    ctx.body = {
      message: {
        title: 'Изменение комментария',
        text: 'Изменён комментарий при изменении статуса'
      }
    }
    // res.redirect(`/check?bpiumFrom=${bpiumFrom}&bpiumTo=${bpiumTo}`);
  } catch (e) {
    console.log(e.message)
  }
})



