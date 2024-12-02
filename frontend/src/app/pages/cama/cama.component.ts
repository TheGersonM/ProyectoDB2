import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'app/service/global.service';
import { ProceduresService } from 'app/service/procedures.service';
import { QueriesService } from 'app/service/queries.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

declare var $:any;
@Component({
  selector: 'app-cama',
  templateUrl: './cama.component.html',
  styleUrls: ['./cama.component.sass']
})
export class CamaComponent implements OnInit {

  camas: any[] = [];

  ID: any
  Numero: any
  Estado: any
  Habitacion_ID: any
  modoFormulario: 'insertar' | 'actualizar' = 'insertar'
  seleccionCama: Set<any> = new Set();

  constructor(
    private toastService: ToastrService,
    private globalService: GlobalService,
    private qService: QueriesService,
    private pService: ProceduresService
  ) { }

  ngOnInit(): void {
    this.obtenerCamas();
  }

  obtenerCamas = () => {
    this.qService.ObtenerCamas().pipe(catchError((error: any) => {
      this.toastService.error("Error Interno");
      return [];
    })).subscribe(data => {
      this.camas = data
    })
  }

  obtenerCama = () => {
    const { ID } = Array.from(this.seleccionCama.values())[0];
    this.qService.ObtenerCama(ID).pipe(catchError((error: any) => {
      this.toastService.error("Error Interno");
      return [];
    })).subscribe(data => {
      this.establecerParametros(data[0].ID, data[0].Numero, data[0].Estado, data[0].Habitacion_ID);
    })
  }

  eliminarCama = () => {
    const { ID } = Array.from(this.seleccionCama.values())[0];
    this.pService.EliminarCama(ID).pipe(catchError((error: any) => {
      this.toastService.error("No se puede borrar");
      return [];
    })).subscribe(data => {
      this.toastService.success("Se ha borrado la cama");
      this.seleccionCama.clear();
      this.obtenerCamas();
    })
  }

  insertarCama = () => {
    this.pService.InsertarCama(this.Numero, this.Estado, this.Habitacion_ID).pipe(catchError((error: any) => {
      this.toastService.error("No se pude insertar");
      return [];
    })).subscribe(data => {
      this.toastService.success("Se ha insertado la cama");
      this.seleccionCama.clear();
      this.obtenerCamas();
      this.cerrarModal();
    })
  }

  actualizarCama = () => {
    const { ID } = Array.from(this.seleccionCama.values())[0];
    this.pService.ActualizarCama(ID, this.Numero, this.Estado, this.Habitacion_ID).pipe(catchError((error: any) => {
      this.toastService.error("No se pude actualizar");
      return [];
    })).subscribe(data => {
      this.toastService.success("Se ha actualizado la cama");
      this.obtenerCamas();
      this.seleccionCama.clear();
      this.cerrarModal();
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

  establecerParametros = (ID: any, Numero: any, Estado: any, Habitacion_ID: any) => {
    this.ID = ID
    this.Numero = Numero
    this.Estado = Estado
    this.Habitacion_ID = Habitacion_ID
  }

  cerrarModal() {
    $('#medic').modal('hide');
  }

  abrirModal(modo: 'insertar' | 'actualizar') {
    this.modoFormulario = modo;
  
    if (modo === 'insertar') {
      // Limpiar el formulario
      this.Numero= '';
      this.Habitacion_ID = '';
      this.Estado = 'libre';
    } else if (modo === 'actualizar') {
      this.ID = this.obtenerCama();
      // Cargar los datos del quirófano seleccionado
      const seleccionado = Array.from(this.seleccionCama.values())[0];
      if (seleccionado) {
        this.Numero = seleccionado.Numero;
        this.Estado = seleccionado.Estado;
        this.Habitacion_ID = seleccionado.Habitacion_ID;
      }
    }
  }
  
}


