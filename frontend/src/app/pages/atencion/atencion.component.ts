import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'app/service/global.service';
import { ProceduresService } from 'app/service/procedures.service';
import { QueriesService } from 'app/service/queries.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-atencion',
  templateUrl: './atencion.component.html',
  styleUrls: ['./atencion.component.sass']
})
export class AtencionComponent implements OnInit {

  atenciones: any[] = []
  pacientes: any[] = []
  hospitalizaciones: any[] = []
  medicos: any[] = []

  ID: any
  ID_Paciente: any
  ID_Hospitalizacion: any
  ID_Medico: any
  Fecha: any
  Tipo: any
  Detalles: any

  seleccionAtencion: Set<any> = new Set()

  constructor(
    private toastService: ToastrService,
    private globalService: GlobalService,
    private qService: QueriesService,
    private pService: ProceduresService
  ) { }

  ngOnInit(): void {
    this.obtenerAtenciones();
    this.obtenerPacientes();
    this.obtenerMedicos();
  }

  obtenerAtenciones = () => {
    this.qService.ObtenerAtenciones().pipe(catchError((error: any) => {
      return [];
    })).subscribe(data => {
      this.atenciones = data
    })
  }

  obtenerAtencion = () => {
    const { ID } = Array.from(this.seleccionAtencion.values())[0];
    this.qService.ObtenerAtencion(ID).pipe(catchError((error: any) => {
      return [];
    })).subscribe(data => {
      this.establecerParametros(data[0].ID, data[0].ID_Paciente, data[0].ID_Hospitalizacion, data[0].ID_Medico, data[0].Fecha, data[0].Tipo, data[0].Detalles);
      this.obtenerHospitalizacionesPorPaciente();
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

  obtenerHospitalizacionesPorPaciente = () => {
    this.qService.ObtenerHospitalizacionesPorPaciente(this.ID_Paciente).pipe(catchError((error: any) => {
      return [];
    })).subscribe(data => {
      this.hospitalizaciones = data
    })
  }

  insertarAtencion = () => {
    this.pService.InsertarAtencion(this.ID_Paciente, this.ID_Hospitalizacion, this.ID_Medico, this.Fecha, this.Tipo, this.Detalles).pipe(catchError((error: any) => {
      return [];
    })).subscribe(data => {
      this.toastService.success("Atención Creada");
      this.obtenerAtenciones();
    })
  }

  actualizarAtencion = () => {
    this.pService.ActualizarAtencion(this.ID, this.ID_Paciente, this.ID_Hospitalizacion, this.ID_Medico, this.Fecha, this.Tipo, this.Detalles).pipe(catchError((error: any) => {
      return [];
    })).subscribe(data => {
      this.toastService.success("Atención Actualizada");
      this.seleccionAtencion.clear();
      this.obtenerAtenciones();
    })
  }

  eliminarAtencion = () => {
    const { ID } = Array.from(this.seleccionAtencion.values())[0];
    this.pService.EliminarAtencion(ID).pipe(catchError((error: any) => {
      return [];
    })).subscribe(data => {
      this.toastService.success("Atención Eliminada");
      this.seleccionAtencion.clear();
      this.obtenerAtenciones();
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

  establecerParametros = (ID: any, ID_Paciente: any, ID_Hospitalizacion: any, ID_Medico: any, Fecha: any, Tipo: any, Detalles: any) => {
    this.ID = ID
    this.ID_Paciente = ID_Paciente
    this.ID_Hospitalizacion = ID_Hospitalizacion
    this.ID_Medico = ID_Medico
    this.Fecha = Fecha
    this.Tipo = Tipo
    this.Detalles = Detalles
  }
}
