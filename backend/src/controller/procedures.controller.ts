import { Request, Response } from "express"
import { modelFunctions } from "../service"

let proceduresModel: { [key: string]: Function; };

modelFunctions("procedures").then((functions) => {
    proceduresModel = functions;
});

export const ActualizarAtencion = async ({ body }: Request, res: Response) => {
    try {
        const { ID, ID_Paciente, ID_Hospitalizacion, ID_Medico, Fecha, Tipo, Detalles } = body
        return res.json(await proceduresModel.ActualizarAtencion(ID, ID_Paciente, ID_Hospitalizacion, ID_Medico, Fecha, Tipo, Detalles));
    } catch (err) {
        console.log(err)
        return res.status(500).json(err);
    }
}

export const ActualizarCama = async ({ body }: Request, res: Response) => {
    try {
        const { ID, Numero, Estado } = body
        return res.json(await proceduresModel.ActualizarCama(ID, Numero, Estado));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const ActualizarCirugia = async ({ body }: Request, res: Response) => {
    try {
        const { ID, ID_Paciente, ID_Medico, Fecha, Hora, Tipo, PersonalMedico, Medicamentos, Materiales, ID_Quirofano } = body
        return res.json(await proceduresModel.ActualizarCirugia(ID, ID_Paciente, ID_Medico, Fecha, Hora, Tipo, PersonalMedico, Medicamentos, Materiales, ID_Quirofano));
    } catch (err) {
        console.log(err)
        return res.status(500).json(err);
    }
}

export const ActualizarConsulta = async ({ body }: Request, res: Response) => {
    try {
        const { ID, Fecha, Hora, ID_Paciente, ID_Medico, Motivo } = body
        return res.json(await proceduresModel.ActualizarConsulta(ID, Fecha, Hora, ID_Paciente, ID_Medico, Motivo));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const ActualizarConsultorio = async ({ body }: Request, res: Response) => {
    try {
        const { ID, Nombre, ID_Medico, Tipo } = body
        return res.json(await proceduresModel.ActualizarConsultorio(ID, Nombre, ID_Medico, Tipo));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const ActualizarHabitacion = async ({ body }: Request, res: Response) => {
    try {
        const { ID, Tipo, Estado, NumeroHabitacion } = body
        return res.json(await proceduresModel.ActualizarHabitacion(ID, Tipo, Estado, NumeroHabitacion));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const ActualizarHospitalizacion = async ({ body }: Request, res: Response) => {
    try {
        const { ID, ID_Paciente, ID_Medico, FechaIngreso, FechaAlta, ID_Habitacion, ID_Cama } = body
        return res.json(await proceduresModel.ActualizarHospitalizacion(ID, ID_Paciente, ID_Medico, FechaIngreso, FechaAlta, ID_Habitacion, ID_Cama));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const ActualizarMedico = async ({ body }: Request, res: Response) => {
    try {
        const { ID, Nombre, NumeroLicencia, Especialidad } = body
        return res.json(await proceduresModel.ActualizarMedico(ID, Nombre, NumeroLicencia, Especialidad));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const ActualizarPaciente = async ({ body }: Request, res: Response) => {
    try {
        const { ID, Nombre, Apellidos, Direccion, Telefono, FechaNacimiento, SeguroMedico } = body
        return res.json(await proceduresModel.ActualizarPaciente(ID, Nombre, Apellidos, Direccion, Telefono, FechaNacimiento, SeguroMedico));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const ActualizarQuirofano = async ({ body }: Request, res: Response) => {
    try {
        const { ID, Numero, Estado } = body
        return res.json(await proceduresModel.ActualizarQuirofano(ID, Numero, Estado));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const EliminarAtencion = async ({ body }: Request, res: Response) => {
    try {
        const { ID } = body
        return res.json(await proceduresModel.EliminarAtencion(ID));
    } catch (err) {
        console.log(err)
        return res.status(500).json(err);
    }
}

export const EliminarCama = async ({ body }: Request, res: Response) => {
    try {
        const { ID } = body
        return res.json(await proceduresModel.EliminarCama(ID));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const EliminarCirugia = async ({ body }: Request, res: Response) => {
    try {
        const { ID } = body
        return res.json(await proceduresModel.EliminarCirugia(ID));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const EliminarConsulta = async ({ body }: Request, res: Response) => {
    try {
        const { ID } = body
        return res.json(await proceduresModel.EliminarConsulta(ID));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const EliminarConsultorio = async ({ body }: Request, res: Response) => {
    try {
        const { ID } = body
        return res.json(await proceduresModel.EliminarConsultorio(ID));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const EliminarHabitacion = async ({ body }: Request, res: Response) => {
    try {
        const { ID } = body
        return res.json(await proceduresModel.EliminarHabitacion(ID));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const EliminarHospitalizacion = async ({ body }: Request, res: Response) => {
    try {
        const { ID } = body
        return res.json(await proceduresModel.EliminarHospitalizacion(ID));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const EliminarMedico = async ({ body }: Request, res: Response) => {
    try {
        const { ID } = body
        return res.json(await proceduresModel.EliminarMedico(ID));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const EliminarPaciente = async ({ body }: Request, res: Response) => {
    try {
        const { ID } = body
        return res.json(await proceduresModel.EliminarPaciente(ID));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const EliminarQuirofano = async ({ body }: Request, res: Response) => {
    try {
        const { ID } = body
        return res.json(await proceduresModel.EliminarQuirofano(ID));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const InsertarAtencion = async ({ body }: Request, res: Response) => {
    try {
        const { ID_Paciente, ID_Hospitalizacion, ID_Medico, Fecha, Tipo, Detalles } = body
        return res.json(await proceduresModel.InsertarAtencion(ID_Paciente, ID_Hospitalizacion, ID_Medico, Fecha, Tipo, Detalles));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const InsertarCama = async ({ body }: Request, res: Response) => {
    try {
        const { Numero, Estado } = body
        return res.json(await proceduresModel.InsertarCama(Numero, Estado));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const InsertarCirugia = async ({ body }: Request, res: Response) => {
    try {
        const { ID_Paciente, ID_Medico, Fecha, Hora, Tipo, PersonalMedico, Medicamentos, Materiales, ID_Quirofano } = body
        return res.json(await proceduresModel.InsertarCirugia(ID_Paciente, ID_Medico, Fecha, Hora, Tipo, PersonalMedico, Medicamentos, Materiales, ID_Quirofano));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const InsertarConsulta = async ({ body }: Request, res: Response) => {
    try {
        const { Fecha, Hora, ID_Paciente, ID_Medico, Motivo } = body
        return res.json(await proceduresModel.InsertarConsulta(Fecha, Hora, ID_Paciente, ID_Medico, Motivo));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const InsertarConsultorio = async ({ body }: Request, res: Response) => {
    try {
        const { Nombre, ID_Medico, Tipo } = body
        return res.json(await proceduresModel.InsertarConsultorio(Nombre, ID_Medico, Tipo));
    } catch (err) {
        console.log(err)
        return res.status(500).json(err);
    }
}

export const InsertarHabitacion = async ({ body }: Request, res: Response) => {
    try {
        const { Tipo, Estado, NumeroHabitacion } = body
        return res.json(await proceduresModel.InsertarHabitacion(Tipo, Estado, NumeroHabitacion));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const InsertarHospitalizacion = async ({ body }: Request, res: Response) => {
    try {
        const { ID_Paciente, ID_Medico, FechaIngreso, ID_Habitacion, ID_Cama } = body
        return res.json(await proceduresModel.InsertarHospitalizacion(ID_Paciente, ID_Medico, FechaIngreso, ID_Habitacion, ID_Cama));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const InsertarMedico = async ({ body }: Request, res: Response) => {
    try {
        const { Nombre, NumeroLicencia, Especialidad } = body
        return res.json(await proceduresModel.InsertarMedico(Nombre, NumeroLicencia, Especialidad));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const InsertarPaciente = async ({ body }: Request, res: Response) => {
    try {
        const { Nombre, Apellidos, Direccion, Telefono, FechaNacimiento, SeguroMedico } = body
        return res.json(await proceduresModel.InsertarPaciente(Nombre, Apellidos, Direccion, Telefono, FechaNacimiento, SeguroMedico));
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const InsertarQuirofano = async ({ body }: Request, res: Response) => {
    try {
        const { Numero, Estado } = body
        return res.json(await proceduresModel.InsertarQuirofano(Numero, Estado));
    } catch (err) {
        return res.status(500).json(err);
    }
}