import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'app/service/global.service';
import { ProceduresService } from 'app/service/procedures.service';
import { QueriesService } from 'app/service/queries.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';


declare var $:any;

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.sass']
})
export class MedicoComponent implements OnInit {
  medicos: any[] = [];

  ID: any
  Nombre: any
  NumeroLicencia: any
  Especialidad: any
  Tipo: any
  seleccionMedico: Set<any> = new Set();
  modoFormulario: 'insertar' | 'actualizar' = 'insertar';

  constructor(
    private pService: ProceduresService,
    private qService: QueriesService,
    private globalService: GlobalService,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    this.obtenerMedicos();
  }
//#region Obtener medicos
  obtenerMedicos() {
    this.qService.ObtenerMedicos().pipe(catchError((error: any) => {
      this.toastService.error("Error Interno");
      return [];
    })).subscribe(data => {
      this.medicos = data;
    })
  }
  obtenerMedico = () => {
    const { ID } = Array.from(this.seleccionMedico.values())[0];
    this.qService.ObtenerMedico(ID).pipe(catchError((error: any) => {
      this.toastService.error("Error Interno");
      return [];
    })).subscribe(data => {
      if (data && data.length > 0) {
        this.establecerParametros(data[0].ID, data[0].Nombre, data[0].NumeroLicencia, data[0].Especialidad, data[0].Tipo);
      }
    });
  }
  
//#region Insertar medico
insertarMedico = () => {  
  this.pService.InsertarMedico(this.Nombre, this.NumeroLicencia, this.Especialidad, this.Tipo).pipe(
    catchError((error: any) => {
      this.toastService.error("Error Interno");
      return [];
    })
  )
  .subscribe(data => {
    this.seleccionMedico.clear(); // Limpiar la selección
    this.toastService.success("Medico insertado");
    this.cerrarModal(); // Llamar al método para cerrar el modal
    $('#medic').modal('hide'); // Usar jQuery para cerrar el modal
    this.obtenerMedicos();
  })
}
cerrarModal() {
}  
  //#region Eliminar medico
  eliminarMedico = () => {
    const { ID } = Array.from(this.seleccionMedico.values())[0];
    this.pService.EliminarMedico(ID).pipe(
      catchError((error: any) => {
        this.toastService.error("Error Interno");
        return [];
      }),
    ).subscribe(data => {
      this.toastService.success("Medico eliminado");
      this.seleccionMedico.clear();
      this.obtenerMedicos();
    })
  }
  //#region Actualizar medico
  actualizarMedico = () => {
    this.pService.ActualizarMedico(this.ID, this.Nombre, this.NumeroLicencia, this.Especialidad, this.Tipo).pipe(
      catchError((error: any) => {
        this.toastService.error("Error Interno");
        return [];
      }),
    ).subscribe(data => {
      this.toastService.success("Medico actualizado");
      this.seleccionMedico.clear();
      this.obtenerMedicos();
      this.cerrarModal();
      $('#medic').modal('hide'); // Usar jQuery para cerrar el modal
    });
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
  establecerParametros = (ID: any, Nombre: any, NumeroLicencia: any, Especialidad: any, Tipo: any) => {
    this.ID = ID;
    this.Nombre = Nombre;
    this.NumeroLicencia = NumeroLicencia;
    this.Especialidad = Especialidad;
    this.Tipo = Tipo;
  }
  abrirModal(modo: 'insertar' | 'actualizar') {
    this.modoFormulario = modo;
  
    if (modo === 'insertar') {
      // Limpiar el formulario
      this.Nombre = '';
      this.NumeroLicencia = '';
      this.Especialidad = '';
      this.Tipo = '';
    } else if (modo === 'actualizar') {
      
      // Cargar los datos del quirófano seleccionado
      const seleccionado = Array.from(this.seleccionMedico.values())[0];
      if (seleccionado) {
        this.ID = seleccionado.ID;
        this.Nombre = seleccionado.Nombre;
        this.NumeroLicencia = seleccionado.NumeroLicencia;
        this.Especialidad = seleccionado.Especialidad;
        this.Tipo = seleccionado.Tipo;
      }else {
        this.toastService.warning("Debe seleccionar un medico");
      }
    }
  }
}
