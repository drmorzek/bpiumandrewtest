const axios = require('axios');

const urlbpium = 'https://andrewtest.bpium.ru';

let  sendToBpium =  async (config) => {

        config.url = urlbpium + config.url;
        config.data = JSON.stringify(config.data);
        config.headers =  {
            'Authorization': 'Basic ZHJtb3J6ZWtAbWFpbC5ydTo2NTYyNzE1Mw==',
            'Content-Type': 'application/json'}

        try {
            let response = await axios(config);
            return(response.data);

        }catch (e) {
            console.log(e);
        }
;
};

module.exports = sendToBpium;