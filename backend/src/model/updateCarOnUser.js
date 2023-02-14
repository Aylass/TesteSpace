const { Client } = require('pg');
var fs = require('fs');

exports.user = function updateCarOnUser(data) {
    let returnedObj = {result: null, error: null};

    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'postgres',
        port: 5432,
    })

    if((data.car_id === undefined)||(data.user_id === undefined)
    ){
        returnedObj.error = "Errooooo";
        return returnedObj;
    }

    const query = `UPDATE users set user_car_id=${data.car_id} WHERE user_id=${data.user_id}`

    const executeQuery = () => {
        const successful = (res) => {
            client.end();

            returnedObj.result = res.rows;

            return returnedObj;
        };

        return client
            .query(query)
            .then(successful)
            .catch((error) => {
                const date = new Date();
                fs.writeFile(`./logs/${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-updateCarOnUser.txt`,
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
            fs.writeFile(`./logs/${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-updateCarOnUser.txt`,
            error.toString(),
                function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                }
            );
        });
}