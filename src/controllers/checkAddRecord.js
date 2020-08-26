const express = require("express");
const sendToBpium = require('../utils/sendToBpium');
const addRecord = express.Router();

const fetchConfig = {
    method: 'post',
        url: '/api/v1/catalogs/14/records/'
} 


addRecord.post("/checkAddRecord", async (req, res) => {

    // console.log(req.body)

    let commentLead = req.body.payload.values['3'];
    let leadJSON = [{
        'catalogId': req.body.payload.catalogId,
        'recordId': req.body.payload.recordId
    }]


    fetchConfig.data = {
        values: {
            '4': commentLead,
            '3': leadJSON
        }
    };


    await sendToBpium(fetchConfig);
    res.json(req.body);

});

module.exports = addRecord;