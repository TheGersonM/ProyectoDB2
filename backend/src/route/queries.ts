import { Router } from "express";
import {
    ObtenerAtencion,
    ObtenerAtenciones,
    ObtenerCama,
    ObtenerCamas,
    ObtenerCamasDisponibles,
    ObtenerCirugia,
    ObtenerCirugias,
    ObtenerConsulta,
    ObtenerConsultas,
    ObtenerConsultorio,
    ObtenerConsultorios,
    ObtenerHabitacion,
    ObtenerHabitaciones,
    ObtenerHabitacionesDisponibles,
    ObtenerHospitalizacion,
    ObtenerHospitalizaciones,
    ObtenerHospitalizacionesPorPaciente,
    ObtenerMedico,
    ObtenerMedicos,
    ObtenerPaciente,
    ObtenerPacientes,
    ObtenerQuirofano,
    ObtenerQuirofanos
} from "../controller/queries.controller";


const router = Router();


router.get("/ObtenerMedicos", ObtenerMedicos)
router.get("/ObtenerMedico", ObtenerMedico)
router.get("/ObtenerHabitaciones", ObtenerHabitaciones)
router.get("/ObtenerHabitacion", ObtenerHabitacion)
router.get("/ObtenerQuirofanos", ObtenerQuirofanos)
router.get("/ObtenerQuirofano", ObtenerQuirofano)
router.get("/ObtenerPacientes", ObtenerPacientes)
router.get("/ObtenerPaciente", ObtenerPaciente)
router.get("/ObtenerConsultas", ObtenerConsultas)
router.get("/ObtenerConsulta", ObtenerConsulta)
router.get("/ObtenerCamas", ObtenerCamas)
router.get("/ObtenerCama", ObtenerCama)
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


export { router };