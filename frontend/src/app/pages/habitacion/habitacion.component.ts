import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from 'app/service/global.service';
import { ProceduresService } from 'app/service/procedures.service';
import { QueriesService } from 'app/service/queries.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';import { MatTable, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.sass'],
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    CommonModule
  ]
})
export class HabitacionComponent implements OnInit {
  habitaciones: any[] = []

  ID: any
  Tipo: any
  Estado: any
  NumeroHabitacion: any
  precio: any

  displayedColumns: string[] = ['Tipo', 'Estado', 'NumeroHabitacion', 'Precio', 'Acciones'];
  seleccionHabitacion: Set<any> = new Set()

  @ViewChild(MatTable) table: MatTable<any> | undefined;

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
      this.establecerParametros(data[0].ID, data[0].Tipo, data[0].Estado, data[0].NumeroHabitacion, data[0].precio);
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
      this.cerrarModal();
    })
  }

  eliminarHabitacion() {
    const seleccionado = this.habitaciones.find(habitacion => habitacion.isEditing);
    if (!seleccionado) {
      this.toastService.warning('Debe seleccionar una habitacion para eliminar');
      return;
    }
  
    this.pService.EliminarHabitacion(seleccionado.ID)
      .pipe(
        catchError((error: any) => {
          this.toastService.error('Error al eliminar la habitacion');
          return [];
        })
      )
      .subscribe(() => {
        this.toastService.success('Habitacion eliminada exitosamente');
        this.habitaciones = this.habitaciones.filter(habitacion => habitacion !== seleccionado);
        if (this.table) {
          this.obtenerHabitacion();
          this.table.renderRows(); // Renderiza las filas después de eliminar un elemento
        }
      });
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

  establecerParametros = (ID: any, Tipo: any, Estado: any, NumeroHabitacion: any, precio: any) => {
    this.ID = ID
    this.Tipo = Tipo
    this.Estado = Estado
    this.NumeroHabitacion = NumeroHabitacion
    this.precio = precio
  }



  toggleEdit(row: any) {
    this.habitaciones.forEach(habitacion => habitacion.isEditable = true); // Asegura que solo una fila pueda ser editada a la vez
    row.isEditing = true;
  }

  saveRow(row: any) {
    if (!row.Tipo || !row.Estado || !row.NumeroHabitacion || !row.Precio) {
      this.toastService.warning('Todos los campos son obligatorios');
      return;
    }

    this.Estado = row.Estado;
    this.NumeroHabitacion = row.NumeroHabitacion;
    this.precio = row.Precio;
    this.Tipo = row.Tipo;
    if(row.ID === null) {
      this.insertarHabitacion();
      return;
    }else{
      this.ID = row.ID;
      if(this.Tipo == null || this.Tipo == undefined)
      {
        this.toastService.warning('El tipo no puede ser nulo');
      }
      const TipoTemporal = this.Tipo;
      this.pService
      .ActualizarHabitacion(this.ID, this.Tipo, this.Estado, this.NumeroHabitacion)
      .pipe(
        catchError((error: any) => {
          this.toastService.error('Error al actualizar médico justo aqui ' + this.Tipo);
          return [];
        })
      ).subscribe(() => {
        this.toastService.success('Médico actualizado exitosamente');
        this.obtenerHabitacion();
      });
      row.isEditing = false; 
    }
  }

  agregarFila() {
    const nuevaHabitacion: Habitacion = {
      ID: null,
      Tipo: '',
      Estado: '',
      NumeroHabitacion: '',
      Precio: '',
      isEditable: true, // La nueva fila es editable desde el principio
    };
    this.habitaciones.unshift(nuevaHabitacion); // Agregar la nueva fila al principio del array
    this.toggleEdit(nuevaHabitacion); // Activar el modo de edición de la nueva fila
    if (this.table) {
      this.table.renderRows(); // Renderiza las filas después de agregar un elemento
    }
  }

  guardarCambios() {
    const filaIncompleta = this.habitaciones.some(
      (habitacion) =>
        !habitacion.Tipo || !habitacion.Estado || !habitacion.NumeroHabitacion || !habitacion.Precio
    );

    if (filaIncompleta) {
      this.toastService.warning('Hay filas incompletas, por favor llene todos los campos');
      return;
    }

    this.habitaciones.forEach(habitacion => {
      if (habitacion.isEditable) {
        this.insertarHabitacion();
        habitacion.isEditable = false;
      }
    });
  }

  cancelarEdicion(habitacion: any) {
     //ponemos en false la edicion de todos los medicos
    this.habitaciones.forEach(habitacion => habitacion.isEditable = false);
    
    //todas lasfilas se les quita el modo de edicion
    this.habitaciones.forEach(habitacion => habitacion.isEditing = false);

    if (habitacion.ID === null) {
      this.habitaciones = this.habitaciones.filter(item => item !== habitacion); // Elimina la fila si no fue guardada
    }
  }

  hasEditableHabitaciones(): boolean {
    return this.habitaciones.some(habitacion => habitacion.isEditable);
  }
}
interface Habitacion {
  ID: any;
  Tipo: string;
  Estado: string;
  NumeroHabitacion: string;
  Precio: string;
  isEditable: boolean; // Añadimos la propiedad para controlar si es editable
}