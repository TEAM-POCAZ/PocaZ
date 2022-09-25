import mysql, { Pool } from 'mysql2/promise';
import { config } from '../config';

const { host, user, database, password } = config.db;

const db = (() => {
  let dbPool: Pool;
  const initiate = () => {
    return mysql.createPool({
      host,
      user,
      database,
      password,
    });
  };
  return {
    getPool: function () {
      if (!dbPool) {
        dbPool = initiate();
        return dbPool;
      } else return dbPool;
    },
  };
})();

export default db;
