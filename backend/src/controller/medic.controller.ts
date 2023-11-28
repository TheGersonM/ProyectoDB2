import { Request, Response } from "express"
import { modelFunctions } from "../service"

let authFunctions: { [key: string]: Function; };

modelFunctions("auth").then((functions) => {
    authFunctions = functions;
});

export const signIn = async (req: Request, res: Response) => {
    try {
        return res.json(await authFunctions.signIn(req.body));
    } catch (err) {
        return res.status(500).json(err);
    }
}