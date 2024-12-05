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
        console.log(err)
        return res.status(500).json(err.message);
    }
}
export const ObtenerMedicosInternos = async ({ body }: Request, res: Response) => {
    try {
        return res.json(await queriesModel.ObtenerMedicosInternos());
    } catch (err) {
        console.log(err)
        return res.status(500).json(err.message);
    }
}
export const ObtenerMedicosExternos = async ({ body }: Request, res: Response) => {
    try {
        return res.json(await queriesModel.ObtenerMedicosExternos());
    } catch (err) {
        console.log(err)
        return res.status(500).json(err.message);
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
export const ObtenerMedicosPorConsulta = async ({ query }: Request, res: Response) => {
    try {
        const { ID } = query
        return res.json(await queriesModel.ObtenerMedicosPorConsulta(ID));
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

export const ObtenerFacturas = async ({ query }: Request, res: Response) => {
    try {
        return res.json(await queriesModel.ObtenerFacturas());
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const ObtenerFactura = async ({ query }: Request, res: Response) => {
    try {
        const { ID } = query
        return res.json(await queriesModel.ObtenerFactura(ID));
    } catch (err) {
        return res.status(500).json(err);
    }
}
export const ObtenerFacturaDetalle = async ({ query }: Request, res: Response) => {
    try {
        const { ID } = query
        return res.json(await queriesModel.ObtenerFacturaDetalle(ID));
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

export const ObtenerConsultoriosAlquilados = async ({ query }: Request, res: Response) => {
    try {
        return res.json(await queriesModel.ObtenerConsultoriosAlquilados());
    } catch (err) {
        console.log(err)
        return res.status(500).json(err);
    }
}

export const ObtenerCobroConsultorios = async ({ query }: Request, res: Response) => {
    try {
        return res.json(await queriesModel.ObtenerCobroConsultorios());
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const ObtenerCobroConsultorio = async ({ query }: Request, res: Response) => {
    try {
        const { ID } = query
        return res.json(await queriesModel.ObtenerCobroConsultorio(ID));
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

export const ObtenerCheques = async ({ query }: Request, res: Response) => {
    try {
        return res.json(await queriesModel.ObtenerCheques());
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const ObtenerCheque = async ({ query }: Request, res: Response) => {
    try {
        const { ID } = query
        return res.json(await queriesModel.ObtenerCheque(ID));
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

export const ObtenerAtencionesPorPaciente = async ({ query }: Request, res: Response) => {
    try {
        const { ID_Paciente } = query
        return res.json(await queriesModel.ObtenerAtencionesPorPaciente(ID_Paciente));
    } catch (err) {
        console.log(err)
        return res.status(500).json(err);
    }
}