import { Request, Response } from "express"
import { modelFunctions } from "../service"

let medicFunctions: { [key: string]: Function; };

modelFunctions("auth").then((functions) => {
    medicFunctions = functions;
});

export const ActualizarAtencion = async ({ body }: Request, res: Response) => {
    try {
        const { ID, Fecha, Tipo, Detalles } = body
        return res.json(await medicFunctions.ActualizarAtencion(ID, Fecha, Tipo, Detalles));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const ActualizarCirugia = async ({ body }: Request, res: Response) => {
    try {
        const { ID, Fecha, Hora, Tipo, PersonalMedico, Medicamentos, Materiales, ID_Quirofano } = body
        return res.json(await medicFunctions.ActualizarCirugia(ID, Fecha, Hora, Tipo, PersonalMedico, Medicamentos, Materiales, ID_Quirofano));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const ActualizarConsulta = async ({ body }: Request, res: Response) => {
    try {
        const { ID, Fecha, Hora, ID_Paciente, ID_Medico, Motivo } = body
        return res.json(await medicFunctions.ActualizarConsulta(ID, Fecha, Hora, ID_Paciente, ID_Medico, Motivo));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const ActualizarHabitacion = async ({ body }: Request, res: Response) => {
    try {
        const { ID, Tipo, Estado } = body
        return res.json(await medicFunctions.ActualizarHabitacion(ID, Tipo, Estado));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const ActualizarHospitalizacion = async ({ body }: Request, res: Response) => {
    try {
        const { ID, FechaIngreso, FechaAlta, Categoria, Honorarios, ID_Paciente, ID_Medico, ID_Habitacion } = body
        return res.json(await medicFunctions.ActualizarHospitalizacion(ID, FechaIngreso, FechaAlta, Categoria, Honorarios, ID_Paciente, ID_Medico, ID_Habitacion));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const ActualizarMedico = async ({ body }: Request, res: Response) => {
    try {
        const { ID, Nombre, NumeroLicencia, Especialidad } = body
        return res.json(await medicFunctions.ActualizarMedico(ID, Nombre, NumeroLicencia, Especialidad));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const ActualizarPaciente = async ({ body }: Request, res: Response) => {
    try {
        const { ID, Nombre, Apellidos, Direccion, Telefono, FechaNacimiento, SeguroMedico } = body
        return res.json(await medicFunctions.ActualizarPaciente(ID, Nombre, Apellidos, Direccion, Telefono, FechaNacimiento, SeguroMedico));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const ActualizarQuirofano = async ({ body }: Request, res: Response) => {
    try {
        const { ID, Numero, Estado } = body
        return res.json(await medicFunctions.ActualizarQuirofano(ID, Numero, Estado));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const EliminarAtencion = async ({ body }: Request, res: Response) => {
    try {
        const { ID } = body
        return res.json(await medicFunctions.EliminarAtencion(ID));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const EliminarCirugia = async ({ body }: Request, res: Response) => {
    try {
        const { ID } = body
        return res.json(await medicFunctions.EliminarCirugia(ID));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const EliminarConsulta = async ({ body }: Request, res: Response) => {
    try {
        const { ID } = body
        return res.json(await medicFunctions.EliminarConsulta(ID));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const EliminarHabitacion = async ({ body }: Request, res: Response) => {
    try {
        const { ID } = body
        return res.json(await medicFunctions.EliminarHabitacion(ID));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const EliminarHospitalizacion = async ({ body }: Request, res: Response) => {
    try {
        const { ID } = body
        return res.json(await medicFunctions.EliminarHospitalizacion(ID));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const EliminarMedico = async ({ body }: Request, res: Response) => {
    try {
        const { ID } = body
        return res.json(await medicFunctions.EliminarMedico(ID));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const EliminarPaciente = async ({ body }: Request, res: Response) => {
    try {
        const { ID } = body
        return res.json(await medicFunctions.EliminarPaciente(ID));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const EliminarQuirofano = async ({ body }: Request, res: Response) => {
    try {
        const { ID } = body
        return res.json(await medicFunctions.EliminarQuirofano(ID));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const InsertarAtencion = async ({ body }: Request, res: Response) => {
    try {
        const { Fecha, Tipo, Detalles } = body
        return res.json(await medicFunctions.InsertarAtencion(Fecha, Tipo, Detalles));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const InsertarCirugia = async ({ body }: Request, res: Response) => {
    try {
        const { Fecha, Hora, Tipo, PersonalMedico, Medicamentos, Materiales, ID_Quirofano } = body
        return res.json(await medicFunctions.InsertarCirugia(Fecha, Hora, Tipo, PersonalMedico, Medicamentos, Materiales, ID_Quirofano));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const InsertarConsulta = async ({ body }: Request, res: Response) => {
    try {
        const { Fecha, Hora, ID_Paciente, ID_Medico, Motivo } = body
        return res.json(await medicFunctions.InsertarConsulta(Fecha, Hora, ID_Paciente, ID_Medico, Motivo));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const InsertarHabitacion = async ({ body }: Request, res: Response) => {
    try {
        const { Tipo, Estado } = body
        return res.json(await medicFunctions.InsertarHabitacion(Tipo, Estado));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const InsertarHospitalizacion = async ({ body }: Request, res: Response) => {
    try {
        const { FechaIngreso, FechaAlta, Categoria, Honorarios, ID_Paciente, ID_Medico, ID_Habitacion } = body
        return res.json(await medicFunctions.InsertarHospitalizacion(FechaIngreso, FechaAlta, Categoria, Honorarios, ID_Paciente, ID_Medico, ID_Habitacion));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const InsertarMedico = async ({ body }: Request, res: Response) => {
    try {
        const { Nombre, NumeroLicencia, Especialidad } = body
        return res.json(await medicFunctions.InsertarMedico(Nombre, NumeroLicencia, Especialidad));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const InsertarPaciente = async ({ body }: Request, res: Response) => {
    try {
        const { Nombre, Apellidos, Direccion, Telefono, FechaNacimiento, SeguroMedico } = body
        return res.json(await medicFunctions.InsertarPaciente(Nombre, Apellidos, Direccion, Telefono, FechaNacimiento, SeguroMedico));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const InsertarQuirofano = async ({ body }: Request, res: Response) => {
    try {
        const { Numero, Estado } = body
        return res.json(await medicFunctions.InsertarQuirofano(Numero, Estado));
    } catch (err) {
        return res.status(500).json(err);
    }
}