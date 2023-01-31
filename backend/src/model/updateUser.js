const { Client } = require('pg');

exports.user = function updateUser(data) {
 
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
            .catch(err => console.log("erroo",err));
    }

    return client.connect()
        .then(executeQuery)
        .catch(err => console.log("erroo",err))
}