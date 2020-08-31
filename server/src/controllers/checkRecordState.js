const express = require("express");
const {axios, sendToBpium} = require('../utils/sendToBpium');
const recordState = express.Router();




recordState.post("/checkState", async (req, res) => {
  try {
    // let bpiumFrom = JSON.stringify(req.body)
    const fetchConfig = {
      method: 'patch',
      url: '/api/v1/catalogs/13/records/'
    }

    let respJSONfromTestBpiumRu = await axios.get('https://test.bpium.ru/api/webrequest/request/');
    let valuesToComment = String(respJSONfromTestBpiumRu.data.value)

    fetchConfig.url += req.body.payload.recordId;
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
    process.send({
      emit: "newMessage",
      route: "/checkState",
      bpiumFrom: req.body,
      bpiumTo: fetchConfig
    })

    await sendToBpium(fetchConfig);

    res.json({
      message: {
        title: 'Изменение комментария',
        text: 'Изменён комментарий при изменении статуса'
      }
    });
    // res.redirect(`/check?bpiumFrom=${bpiumFrom}&bpiumTo=${bpiumTo}`);
  }catch (e){
    console.log(e.message)
  }

});

module.exports = recordState;
