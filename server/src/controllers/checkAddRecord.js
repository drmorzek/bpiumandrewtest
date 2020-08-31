const express = require("express");
const {sendToBpium} = require('../utils/sendToBpium');
const addRecord = express.Router();




addRecord.post("/checkAddRecord", async (req, res) => {
  try {
    // let bpiumFrom = JSON.stringify(req.body)
    const fetchConfig = {
      method: 'post',
      url: '/api/v1/catalogs/14/records/'
    }

    let commentLead = req.body.payload.values['3'];
    let leadJSON = [{
      'catalogId': req.body.payload.catalogId,
      'recordId': req.body.payload.recordId
    }]


    fetchConfig.data = {
      values: {
        '4': commentLead,
        '3': leadJSON
      },
      message: 'Добавлен заказ в заказы2'
    };
    // let bpiumTo = JSON.stringify(fetchConfig)

    process.send({
      emit: "newMessage",
      route: "/checkAddRecord",
      bpiumFrom: req.body,
      bpiumTo: fetchConfig
    })
    await sendToBpium(fetchConfig);
    res.json({
      message: 'Добавлен заказа в заказы2'

    });
  } catch (e) {
    console.log(e.message)
  }

    // res.redirect(`/check?bpiumFrom=${bpiumFrom}&bpiumTo=${bpiumTo}`)

});

module.exports = addRecord;
