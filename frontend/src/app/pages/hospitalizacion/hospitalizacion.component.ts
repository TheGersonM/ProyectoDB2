import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'app/service/global.service';
import { ProceduresService } from 'app/service/procedures.service';
import { QueriesService } from 'app/service/queries.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

declare var $:any;
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
  modoFormulario: 'insertar' | 'actualizar' = 'insertar';

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
      this.establecerParametros(data[0].ID);
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
      this.cerrarModal();
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
      this.cerrarModal();
    })
  }

  eliminarHospitalizacion = () => {
    this.pService.EliminarHospitalizacion(this.ID).pipe(catchError((error: any) => {
      this.toastService.error("No se puede eliminar una hospitalizacion con pacientes");
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

  establecerParametros = (ID: any) => {
    this.ID = ID;
  }

  cerrarModal() {
    $('#medic').modal('hide');
  }
  abrirModal = (modo: 'insertar' | 'actualizar') => {
    this.modoFormulario = modo;
    if (this.modoFormulario === 'insertar') {
      this.ID_Paciente = '';
      this.ID_Medico = '';
      this.FechaIngreso = '';
      this.FechaAlta = '';
      this.ID_Habitacion = '';
      this.ID_Cama = '';
    } else if (this.modoFormulario === 'actualizar') {
      const seleccionado = Array.from(this.seleccionHospitalizacion.values())[0];
      if (seleccionado) {

        this.ID = seleccionado.ID;
        this.ID_Paciente = seleccionado.ID_Paciente;
        this.ID_Medico = seleccionado.ID_Medico;
        this.FechaIngreso = seleccionado.FechaIngreso;
        this.FechaAlta = seleccionado.FechaAlta;
        this.ID_Habitacion = seleccionado.ID_Habitacion;
        this.ID_Cama = seleccionado.ID_Cama;
      }
    }
  };

}
