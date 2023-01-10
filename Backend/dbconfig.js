const {DB_USER,DB_PASSWORD,DB_SERVER,DB_DATABASE} = process.env

module.exports = {
    user : DB_USER,
    password : DB_PASSWORD,
    server : DB_SERVER,
    database : DB_DATABASE,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, 
        trustServerCertificate: true
    }
}