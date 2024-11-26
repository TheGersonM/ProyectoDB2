import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'app/service/global.service';
import { ProceduresService } from 'app/service/procedures.service';
import { QueriesService } from 'app/service/queries.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-hospitalizacion',
  templateUrl: './hospitalizacion.component.html',
  styleUrls: ['./hospitalizacion.component.sass']
})
export class HospitalizacionComponent implements OnInit {

  hospitalizaciones: any[] = [];
  pacientes: any[] = [];
  medicos: any[] = [];
  habitaciones: any[] = [];
  camas: any[] = [];

  ID: any = 0;
  ID_Paciente: any = 0;
  ID_Medico: any = 0;
  FechaIngreso: any;
  FechaAlta: any;
  ID_Habitacion: any = 0;
  ID_Cama: any = 0;

  seleccionHospitalizacion: Set<any> = new Set();

  constructor(
    private pService: ProceduresService,
    private qService: QueriesService,
    private globalService: GlobalService,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    this.obtenerHospitalizaciones();
    this.obtenerMedicos();
    this.obtenerPacientes();
    this.obtenerCamasDisponibles();
    this.obtenerHabitacionesDisponibles();
  }

  obtenerHospitalizaciones = () => {
    this.qService.ObtenerHospitalizaciones().pipe(catchError((error: any) => {
      return [];
    })).subscribe(data => {
      this.hospitalizaciones = data
    })
  }

  obtenerHospitalizacion = () => {
    const { ID } = Array.from(this.seleccionHospitalizacion.values())[0];
    this.qService.ObtenerHospitalizacion(ID).pipe(catchError((error: any) => {
      return [];
    })).subscribe(data => {
      this.establecerParametros(data[0].ID, data[0].ID_Paciente, data[0].ID_Medico, data[0].FechaIngreso, data[0].FechaAlta, data[0].ID_Habitacion, data[0].ID_Cama);
    })
  }

  obtenerHabitacionesDisponibles = () => {
    this.qService.ObtenerHabitacionesDisponibles().pipe(catchError((error: any) => {
      return [];
    })).subscribe(data => {
      this.habitaciones = data
    })
  }

  obtenerCamasDisponibles = () => {
    this.qService.ObtenerCamasDisponibles().pipe(catchError((error: any) => {
      return [];
    })).subscribe(data => {
      this.camas = data
    })
  }

  obtenerPacientes = () => {
    this.qService.ObtenerPacientes().pipe(catchError((error: any) => {
      return [];
    })).subscribe(data => {
      this.pacientes = data
    })
  }

  obtenerMedicos = () => {
    this.qService.ObtenerMedicos().pipe(catchError((error: any) => {
      return [];
    })).subscribe(data => {
      this.medicos = data
    })
  }

  insertarHospitalizacion = () => {
    this.pService.InsertarHospitalizacion(this.ID_Paciente, this.ID_Medico, this.FechaIngreso, this.ID_Habitacion, this.ID_Cama).pipe(catchError((error: any) => {
      this.toastService.error("No se pudeo insertar");
      return [];
    })).subscribe(data => {
      this.obtenerHospitalizaciones();
      this.seleccionHospitalizacion.clear();
      this.toastService.success("Se inserto correctamente");
    })
  }

  actualizarHospitalizacion = () => {
    this.pService.ActualizarHospitalizacion(this.ID, this.ID_Paciente, this.ID_Medico, this.FechaIngreso, this.FechaAlta, this.ID_Habitacion, this.ID_Cama).pipe(catchError((error: any) => {
      this.toastService.error("No se pudo actualizar");
      return [];
    })).subscribe(data => {
      this.obtenerHospitalizaciones();
      this.seleccionHospitalizacion.clear();
      this.toastService.success("Se actualizo correctamente");
    })
  }

  eliminarHospitalizacion = () => {
    this.pService.EliminarHospitalizacion(this.ID).pipe(catchError((error: any) => {
      this.toastService.error("No se pudo eliminar");
      return [];
    })).subscribe(data => {
      this.obtenerHospitalizaciones();
      this.seleccionHospitalizacion.clear();
      this.toastService.success("Se elimino correctamente");
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

  establecerParametros = (ID: any, ID_Paciente: any, ID_Medico: any, FechaIngreso: any, FechaAlta: any, ID_Habitacion: any, ID_Cama: any) => {
    this.ID = ID;
    this.ID_Paciente = ID_Paciente;
    this.ID_Medico = ID_Medico;
    this.FechaIngreso = FechaIngreso;
    this.FechaAlta = FechaAlta;
    this.ID_Habitacion = ID_Habitacion;
    this.ID_Cama = ID_Cama;
  }

}
