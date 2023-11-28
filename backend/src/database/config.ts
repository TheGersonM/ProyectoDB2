export const config = {
    server: process.env.SERVERDB || "",
    database: process.env.DB || "",
    user: process.env.USERDB || "",
    password: process.env.PASSDB || "",
    options: {
        encrypt: false,
        port: 1433,
        enableArithAbort: true,
        textsize: 1000000000
    }
}