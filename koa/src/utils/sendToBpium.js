const axios = require('axios');

const urlbpium = 'https://andrewtest.bpium.ru';

let  sendToBpium =  async (config) => {
        const url = urlbpium + config.url;
        config.url = url;
        config.data = JSON.stringify(config.data);
        config.headers =  {
            'Authorization': 'Basic blablabla',
            'Content-Type': 'application/json'}
        try {
            let response = await axios(config);
            return(response.data);

        }catch (e) {
            console.log(e.message);
        }
;
};

module.exports = {
        axios,
        sendToBpium
    };
