import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'app/service/global.service';
import { ProceduresService } from 'app/service/procedures.service';
import { QueriesService } from 'app/service/queries.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
declare var $:any;

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.sass']
})
export class HabitacionComponent implements OnInit {
  habitaciones: any[] = []

  ID: any
  Tipo: any
  Estado: any
  NumeroHabitacion: any
  modoFormulario: 'insertar' | 'actualizar' = 'insertar'

  seleccionHabitacion: Set<any> = new Set()

  constructor(
    private pService: ProceduresService,
    private qService: QueriesService,
    private globalService: GlobalService,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    this.obtenerHabitaciones();
  }

  obtenerHabitaciones = () => {
    this.qService.ObtenerHabitaciones().pipe(catchError((error: any) => {
      this.toastService.error("Error Interno");
      return [];
    })).subscribe(data => {
      this.habitaciones = data
    })
  }

  obtenerHabitacion = () => {
    const { ID } = Array.from(this.seleccionHabitacion.values())[0];
    this.qService.ObtenerHabitacion(ID).pipe(catchError((error: any) => {
      this.toastService.error("Error Interno");
      return [];
    })).subscribe(data => {
      this.establecerParametros(data[0].ID, data[0].Tipo, data[0].Estado, data[0].NumeroHabitacion);
    })
  }

  cerrarModal() {
    $('#medic').modal('hide'); // Cerrar el modal con jQuery
  }


  insertarHabitacion = () => {
    this.pService.InsertarHabitacion(this.Tipo, this.Estado, this.NumeroHabitacion).pipe(
      catchError((error: any) => {
        this.toastService.error("Error Interno");
        return [];
      })
    ).subscribe(data => {
      this.toastService.success("Habitación insertada");
      this.obtenerHabitaciones();
      //cerrar modal
      this.cerrarModal();

    })
  }

  eliminarHabitacion = () => {
    const { ID } = Array.from(this.seleccionHabitacion.values())[0];
    this.pService.EliminarHabitacion(ID).pipe(
      catchError((error: any) => {
          this.toastService.error("Ya hay alguien en la habitación");
        
        return [];
      })
    ).subscribe(data => {
      this.toastService.success("Habitación eliminada");
      this.seleccionHabitacion.clear();
      this.obtenerHabitaciones();
    })
  }

  actualizarHabitacion = () => {
    this.pService.ActualizarHabitacion(this.ID, this.Tipo, this.Estado, this.NumeroHabitacion).pipe(
      catchError((error: any) => {
        this.toastService.error("Error Interno");
        return [];
      })
    ).subscribe(data => {
      this.toastService.success("Habitación actualizada");
      this.seleccionHabitacion.clear();
      this.obtenerHabitaciones();
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

  establecerParametros = (ID: any, Tipo: any, Estado: any, NumeroHabitacion: any) => {
    this.ID = ID
    this.Tipo = Tipo
    this.Estado = Estado
    this.NumeroHabitacion = NumeroHabitacion
  }
  abrirModal(modo: 'insertar' | 'actualizar') {
    this.modoFormulario = modo;
  
    if (modo === 'insertar') {
      // Limpiar el formulario
      this.Tipo = '';
      this.NumeroHabitacion = '';
      this.Estado = 'libre';
    } else if (modo === 'actualizar') {
      this.ID = this.obtenerHabitacion();
      // Cargar los datos del quirófano seleccionado
      const seleccionado = Array.from(this.seleccionHabitacion.values())[0];
      if (seleccionado) {
        this.Tipo = seleccionado.tipo;
        this.Estado = seleccionado.Estado;
        this.NumeroHabitacion = seleccionado.NumeroHabitacion;
      }
    }
  }
}
