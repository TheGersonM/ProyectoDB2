import fs from 'fs';
import path from 'path'
import { poolPromise, mssql } from '../database'

export async function modelFunctions(fileName: string) {
    const filePath = path.resolve(__dirname, `../model/${fileName}.model.json`);
    const data = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(data);
    const functions: { [key: string]: Function } = {};

    for (const element of json) {
        for (const key of Object.keys(element)) {
            const functionName = key;
            const params = element[key].params;
            const query = element[key].query;
            const type = element[key].type;

            functions[functionName] = async (...args: any[]) => {
                const paramValues: { [key: string]: any } = {};

                for (let i = 0; i < params.length; i++) {
                    paramValues[params[i].Param] = args[i];
                }

                const pool = await poolPromise;
                if (pool instanceof Error) {
                    throw pool;
                }

                const request = pool.request();

                for (let i = 0; i < params.length; i++) {
                    const paramName = params[i].Param;

                    var paramType: any;
                    var paramValue: any;

                    if (params[i].Type == "Table") {
                        const table = new mssql.Table();
                        params[i].Cols.forEach((element: any) => {
                            table.columns.add(element.Name, mssql[element.type as keyof typeof mssql]);
                        });

                        paramValues[paramName].forEach((row: any) => {
                            const values: any = Object.values(row);
                            table.rows.add(...values);
                        });

                        request.input(paramName, table);
                    } else {
                        paramType = mssql[params[i].Type as keyof typeof mssql];
                        paramValue = paramValues[paramName];
                        request.input(paramName, paramType, paramValue);
                    }
                }

                var rs: any;
                if (type == "query") {
                    rs = await request.query(query);
                } else {
                    rs = await request.execute(query);
                }

                if (rs.recordsets.length > 1) {
                    return rs.recordsets;
                } else {
                    return rs.recordset;
                }
            };
        }
    }

    return functions;
}