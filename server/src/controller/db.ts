import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'dydtjr07', // we use container of docker
  database: 'POCAZ',
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
