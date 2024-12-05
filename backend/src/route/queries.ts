import { Router } from "express";
import {
    ObtenerAtencion,
    ObtenerAtenciones,
    ObtenerAtencionesPorPaciente,
    ObtenerCama,
    ObtenerCamas,
    ObtenerCamasDisponibles,
    ObtenerCheque,
    ObtenerCheques,
    ObtenerCirugia,
    ObtenerCirugias,
    ObtenerCobroConsultorio,
    ObtenerCobroConsultorios,
    ObtenerConsulta,
    ObtenerConsultas,
    ObtenerConsultorio,
    ObtenerConsultorios,
    ObtenerConsultoriosAlquilados,
    ObtenerFactura,
    ObtenerFacturaDetalle,
    ObtenerFacturas,
    ObtenerHabitacion,
    ObtenerHabitaciones,
    ObtenerHabitacionesDisponibles,
    ObtenerHospitalizacion,
    ObtenerHospitalizaciones,
    ObtenerHospitalizacionesPorPaciente,
    ObtenerMedico,
    ObtenerMedicos,
    ObtenerMedicosPorConsulta,
    ObtenerMedicosInternos,
    ObtenerMedicosExternos,
    ObtenerPaciente,
    ObtenerPacientes,
    ObtenerQuirofano,
    ObtenerQuirofanos
} from "../controller/queries.controller";


const router = Router();


router.get("/ObtenerMedicos", ObtenerMedicos)
router.get("/ObtenerMedico", ObtenerMedico)
router.get("/ObtenerMedicosPorConsulta", ObtenerMedicosPorConsulta)
router.get("/ObtenerMedicosInternos", ObtenerMedicosInternos)
router.get("/ObtenerMedicosExternos", ObtenerMedicosExternos)
router.get("/ObtenerHabitaciones", ObtenerHabitaciones)
router.get("/ObtenerHabitacion", ObtenerHabitacion)
router.get("/ObtenerQuirofanos", ObtenerQuirofanos)
router.get("/ObtenerQuirofano", ObtenerQuirofano)
router.get("/ObtenerPacientes", ObtenerPacientes)
router.get("/ObtenerPaciente", ObtenerPaciente)
router.get("/ObtenerFacturas", ObtenerFacturas)
router.get("/ObtenerFactura", ObtenerFactura)
router.get("/ObtenerFacturaDetalle", ObtenerFacturaDetalle)
router.get("/ObtenerConsultas", ObtenerConsultas)
router.get("/ObtenerConsulta", ObtenerConsulta)
router.get("/ObtenerCobroConsultorios", ObtenerCobroConsultorios)
router.get("/ObtenerCobroConsultorio", ObtenerCobroConsultorio)
router.get("/ObtenerCamas", ObtenerCamas)
router.get("/ObtenerCama", ObtenerCama)
router.get("/ObtenerCheques", ObtenerCheques)
router.get("/ObtenerCheque", ObtenerCheque)
router.get("/ObtenerConsultoriosAlquilados", ObtenerConsultoriosAlquilados)
router.get("/ObtenerCirugias", ObtenerCirugias)
router.get("/ObtenerCirugia", ObtenerCirugia)
router.get("/ObtenerAtenciones", ObtenerAtenciones)
router.get("/ObtenerAtencion", ObtenerAtencion)
router.get("/ObtenerHospitalizaciones", ObtenerHospitalizaciones)
router.get("/ObtenerHospitalizacion", ObtenerHospitalizacion)
router.get("/obtenerConsultorios", ObtenerConsultorios)
router.get("/ObtenerConsultorio", ObtenerConsultorio)
router.get("/ObtenerHospitalizacionesPorPaciente", ObtenerHospitalizacionesPorPaciente)
router.get("/ObtenerHabitacionesDisponibles", ObtenerHabitacionesDisponibles)
router.get("/ObtenerCamasDisponibles", ObtenerCamasDisponibles)
router.get("/ObtenerAtencionesPorPaciente", ObtenerAtencionesPorPaciente)


export { router };