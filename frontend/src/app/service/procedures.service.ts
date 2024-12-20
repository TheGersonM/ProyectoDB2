import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ProceduresService {

  constructor(private http: HttpClient) { }

  ActualizarAtencion = (ID: any, ID_Paciente: any, ID_Hospitalizacion: any, ID_Medico: any, Fecha: any, Tipo: any, Detalles: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/ActualizarAtencion`, { ID, ID_Paciente, ID_Hospitalizacion, ID_Medico, Fecha, Tipo, Detalles })
  }
  ActualizarCama = (ID: any, Numero: any, Estado: any, Habitacion_ID: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/ActualizarCama`, { ID, Numero, Estado, Habitacion_ID })
  }
  ActualizarCheque = (ID: any, ID_Medico: any, Fecha: any, Concepto: any, Valor: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/ActualizarCheque`, { ID, ID_Medico, Fecha, Concepto, Valor })
  }
  ActualizarCirugia = (ID: any, ID_Paciente: any, ID_Medico: any, Fecha: any, Hora: any, Tipo: any, PersonalMedico: any, Medicamentos: any, Materiales: any, ID_Quirofano: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/ActualizarCirugia`, { ID, ID_Paciente, ID_Medico, Fecha, Hora, Tipo, PersonalMedico, Medicamentos, Materiales, ID_Quirofano })
  }
  ActualizarCobroConsultorio = (ID: any, Nombre: any, Concepto: any, Valor: any, Impuesto: any, Total: any, ID_Consultorio: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/ActualizarCobroConsultorio`, { ID, Nombre, Concepto, Valor, Impuesto, Total, ID_Consultorio })
  }
  ActualizarConsulta = (ID: any, Fecha: any, Hora: any, ID_Paciente: any, ID_Medico: any, Motivo: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/ActualizarConsulta`, { ID, Fecha, Hora, ID_Paciente, ID_Medico, Motivo })
  }
  ActualizarConsultorio = (ID: any, Nombre: any, ID_Medico: any, Tipo: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/ActualizarConsultorio`, { ID, Nombre, ID_Medico, Tipo })
  }
  ActualizarFactura = (ID: any, ID_Paciente: any, Fecha: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/ActualizarFactura`, { ID, ID_Paciente, Fecha })
  }
  ActualizarFacturaDetalle = (ID_Factura: any, FacturaDetalle: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/ActualizarFacturaDetalle`, { ID_Factura, FacturaDetalle })
  }
  ActualizarHabitacion = (ID: any, Tipo: any, Estado: any, NumeroHabitacion: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/ActualizarHabitacion`, { ID, Tipo, Estado, NumeroHabitacion })
  }
  ActualizarHospitalizacion = (ID: any, ID_Paciente: any, ID_Medico: any, FechaIngreso: any, FechaAlta: any, ID_Habitacion: any, ID_Cama: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/ActualizarHospitalizacion`, { ID, ID_Paciente, ID_Medico, FechaIngreso, FechaAlta, ID_Habitacion, ID_Cama })
  }
  ActualizarMedico = (ID: any, Nombre: any, NumeroLicencia: any, Especialidad: any, Tipo: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/ActualizarMedico`, { ID, Nombre, NumeroLicencia, Especialidad, Tipo })
  }
  ActualizarPaciente = (ID: any, Nombre: any, Apellidos: any, Direccion: any, Telefono: any, FechaNacimiento: any, SeguroMedico: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/ActualizarPaciente`, { ID, Nombre, Apellidos, Direccion, Telefono, FechaNacimiento, SeguroMedico })
  }
  ActualizarQuirofano = (ID: any, Numero: any, Estado: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/ActualizarQuirofano`, { ID, Numero, Estado })
  }
  EliminarAtencion = (ID: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/EliminarAtencion`, { ID })
  }
  EliminarCama = (ID: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/EliminarCama`, { ID })
  }
  EliminarCheque = (ID: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/EliminarCheque`, { ID })
  }
  EliminarCirugia = (ID: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/EliminarCirugia`, { ID })
  }
  EliminarCobroConsultorio = (ID: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/EliminarCobroConsultorio`, { ID })
  }
  EliminarConsulta = (ID: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/EliminarConsulta`, { ID })
  }
  EliminarConsultorio = (ID: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/EliminarConsultorio`, { ID })
  }
  EliminarFactura = (ID: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/EliminarFactura`, { ID })
  }
  EliminarFacturaDetalle = (ID: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/EliminarFacturaDetalle`, { ID })
  }
  EliminarHabitacion = (ID: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/EliminarHabitacion`, { ID })
  }
  EliminarHospitalizacion = (ID: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/EliminarHospitalizacion`, { ID })
  }
  EliminarMedico = (ID: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/EliminarMedico`, { ID })
  }
  EliminarPaciente = (ID: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/EliminarPaciente`, { ID })
  }
  EliminarQuirofano = (ID: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/EliminarQuirofano`, { ID })
  }
  InsertarAtencion = (ID_Paciente: any, ID_Hospitalizacion: any, ID_Medico: any, Fecha: any, Tipo: any, Detalles: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/InsertarAtencion`, { ID_Paciente, ID_Hospitalizacion, ID_Medico, Fecha, Tipo, Detalles })
  }
  InsertarCama = (Numero: any, Estado: any, Habitacion_ID: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/InsertarCama`, { Numero, Estado, Habitacion_ID })
  }
  InsertarCheque = (ID_Medico: any, Fecha: any, Concepto: any, Valor: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/InsertarCheque`, { ID_Medico, Fecha, Concepto, Valor })
  }
  InsertarCirugia = (ID_Paciente: any, ID_Medico: any, Fecha: any, Hora: any, Tipo: any, PersonalMedico: any, Medicamentos: any, Materiales: any, ID_Quirofano: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/InsertarCirugia`, { ID_Paciente, ID_Medico, Fecha, Hora, Tipo, PersonalMedico, Medicamentos, Materiales, ID_Quirofano })
  }
  InsertarCobroConsultorio = (Nombre: any, Concepto: any, Valor: any, Impuesto: any, Total: any, ID_Consultorio: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/InsertarCobroConsultorio`, { Nombre, Concepto, Valor, Impuesto, Total, ID_Consultorio })
  }
  InsertarConsulta = (Fecha: any, Hora: any, ID_Paciente: any, ID_Medico: any, Motivo: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/InsertarConsulta`, { Fecha, Hora, ID_Paciente, ID_Medico, Motivo })
  }
  InsertarConsultorio = (Nombre: any, ID_Medico: any, Tipo: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/insertarConsultorio`, { Nombre, ID_Medico, Tipo })
  }
  InsertarFactura = (ID_Paciente: any, Fecha: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/InsertarFactura`, { ID_Paciente, Fecha })
  }
  InsertarFacturaDetalle = (ID_Factura: any, FacturaDetalle: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/InsertarFacturaDetalle`, { ID_Factura, FacturaDetalle })
  }
  InsertarHabitacion = (Tipo: any, Estado: any, NumeroHabitacion: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/InsertarHabitacion`, { Tipo, Estado, NumeroHabitacion })
  }
  InsertarHospitalizacion = (ID_Paciente: any, ID_Medico: any, FechaIngreso: any, ID_Habitacion: any, ID_Cama: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/InsertarHospitalizacion`, { ID_Paciente, ID_Medico, FechaIngreso, ID_Habitacion, ID_Cama })
  }
  InsertarMedico = (Nombre: any, NumeroLicencia: any, Especialidad: any, Tipo: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/InsertarMedico`, { Nombre, NumeroLicencia, Especialidad, Tipo })
  }
  InsertarPaciente = (Nombre: any, Apellidos: any, Direccion: any, Telefono: any, FechaNacimiento: any, SeguroMedico: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/InsertarPaciente`, { Nombre, Apellidos, Direccion, Telefono, FechaNacimiento, SeguroMedico })
  }
  InsertarQuirofano = (Numero: any, Estado: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/InsertarQuirofano`, { Numero, Estado })
  }
  CrearItemInventario = (Categoria : any, Nombre: any, Stock: any, Precio: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/CrearItemInventario`, { Categoria, Nombre, Stock, Precio })
  }
  EditarItemInventario = (ID: any, Categoria : any, Nombre: any, Stock: any, Precio: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/CrearItemInventario`, { ID, Categoria, Nombre, Stock, Precio })
  }
  EliminarItemInventario = (ID: any, Categoria : any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/CrearItemInventario`, { ID, Categoria })
  }
}
