import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ProceduresService {

  constructor(private http: HttpClient) { }

  ActualizarAtencion = (ID: any, Fecha: any, Tipo: any, Detalles: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/ActualizarAtencion`, { ID, Fecha, Tipo, Detalles })
  }
  ActualizarCirugia = (ID: any, Fecha: any, Hora: any, Tipo: any, PersonalMedico: any, Medicamentos: any, Materiales: any, ID_Quirofano: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/ActualizarCirugia`, { ID, Fecha, Hora, Tipo, PersonalMedico, Medicamentos, Materiales, ID_Quirofano })
  }
  ActualizarConsulta = (ID: any, Fecha: any, Hora: any, ID_Paciente: any, ID_Medico: any, Motivo: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/ActualizarConsulta`, { ID, Fecha, Hora, ID_Paciente, ID_Medico, Motivo })
  }
  ActualizarHabitacion = (ID: any, Tipo: any, Estado: any, NumeroHabitacion: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/ActualizarHabitacion`, { ID, Tipo, Estado, NumeroHabitacion })
  }
  ActualizarHospitalizacion = (ID: any, FechaIngreso: any, FechaAlta: any, Categoria: any, Honorarios: any, ID_Paciente: any, ID_Medico: any, ID_Habitacion: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/ActualizarHospitalizacion`, { ID, FechaIngreso, FechaAlta, Categoria, Honorarios, ID_Paciente, ID_Medico, ID_Habitacion })
  }
  ActualizarMedico = (ID: any, Nombre: any, NumeroLicencia: any, Especialidad: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/ActualizarMedico`, { ID, Nombre, NumeroLicencia, Especialidad })
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
  EliminarCirugia = (ID: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/EliminarCirugia`, { ID })
  }
  EliminarConsulta = (ID: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/EliminarConsulta`, { ID })
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
  InsertarAtencion = (Fecha: any, Tipo: any, Detalles: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/InsertarAtencion`, { Fecha, Tipo, Detalles })
  }
  InsertarCirugia = (Fecha: any, Hora: any, Tipo: any, PersonalMedico: any, Medicamentos: any, Materiales: any, ID_Quirofano: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/InsertarCirugia`, { Fecha, Hora, Tipo, PersonalMedico, Medicamentos, Materiales, ID_Quirofano })
  }
  InsertarConsulta = (Fecha: any, Hora: any, ID_Paciente: any, ID_Medico: any, Motivo: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/InsertarConsulta`, { Fecha, Hora, ID_Paciente, ID_Medico, Motivo })
  }
  InsertarHabitacion = (Tipo: any, Estado: any, NumeroHabitacion: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/InsertarHabitacion`, { Tipo, Estado, NumeroHabitacion })
  }
  InsertarHospitalizacion = (FechaIngreso: any, FechaAlta: any, Categoria: any, Honorarios: any, ID_Paciente: any, ID_Medico: any, ID_Habitacion: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/InsertarHospitalizacion`, { FechaIngreso, FechaAlta, Categoria, Honorarios, ID_Paciente, ID_Medico, ID_Habitacion })
  }
  InsertarMedico = (Nombre: any, NumeroLicencia: any, Especialidad: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/InsertarMedico`, { Nombre, NumeroLicencia, Especialidad })
  }
  InsertarPaciente = (Nombre: any, Apellidos: any, Direccion: any, Telefono: any, FechaNacimiento: any, SeguroMedico: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/InsertarPaciente`, { Nombre, Apellidos, Direccion, Telefono, FechaNacimiento, SeguroMedico })
  }
  InsertarQuirofano = (Numero: any, Estado: any) => {
    return this.http.post<any>(`${environment.baseUrlApi}procedures/InsertarQuirofano`, { Numero, Estado })
  }
}
