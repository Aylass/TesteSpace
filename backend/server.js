const express = require('express');
const app = express();
const port = normalizaPort(process.env.PORT || '8080');
const router = express.Router();
const indexRoute = require('./src/router/routes.js');
let bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000'
}));

function normalizaPort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
            return port;
        }
    return false;
}


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing
app.use('/',indexRoute);
app.listen(port, function () {
    console.log(`app listening on port ${port}`)
})