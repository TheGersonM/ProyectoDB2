import { Router } from "express";
import { readdirSync } from "fs";

const router = Router();

const path_route = `${__dirname}`

const clearName = (fileName: string) => {
    return fileName.split(".").shift();
}

readdirSync(path_route).filter(__filename => {
    const name = clearName(__filename);
    if (name !== "index") {
        import(`./${name}`).then((moduleRoute) => {
            router.use(`/apiRequest/${name}`, moduleRoute.router)
        });
    }
})

export { router };