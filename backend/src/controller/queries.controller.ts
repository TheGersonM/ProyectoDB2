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

export const ObtenerCamas = async ({ query }: Request, res: Response) => {
    try {
        res.json(await queriesModel.ObtenerCamas());
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const ObtenerCama = async ({ query }: Request, res: Response) => {
    try {
        const { ID } = query
        return res.json(await queriesModel.ObtenerCama(ID));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const ObtenerAtenciones = async ({ query }: Request, res: Response) => {
    try {
        res.json(await queriesModel.ObtenerAtenciones());
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const ObtenerAtencion = async ({ query }: Request, res: Response) => {
    try {
        const { ID } = query
        return res.json(await queriesModel.ObtenerAtencion(ID));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const ObtenerCirugias = async ({ query }: Request, res: Response) => {
    try {
        res.json(await queriesModel.ObtenerCirugias());
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const ObtenerCirugia = async ({ query }: Request, res: Response) => {
    try {
        const { ID } = query
        return res.json(await queriesModel.ObtenerCirugia(ID));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const ObtenerHospitalizaciones = async ({ query }: Request, res: Response) => {
    try {
        return res.json(await queriesModel.ObtenerHospitalizaciones());
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const ObtenerHospitalizacion = async ({ query }: Request, res: Response) => {
    try {
        const { ID } = query
        return res.json(await queriesModel.ObtenerHospitalizacion(ID));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const ObtenerConsultorios = async ({ query }: Request, res: Response) => {
    try {
        return res.json(await queriesModel.ObtenerConsultorios());
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const ObtenerConsultorio = async ({ query }: Request, res: Response) => {
    try {
        const { ID } = query
        return res.json(await queriesModel.ObtenerConsultorio(ID));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const ObtenerHospitalizacionesPorPaciente = async ({ query }: Request, res: Response) => {
    try {
        const { ID } = query
        return res.json(await queriesModel.ObtenerHospitalizacionesPorPaciente(ID));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const ObtenerHabitacionesDisponibles = async ({ query }: Request, res: Response) => {
    try {
        return res.json(await queriesModel.ObtenerHabitacionesDisponibles());
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const ObtenerCamasDisponibles = async ({ query }: Request, res: Response) => {
    try {
        return res.json(await queriesModel.ObtenerCamasDisponibles());
    } catch (err) {
        console.log(err)
        return res.status(500).json(err);
    }
}