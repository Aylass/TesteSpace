const { Client } = require('pg');
var fs = require('fs');

exports.products = function getproducts() {
 
    let result = "null";

    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'postgres',
        port: 5432,
    })

    const query = "SELECT * FROM users_products_buyed";

    const executeQuery = () => {
        const successful = (res) => {
            client.end();

            result = res.rows;

            return result;
        };

        return client
            .query(query)
            .then(successful)
            .catch((error) => {
                const date = new Date();
                fs.appendFile(`./logs/${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-getProductsBuyed.txt`,
                error.toString(),
                    function (err) {
                        if (err) throw err;
                        console.log('Saved!');
                    }
                );
            });
    }

    return client.connect()
        .then(executeQuery)
        .catch((error) => {
            const date = new Date();
            fs.appendFile(`./logs/${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-getProductsBuyed.txt`,
            error.toString(),
                function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                }
            );
        });
}