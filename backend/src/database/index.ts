import mssql from 'mssql';
import { config } from './config'

const poolPromise = new mssql.ConnectionPool(config)
    .connect()
    .then((pool: mssql.ConnectionPool) => {
        return pool
    })
    .catch(err => {
        console.log('Database Connection Failed! Bad Config: ', err);
        return new Error('Database Connection Failed');
    });

export {
    poolPromise,
    mssql
}