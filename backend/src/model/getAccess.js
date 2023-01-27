const { Client } = require('pg');

exports.access = function getAccess() {
 
    let result = "null";

    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'postgres',
        port: 5432,
    })

    const query = "SELECT * FROM users_access";

    const executeQuery = () => {
        const successful = (res) => {
            client.end();

            result = res.rows;

            return result;
        };

        return client
            .query(query)
            .then(successful)
            .catch(err => console.log(err));
    }

    return client.connect()
        .then(executeQuery)
        .catch(err => console.log(err))
}