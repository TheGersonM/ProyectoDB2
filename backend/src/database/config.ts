import dotenv from 'dotenv';

// Carga las variables desde el archivo .env
dotenv.config();

export const config = {
    server: "DESKTOP-3RSI9MI\\SQLEXPRESS", 
    database:  "CentroMedicoLaPaz",
    user:  "sa",
    password: "12345678",
    options: {
        encrypt: false,
        port: 1433, 
        enableArithAbort: true,
        textsize: 1000000000,
        trustServerCertificate: true,
    },
};
