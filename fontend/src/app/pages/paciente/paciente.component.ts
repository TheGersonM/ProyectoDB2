import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'app/service/global.service';
import { ProceduresService } from 'app/service/procedures.service';
import { QueriesService } from 'app/service/queries.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.sass']
})
export class PacienteComponent implements OnInit {

  pacientes: any[] = []

  ID: any
  Nombres: any
  Apellidos: any
  Direccion: any
  Telefono: any
  FechaNacimiento: any
  SeguroMedico: any

  seleccionPaciente: Set<any> = new Set();

  constructor(
    private pService: ProceduresService,
    private toastService: ToastrService,
    private qService: QueriesService,
    private globalService: GlobalService
  ) {
  }

  ngOnInit(): void {
    this.obtenerPacientes();
  }

  obtenerPacientes = () => {
    this.qService.ObtenerPacientes().pipe(
      catchError((error: any) => {
        this.toastService.error("Error Interno");
        return [];
      })).subscribe(data => {
        this.pacientes = data
      })
  }

  obtenerPaciente = () => {
    const { ID } = Array.from(this.seleccionPaciente.values())[0];
    this.qService.ObtenerPaciente(ID).pipe(
      catchError((error: any) => {
        this.toastService.error("Error Interno");
        return [];
      })).subscribe(data => {
        this.establecerParametos(data[0].ID, data[0].Nombre, data[0].Apellidos, data[0].Direccion, data[0].Telefono, data[0].FechaNacimiento, data[0].SeguroMedico);
      })
  }

  insertarPaciente = () => {
    this.pService.InsertarPaciente(this.Nombres, this.Apellidos, this.Direccion, this.Telefono, this.FechaNacimiento, this.SeguroMedico).pipe(
      catchError((error: any) => {
        this.toastService.error("Error Interno");
        return [];
      })).subscribe(data => {
        this.toastService.success("Se ha insertado el paciente");
        this.obtenerPacientes();
      })
  }

  actualizarPaciente = () => {
    this.pService.ActualizarPaciente(this.ID, this.Nombres, this.Apellidos, this.Direccion, this.Telefono, this.FechaNacimiento, this.SeguroMedico).pipe(
      catchError((error: any) => {
        this.toastService.error("Error Interno");
        return [];
      })).subscribe(data => {
        this.toastService.success("Se ha actualizado el paciente");
        this.obtenerPacientes();
        this.seleccionPaciente.clear();
      })
  }

  eliminarPaciente = () => {
    const { ID } = Array.from(this.seleccionPaciente.values())[0];
    this.pService.EliminarPaciente(ID).pipe(
      catchError((error: any) => {
        this.toastService.error("Error Interno");
        return [];
      })).subscribe(data => {
        this.toastService.success("Se ha eliminado el paciente");
        this.obtenerPacientes();
        this.seleccionPaciente.clear();
      })
  }

  seleccionarLinea = (set: Set<any>, obj: any, tipo: number) => {
    this.globalService.addLine(set, obj, tipo);
  }

  seleccionarTodo = (arr: any[], set: Set<any>) => {
    this.globalService.selectAll(arr, set);
  }

  removeLine = (arr: any[], set: Set<any>) => {
    this.globalService.removeLine(arr, set);
  }

  establecerParametos = (ID: any, Nombres: any, Apellidos: any, Direccion: any, Telefono: any, FechaNacimiento: any, SeguroMedico: any) => {
    this.ID = ID;
    this.Nombres = Nombres;
    this.Apellidos = Apellidos;
    this.Direccion = Direccion;
    this.Telefono = Telefono;
    this.FechaNacimiento = FechaNacimiento;
    this.SeguroMedico = SeguroMedico;
  }

}
