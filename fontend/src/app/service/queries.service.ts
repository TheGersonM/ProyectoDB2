import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class QueriesService {

  constructor(private http: HttpClient) { }

  ObtenerMedicos = () => {
    return this.http.get<any>(`${environment.baseUrlApi}queries/ObtenerMedicos`)
  }

  ObtenerMedico = (ID: any) => {
    return this.http.get<any>(`${environment.baseUrlApi}queries/ObtenerMedicos?ID=${ID}`)
  }

  ObtenerCheques = () => {
    return this.http.get<any>(`${environment.baseUrlApi}queries/ObtenerCheques`)
  }

  ObtenerCheque = (ID: any) => {
    return this.http.get<any>(`${environment.baseUrlApi}queries/ObtenerCheques?ID=${ID}`)
  }

  ObtenerHabitaciones = () => {
    return this.http.get<any>(`${environment.baseUrlApi}queries/ObtenerHabitaciones`)
  }

  ObtenerHabitacion = (ID: any) => {
    return this.http.get<any>(`${environment.baseUrlApi}queries/ObtenerHabitacion?ID=${ID}`)
  }

  ObtenerQuirofanos = () => {
    return this.http.get<any>(`${environment.baseUrlApi}queries/ObtenerQuirofanos`)
  }

  ObtenerQuirofano = (ID: any) => {
    return this.http.get<any>(`${environment.baseUrlApi}queries/ObtenerQuirofano?ID=${ID}`)
  }

  ObtenerPacientes = () => {
    return this.http.get<any>(`${environment.baseUrlApi}queries/ObtenerPacientes`)
  }

  ObtenerPaciente = (ID: any) => {
    return this.http.get<any>(`${environment.baseUrlApi}queries/ObtenerPaciente?ID=${ID}`)
  }

  ObtenerFacturas = () => {
    return this.http.get<any>(`${environment.baseUrlApi}queries/ObtenerFacturas`)
  }

  ObtenerFactura = (ID: any) => {
    return this.http.get<any>(`${environment.baseUrlApi}queries/ObtenerFactura?ID=${ID}`)
  }

  ObtenerFacturaDetalle = (ID: any) => {
    return this.http.get<any>(`${environment.baseUrlApi}queries/ObtenerFacturaDetalle?ID=${ID}`)
  }

  ObtenerConsultas = () => {
    return this.http.get<any>(`${environment.baseUrlApi}queries/ObtenerConsultas`)
  }

  ObtenerConsulta = (ID: any) => {
    return this.http.get<any>(`${environment.baseUrlApi}queries/ObtenerConsulta?ID=${ID}`)
  }

  ObtenerConsultoriosAlquilados = () => {
    return this.http.get<any>(`${environment.baseUrlApi}queries/ObtenerConsultoriosAlquilados`)
  }

  ObtenerCobroConsultorios = () => {
    return this.http.get<any>(`${environment.baseUrlApi}queries/ObtenerCobroConsultorios`)
  }

  ObtenerCobroConsultorio = (ID: any) => {
    return this.http.get<any>(`${environment.baseUrlApi}queries/ObtenerCobroConsultorio?ID=${ID}`)
  }

  ObtenerCamas = () => {
    return this.http.get<any>(`${environment.baseUrlApi}queries/ObtenerCamas`)
  }

  ObtenerCama = (ID: any) => {
    return this.http.get<any>(`${environment.baseUrlApi}queries/ObtenerCama?ID=${ID}`)
  }

  ObtenerHospitalizaciones = () => {
    return this.http.get<any>(`${environment.baseUrlApi}queries/ObtenerHospitalizaciones`)
  }

  ObtenerHospitalizacion = (ID: any) => {
    return this.http.get<any>(`${environment.baseUrlApi}queries/ObtenerHospitalizacion?ID=${ID}`)
  }

  ObtenerHospitalizacionesPorPaciente = (ID: any) => {
    return this.http.get<any>(`${environment.baseUrlApi}queries/ObtenerHospitalizacionesPorPaciente?ID=${ID}`)
  }

  ObtenerHabitacionesDisponibles = () => {
    return this.http.get<any>(`${environment.baseUrlApi}queries/ObtenerHabitacionesDisponibles`)
  }

  ObtenerCamasDisponibles = () => {
    return this.http.get<any>(`${environment.baseUrlApi}queries/ObtenerCamasDisponibles`)
  }

  ObtenerAtenciones = () => {
    return this.http.get<any>(`${environment.baseUrlApi}queries/ObtenerAtenciones`)
  }

  ObtenerAtencion = (ID: any) => {
    return this.http.get<any>(`${environment.baseUrlApi}queries/ObtenerAtencion?ID=${ID}`)
  }

  ObtenerCirugias = () => {
    return this.http.get<any>(`${environment.baseUrlApi}queries/ObtenerCirugias`)
  }

  ObtenerCirugia = (ID: any) => {
    return this.http.get<any>(`${environment.baseUrlApi}queries/ObtenerCirugia?ID=${ID}`)
  }

  ObtenerConsultorios = () => {
    return this.http.get<any>(`${environment.baseUrlApi}queries/ObtenerConsultorios`)
  }

  ObtenerConsultorio = (ID: any) => {
    return this.http.get<any>(`${environment.baseUrlApi}queries/ObtenerConsultorio?ID=${ID}`)
  }

  ObtenerAtencionesPorPaciente = (ID_Paciente: any) => {
    return this.http.get<any>(`${environment.baseUrlApi}queries/ObtenerAtencionesPorPaciente?ID_Paciente=${ID_Paciente}`)
  }
}
