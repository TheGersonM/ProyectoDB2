import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'app/service/global.service';
import { ProceduresService } from 'app/service/procedures.service';
import { QueriesService } from 'app/service/queries.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

declare var $:any;
@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.sass']
})
export class ConsultaComponent implements OnInit {
  consultas: any[] = [];
  pacientes: any[] = [];
  medicos: any[] = [];

  ID: any;
  ID_Paciente: any;
  ID_Medico: any;
  Fecha: any;
  Hora: any;
  Motivo: any;
  Estado: any;
  modoFormulario: 'insertar' | 'actualizar' = 'insertar';

  seleccionConsulta: Set<any> = new Set();

  constructor(
    private pService: ProceduresService,
    private qService: QueriesService,
    private globalService: GlobalService,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    this.obtenerConsultas();
    this.obtenerPacientes();
    this.obtenerMedicos();
  }

  obtenerConsultas = () => {
    this.qService.ObtenerConsultas().pipe(catchError((error: any) => {
      this.toastService.error("Error Interno");
      return [];
    })).subscribe(data => {
      this.consultas = data
    })
  }

  obtenerPacientes = () => {
    this.qService.ObtenerPacientes().pipe(catchError((error: any) => {
      this.toastService.error("Error Interno");
      return [];
    })).subscribe(data => {
      this.pacientes = data
    })
  }

  obtenerMedicos = () => {
    this.qService.ObtenerMedicos().pipe(catchError((error: any) => {
      this.toastService.error("Error Interno");
      return [];
    })).subscribe(data => {
      this.medicos = data
    })
  }

  obtenerConsulta = () => {
    const { ID } = Array.from(this.seleccionConsulta.values())[0];
    this.qService.ObtenerConsulta(ID).pipe(catchError((error: any) => {
      this.toastService.error("Error Interno");
      return [];
    })).subscribe(data => {
      this.establecerParametros(data[0].ID, data[0].Fecha, data[0].Hora, data[0].ID_Paciente, data[0].ID_Medico, data[0].Motivo);
    })
  }

  insertarConsulta = () => {
    console.log(this.Fecha, this.Hora, this.ID_Paciente, this.ID_Medico, this.Motivo)
    this.pService.InsertarConsulta(this.Fecha, this.Hora, this.ID_Paciente, this.ID_Medico, this.Motivo).pipe(
      catchError((error: any) => {
        this.toastService.error("Error Interno");
        return [];
      })
    ).subscribe(data => {
      this.toastService.success("Se ha insertado la consulta");
      this.obtenerConsultas();
      this.seleccionConsulta.clear();
      this.cerrarModal();
    })
  }

  actualizarConsulta = () => {
    this.pService.ActualizarConsulta(this.ID, this.Fecha, this.Hora, this.ID_Paciente, this.ID_Medico, this.Motivo).pipe(
      catchError((error: any) => {
        this.toastService.error("Error Interno");
        return [];
      })
    ).subscribe(data => {
      this.toastService.success("Se ha actualizado la consulta");
      this.seleccionConsulta.clear();
      this.obtenerConsultas();
      this.cerrarModal();
    })
  }

  eliminarConsulta = () => {
    this.pService.EliminarConsulta(this.ID).pipe(
      catchError((error: any) => {
        this.toastService.error("No se puede eliminar la consulta");
        return [];
      })
    ).subscribe(data => {
      this.toastService.success("Se ha eliminado la consulta");
      this.seleccionConsulta.clear();
      this.obtenerConsultas();
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

  establecerParametros = (ID: any, Fecha: any, Hora: any, ID_Paciente: any, ID_Medico: any, Motivo: any) => {
    this.ID = ID;
    this.ID_Paciente = ID_Paciente;
    this.ID_Medico = ID_Medico;
    this.Fecha = Fecha;
    this.Hora = Hora;
    this.Motivo = Motivo;
  }
  cerrarModal() {
    $('#medic').modal('hide');
  }
  abrirModal(modo: 'insertar' | 'actualizar') {
    this.modoFormulario = modo;
  
    if (modo === 'insertar') {
      // Limpiar el formulario
      this.ID_Paciente = '';
      this.ID_Medico = '';
      this.Fecha = '';
      this.Hora = '';
      this.Motivo = '';
      this.Estado = '';
    } else if (modo === 'actualizar') {
      
      // Cargar los datos del quirófano seleccionado
      const seleccionado = Array.from(this.seleccionConsulta.values())[0];
      if (seleccionado) {
        this.ID = seleccionado.ID;
        this.ID_Paciente = seleccionado.ID_Paciente;
        this.ID_Medico = seleccionado.ID_Medico;
        this.Fecha = seleccionado.Fecha;
        this.Hora = seleccionado.Hora;
        this.Motivo = seleccionado.Motivo;
        this.Estado = seleccionado.Estado;
      }else {
        this.toastService.warning("Debe seleccionar un medico");
      }
    }
  }

}
