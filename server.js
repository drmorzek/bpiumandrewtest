const express = require('express');
const app = express();
const bodyparser = require("body-parser");
const cookieParser = require('cookie-parser');
const klawSync = require("klaw-sync");
const path = require("path");
require("dotenv").config();

app.use(cookieParser());
app.use(bodyparser.json());
app.use(
    bodyparser.urlencoded({
        extended: true,
    })
);

// подключение контроллеров
const controllersList = klawSync('./src/controllers', {nodir: true});
controllersList.forEach(file => {
    if (
        path.basename(file.path) === '_' ||
        path.basename(file.path) === '.'
    ) {
        return;
    };

    if (typeof require(file.path) === 'function') {
        app.use('/api', require(file.path));
    } else {
        console.warn(`No controller: ${file.path}`);
    }
});


app.listen(process.env.PORT || 3000, function (err) {

    if (err) {
        console.log("server is not working");
    } else {
        console.log("Server is working on http://localhost:3000");
    }
})