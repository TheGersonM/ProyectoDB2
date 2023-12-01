import { Router } from "express";
import {
    ActualizarAtencion,
    ActualizarCama,
    ActualizarCirugia,
    ActualizarConsulta,
    ActualizarConsultorio,
    ActualizarHabitacion,
    ActualizarHospitalizacion,
    ActualizarMedico,
    ActualizarPaciente,
    ActualizarQuirofano,
    EliminarAtencion,
    EliminarCama,
    EliminarCirugia,
    EliminarConsulta,
    EliminarConsultorio,
    EliminarHabitacion,
    EliminarHospitalizacion,
    EliminarMedico,
    EliminarPaciente,
    EliminarQuirofano,
    InsertarAtencion,
    InsertarCama,
    InsertarCirugia,
    InsertarConsulta,
    InsertarConsultorio,
    InsertarHabitacion,
    InsertarHospitalizacion,
    InsertarMedico,
    InsertarPaciente,
    InsertarQuirofano
} from "../controller/procedures.controller";


const router = Router();


router.post("/ActualizarAtencion", ActualizarAtencion)
router.post("/ActualizarCama", ActualizarCama)
router.post("/ActualizarCirugia", ActualizarCirugia)
router.post("/ActualizarConsulta", ActualizarConsulta)
router.post("/ActualizarConsultorio", ActualizarConsultorio)
router.post("/ActualizarHabitacion", ActualizarHabitacion)
router.post("/ActualizarHospitalizacion", ActualizarHospitalizacion)
router.post("/ActualizarMedico", ActualizarMedico)
router.post("/ActualizarPaciente", ActualizarPaciente)
router.post("/ActualizarQuirofano", ActualizarQuirofano)
router.post("/EliminarAtencion", EliminarAtencion)
router.post("/EliminarCama", EliminarCama)
router.post("/EliminarCirugia", EliminarCirugia)
router.post("/EliminarConsulta", EliminarConsulta)
router.post("/EliminarConsultorio", EliminarConsultorio)
router.post("/EliminarHabitacion", EliminarHabitacion)
router.post("/EliminarHospitalizacion", EliminarHospitalizacion)
router.post("/EliminarMedico", EliminarMedico)
router.post("/EliminarPaciente", EliminarPaciente)
router.post("/EliminarQuirofano", EliminarQuirofano)
router.post("/InsertarAtencion", InsertarAtencion)
router.post("/InsertarCama", InsertarCama)
router.post("/InsertarCirugia", InsertarCirugia)
router.post("/InsertarConsulta", InsertarConsulta)
router.post("/InsertarConsultorio", InsertarConsultorio)
router.post("/InsertarHabitacion", InsertarHabitacion)
router.post("/InsertarHospitalizacion", InsertarHospitalizacion)
router.post("/InsertarMedico", InsertarMedico)
router.post("/InsertarPaciente", InsertarPaciente)
router.post("/InsertarQuirofano", InsertarQuirofano)


export { router };