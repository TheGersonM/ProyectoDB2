import { Router } from "express";
import {
    ActualizarAtencion,
    ActualizarCama,
    ActualizarCheque,
    ActualizarCirugia,
    ActualizarCobroConsultorio,
    ActualizarConsulta,
    ActualizarConsultorio,
    ActualizarFactura,
    ActualizarFacturaDetalle,
    ActualizarHabitacion,
    ActualizarHospitalizacion,
    ActualizarMedico,
    ActualizarPaciente,
    ActualizarQuirofano,
    EliminarAtencion,
    EliminarCama,
    EliminarCheque,
    EliminarCirugia,
    EliminarCobroConsultorio,
    EliminarConsulta,
    EliminarConsultorio,
    EliminarFactura,
    EliminarFacturaDetalle,
    EliminarHabitacion,
    EliminarHospitalizacion,
    EliminarMedico,
    EliminarPaciente,
    EliminarQuirofano,
    InsertarAtencion,
    InsertarCama,
    InsertarCheque,
    InsertarCirugia,
    InsertarCobroConsultorio,
    InsertarConsulta,
    InsertarConsultorio,
    InsertarFactura,
    InsertarFacturaDetalle,
    InsertarHabitacion,
    InsertarHospitalizacion,
    InsertarMedico,
    InsertarPaciente,
    InsertarQuirofano
} from "../controller/procedures.controller";


const router = Router();


router.post("/ActualizarAtencion", ActualizarAtencion)
router.post("/ActualizarCama", ActualizarCama)
router.post("/ActualizarCheque", ActualizarCheque)
router.post("/ActualizarCirugia", ActualizarCirugia)
router.post("/ActualizarCobroConsultorio", ActualizarCobroConsultorio)
router.post("/ActualizarConsulta", ActualizarConsulta)
router.post("/ActualizarConsultorio", ActualizarConsultorio)
router.post("/ActualizarFactura", ActualizarFactura)
router.post("/ActualizarFacturaDetalle", ActualizarFacturaDetalle)
router.post("/ActualizarHabitacion", ActualizarHabitacion)
router.post("/ActualizarHospitalizacion", ActualizarHospitalizacion)
router.post("/ActualizarMedico", ActualizarMedico)
router.post("/ActualizarPaciente", ActualizarPaciente)
router.post("/ActualizarQuirofano", ActualizarQuirofano)
router.post("/EliminarAtencion", EliminarAtencion)
router.post("/EliminarCama", EliminarCama)
router.post("/EliminarCheque", EliminarCheque)
router.post("/EliminarCirugia", EliminarCirugia)
router.post("/EliminarCobroConsultorio", EliminarCobroConsultorio)
router.post("/EliminarConsulta", EliminarConsulta)
router.post("/EliminarConsultorio", EliminarConsultorio)
router.post("/EliminarFactura", EliminarFactura)
router.post("/EliminarFacturaDetalle", EliminarFacturaDetalle)
router.post("/EliminarHabitacion", EliminarHabitacion)
router.post("/EliminarHospitalizacion", EliminarHospitalizacion)
router.post("/EliminarMedico", EliminarMedico)
router.post("/EliminarPaciente", EliminarPaciente)
router.post("/EliminarQuirofano", EliminarQuirofano)
router.post("/InsertarAtencion", InsertarAtencion)
router.post("/InsertarCama", InsertarCama)
router.post("/InsertarCheque", InsertarCheque)
router.post("/InsertarCirugia", InsertarCirugia)
router.post("/InsertarCobroConsultorio", InsertarCobroConsultorio)
router.post("/InsertarConsulta", InsertarConsulta)
router.post("/InsertarConsultorio", InsertarConsultorio)
router.post("/InsertarFactura", InsertarFactura)
router.post("/InsertarFacturaDetalle", InsertarFacturaDetalle)
router.post("/InsertarHabitacion", InsertarHabitacion)
router.post("/InsertarHospitalizacion", InsertarHospitalizacion)
router.post("/InsertarMedico", InsertarMedico)
router.post("/InsertarPaciente", InsertarPaciente)
router.post("/InsertarQuirofano", InsertarQuirofano)


export { router };