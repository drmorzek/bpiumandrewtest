const express = require("express");
const axios = require('axios');
const sendToBpium = require('../utils/sendToBpium');
const recordState = express.Router();

const fetchConfig = {
    method: 'patch',
        url: '/api/v1/catalogs/13/records/'
} 


recordState.post("/checkState", async (req, res) => {

    let respJSONfromTestBpiumRu = await axios.get('https://test.bpium.ru/api/webrequest/request/');
    let valuesToComment = String(respJSONfromTestBpiumRu.data.value)

    fetchConfig.url += req.body.payload.recordId;
    fetchConfig.data = {
        values: {
            '3': valuesToComment
        }
    };


    await sendToBpium(fetchConfig);
    res.json(req.body);

});

module.exports = recordState;