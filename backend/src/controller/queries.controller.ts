import { Request, Response } from "express"
import { modelFunctions } from "../service"

let queriesModel: { [key: string]: Function; };

modelFunctions("queries").then((functions) => {
    queriesModel = functions;
});

export const ObtenerMedicos = async ({ body }: Request, res: Response) => {
    try {
        return res.json(await queriesModel.ObtenerMedicos());
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const ObtenerMedico = async ({ query }: Request, res: Response) => {
    try {
        const { ID } = query
        return res.json(await queriesModel.ObtenerMedico(ID));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const ObtenerHabitaciones = async ({ query }: Request, res: Response) => {
    try {
        return res.json(await queriesModel.ObtenerHabitaciones());
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const ObtenerHabitacion = async ({ query }: Request, res: Response) => {
    try {
        const { ID } = query
        return res.json(await queriesModel.ObtenerHabitacion(ID));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const ObtenerQuirofanos = async ({ query }: Request, res: Response) => {
    try {
        return res.json(await queriesModel.ObtenerQuirofanos());
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const ObtenerQuirofano = async ({ query }: Request, res: Response) => {
    try {
        const { ID } = query
        return res.json(await queriesModel.ObtenerQuirofano(ID));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const ObtenerPacientes = async ({ query }: Request, res: Response) => {
    try {
        return res.json(await queriesModel.ObtenerPacientes());
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const ObtenerPaciente = async ({ query }: Request, res: Response) => {
    try {
        const { ID } = query
        return res.json(await queriesModel.ObtenerPaciente(ID));
    } catch (err) {
        return res.status(500).json(err);
    }
}
export const ObtenerConsultas = async ({ query }: Request, res: Response) => {
    try {
        return res.json(await queriesModel.ObtenerConsultas());
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const ObtenerConsulta = async ({ query }: Request, res: Response) => {
    try {
        const { ID } = query
        return res.json(await queriesModel.ObtenerConsulta(ID));
    } catch (err) {
        return res.status(500).json(err);
    }
}