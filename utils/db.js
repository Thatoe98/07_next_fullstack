const mysql = require ('mysql2');

export const mysqlPool = mysql.createPool({
    host: 'localhost',
    user: 'u6708351',
    password: 'Ttn@52212136',
    database: 'u6708351_csc350',

});

