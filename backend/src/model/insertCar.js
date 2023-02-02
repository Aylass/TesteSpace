const { Client } = require('pg');
var fs = require('fs');

exports.car = function insertCar(carData) {
 
    let returnedObj = {result: null, error: null};

    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'postgres',
        port: 5432,
    })

    if((carData === undefined)
        ||(carData.car_id === undefined)
        ||(carData.car_fuel === undefined)
        ||(carData.car_manufacturer === undefined)
        ||(carData.car_model === undefined)
        ||(carData.car_name === undefined)
        ||(carData.car_type === undefined)
    ){
        returnedObj.error = "Errooooo";
        return returnedObj;
    }

    const query = `INSERT INTO users_cars (car_id, car_fuel, car_manufacturer, car_model, car_name, car_type) VALUES (${carData.car_id}, '${carData.car_fuel}', '${carData.car_manufacturer}', '${carData.car_model}', '${carData.car_name}', '${carData.car_type}') `

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
                fs.writeFile(`./logs/${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-insertCar.txt`,
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
            fs.writeFile(`./logs/${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-insertCar.txt`,
            error.toString(),
                function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                }
            );
        });
}