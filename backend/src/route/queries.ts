import { Router } from "express";
import {
    ObtenerConsulta,
    ObtenerConsultas,
    ObtenerHabitacion,
    ObtenerHabitaciones,
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

export { router };