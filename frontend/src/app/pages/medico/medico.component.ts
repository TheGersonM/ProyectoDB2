import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'app/service/global.service';
import { ProceduresService } from 'app/service/procedures.service';
import { QueriesService } from 'app/service/queries.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.sass'],
})
export class MedicoComponent implements OnInit {
  medicos: any[] = [];

  ID: any = null;
  Nombre: string = '';
  NumeroLicencia: string = '';
  Especialidad: string = '';
  Tipo: string = '';

  seleccionMedico: Set<any> = new Set();
  modoFormulario: 'insertar' | 'actualizar' = 'insertar';

  constructor(
    private pService: ProceduresService,
    private qService: QueriesService,
    private globalService: GlobalService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.obtenerMedicos();
  }

  //#region Obtener médicos
  obtenerMedicos() {
    this.qService.ObtenerMedicos().pipe(catchError((error: any) => {
      this.toastService.error("Error Interno");
      return [];
    })).subscribe(data => {
      this.medicos = data;
    })
  }

  //#endregion

  //#region Insertar médico
  insertarMedico() {
    if (!this.Nombre || !this.NumeroLicencia || !this.Especialidad || !this.Tipo) {
      this.toastService.warning('Todos los campos son obligatorios');
      return;
    }

    this.pService
      .InsertarMedico(this.Nombre, this.NumeroLicencia, this.Especialidad, this.Tipo)
      .pipe(
        catchError((error: any) => {
          this.toastService.error('Error al insertar médico');
          return [];
        })
      )
      .subscribe(() => {
        this.toastService.success('Médico insertado exitosamente');
        this.cerrarModal();
        this.obtenerMedicos();
      });
  }

  //#endregion

  //#region Actualizar médico
  actualizarMedico() {
    if (!this.ID || !this.Nombre || !this.NumeroLicencia || !this.Especialidad || !this.Tipo) {
      this.toastService.warning('Todos los campos son obligatorios');
      return;
    }

    this.pService
      .ActualizarMedico(this.ID, this.Nombre, this.NumeroLicencia, this.Especialidad, this.Tipo)
      .pipe(
        catchError((error: any) => {
          this.toastService.error('Error al actualizar médico');
          return [];
        })
      )
      .subscribe(() => {
        this.toastService.success('Médico actualizado exitosamente');
        this.cerrarModal();
        this.obtenerMedicos();
      });
  }

  //#endregion

  //#region Eliminar médico
  eliminarMedico() {
    const seleccionado = Array.from(this.seleccionMedico.values())[0];
    if (!seleccionado) {
      this.toastService.warning('Debe seleccionar un médico para eliminar');
      return;
    }

    this.pService
      .EliminarMedico(seleccionado.ID)
      .pipe(
        catchError((error: any) => {
          this.toastService.error('Error al eliminar médico');
          return [];
        })
      )
      .subscribe(() => {
        this.toastService.success('Médico eliminado exitosamente');
        this.seleccionMedico.clear();
        this.obtenerMedicos();
      });
  }

  //#endregion

  //#region Gestión del formulario
  abrirModal(modo: 'insertar' | 'actualizar') {
    this.modoFormulario = modo;

    if (modo === 'insertar') {
      // Limpiar campos
      this.limpiarFormulario();
    } else if (modo === 'actualizar') {
      const seleccionado = Array.from(this.seleccionMedico.values())[0];
      if (!seleccionado) {
        this.toastService.warning('Debe seleccionar un médico para editar');
        return;
      }

      // Precargar datos en el formulario
      this.ID = seleccionado.ID;
      this.Nombre = seleccionado.Nombre;
      this.NumeroLicencia = seleccionado.NumeroLicencia;
      this.Especialidad = seleccionado.Especialidad;
      this.Tipo = seleccionado.Tipo;
    }

    $('#medic').modal('show'); // Mostrar el modal
  }

  cerrarModal() {
    $('#medic').modal('hide'); // Cerrar el modal
    this.limpiarFormulario();
  }

  limpiarFormulario() {
    this.ID = null;
    this.Nombre = '';
    this.NumeroLicencia = '';
    this.Especialidad = '';
    this.Tipo = '';
  }

  //#endregion

  //#region Selección de filas
  seleccionarLinea(set: Set<any>, obj: any, tipo: number) {
    this.globalService.addLine(set, obj, tipo);
  }

  seleccionarTodo(arr: any[], set: Set<any>) {
    this.globalService.selectAll(arr, set);
  }

  removeLine(arr: any[], set: Set<any>) {
    this.globalService.removeLine(arr, set);
  }

  //#endregion
}
