const { Client } = require('pg');

exports.users = function getUsers() {
 
    let result = "null";

    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'postgres',
        port: 5432,
    })

    const query = "SELECT * FROM users";

    const executeQuery = () => {
        const successful = (res) => {
            client.end();

            result = res.rows;

            return result;
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