const { Client } = require('pg');
var fs = require('fs');

exports.user = function updateUser(data) {
    let returnedObj = {result: null, error: null};

    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'postgres',
        port: 5432,
    })

    if(data.user_id === undefined){
        returnedObj.error = "Errooooo";
        return returnedObj;
    }

    const query = `UPDATE users 
                        SET 
                            user_first_name='${data.user_first_name}',
                            user_birth_date='${data.user_birth_date}',
                            user_access_id=${data.user_access_id},
                            user_address_id=${data.user_address_id},
                            user_job_id=${data.user_job_id},
                            user_product_buyed_id=${data.user_product_buyed_id},
                            user_car_id=${data.user_car_id},
                            status=${data.status}
                        WHERE 
                            user_id=${data.user_id}`
                            
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
                console.log('Error:',error);
                const date = new Date();
                fs.writeFile(`./logs/${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-updateUser.txt`,
                error.toString(),
                    function (err) {
                        console.log('Error:',err,'Saved!');
                        if (err) throw err;
                    }
                );
            });
    }

    return client.connect()
        .then(executeQuery)
        .catch((error) => {
            const date = new Date();
            fs.writeFile(`./logs/${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-updateUser.txt`,
            error.toString(),
                function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                }
            );
        });
}