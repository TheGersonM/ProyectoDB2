import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from 'app/service/global.service';
import { ProceduresService } from 'app/service/procedures.service';
import { QueriesService } from 'app/service/queries.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatNativeDateModule } from '@angular/material/core';

declare var $: any;

@Component({
  selector: 'app-cama',
  templateUrl: './cama.component.html',
  styleUrls: ['./cama.component.sass'],
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule, 
    MatNativeDateModule
  ],
})
export class CamaComponent implements OnInit {

  camas: any[] = [];
  selectedcama: Cama | null = null;

  ID: any = null;
  Numero: string = '';
  Estado: string = '';
  Habitacion_ID: string = '';

  seleccionCama: Set<any> = new Set();

  displayedColumns: string[] = ['Numero', 'Estado', 'Habitacion_ID', 'Acciones'];

  constructor(
    private pService: ProceduresService,
    private qService: QueriesService,
    private globalService: GlobalService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.obtenerCamas();
  }

  obtenerCamas() {
    this.qService.ObtenerCamas().pipe(catchError((error: any) => {
      this.toastService.error("Error Interno");
      return [];
    })).subscribe(data => {
      this.camas = data;
    })
  }

  insertarCama() {
    if (!this.Estado || !this.Habitacion_ID || !this.Numero) {
      this.toastService.warning('Todos los campos son obligatorios');
      return;
    }

    this.pService
      .InsertarCama(this.Numero, this.Estado, this.Habitacion_ID)
      .pipe(
        catchError((error: any) => {
          this.toastService.error('Error al insertar cama');
          return [];
        })
      )
      .subscribe(() => {
        this.toastService.success('cama insertada exitosamente');
        this.obtenerCamas();
      });
  }

  actualizarCama() {
    if (!this.Estado || !this.Habitacion_ID || !this.Numero) {
      this.toastService.warning('Todos los campos son obligatorios');
      return;
    }

    this.pService
      .ActualizarCama(this.ID, this.Numero, this.Estado, this.Habitacion_ID)
      .pipe(
        catchError((error: any) => {
          this.toastService.error('Error al actualizar cama');
          return [];
        })
      )
      .subscribe(() => {
        this.toastService.success('cama actualizado exitosamente');
        this.obtenerCamas();
      });
  }


  toggleEdit(row: any) {
    this.camas.forEach(cama => cama.isEditing = false); // Asegura que solo una fila pueda ser editada a la vez
    row.isEditing = true;
  }

  saveRow(row: any) {
    if (!row.Numero || !row.Estado || !row.Habitacion_ID) {
      this.toastService.warning('Todos los campos son obligatorios');
      return;
    }

   this.Estado = row.Estado;
    this.Habitacion_ID = row.Habitacion_ID;
    this.Numero = row.Numero;
    if(row.ID === null) {
      this.insertarCama();
      return;
    }else{
      this.ID = row.ID;
      this.pService
      .ActualizarCama(this.ID, this.Numero, this.Estado, this.Habitacion_ID)
      .pipe(
        catchError((error: any) => {
          this.toastService.error('Error al actualizar cama justo aqui ');
          return [];
        })
      ).subscribe(() => {
        this.toastService.success('cama actualizado exitosamente');
        this.obtenerCamas();
      });
      row.isEditing = false; 
    }
  }

  agregarFila() {
    const nuevocama: Cama = {
      ID: null,
      Numero: '',
      Estado: '',
      Habitacion_ID: '',
      isEditable: true, // La nueva fila es editable desde el principio
    };
    this.camas.unshift(nuevocama); // Agregar la nueva fila al principio del array
    this.toggleEdit(nuevocama); // Activar el modo de edición de la nueva fila
    if (this.table) {
      this.table.renderRows(); // Renderiza las filas después de agregar un elemento
    }
  }

  guardarCambios() {
    const filaIncompleta = this.camas.some(
      (cama) =>
        !cama.Numero || !cama.Estado || !cama.Habitacion
    );
  
    if (filaIncompleta) {
      this.toastService.warning('Hay filas incompletas, por favor llene todos los campos');
      return;
    }
  
    this.camas.forEach(cama => {
      if (cama.isEditable) {
        
        this.insertarCama();
        cama.isEditable = false;
      }
    });
  }
  

  cancelarEdicion(cama: Cama) {

    //ponemos en false la edicion de todos los medicos
    this.camas.forEach(cama => cama.isEditable = false);
    
    //todas lasfilas se les quita el modo de edicion
    this.camas.forEach(cama => cama.isEditing = false);

    if (cama.ID === null) {
      this.camas = this.camas.filter(item => item !== cama); // Elimina la fila si no fue guardada
    }
  }

  hasEditableCamas(): boolean {
    return this.camas.some(cama => cama.isEditing);
  }
  
  eliminarCama() {
    const seleccionado = this.camas.find(cama => cama.isEditing);
    if (!seleccionado) {
      this.toastService.warning('Debe seleccionar un cama para eliminar');
      return;
    }
  
    this.pService.EliminarCama(seleccionado.ID)
      .pipe(
        catchError((error: any) => {
          this.toastService.error('Error al eliminar cama');
          return [];
        })
      )
      .subscribe(() => {
        this.toastService.success('cama eliminado exitosamente');
        this.camas = this.camas.filter(cama => cama !== seleccionado);
        if (this.table) {
          this.obtenerCamas();
          this.table.renderRows(); // Renderiza las filas después de eliminar un elemento
        }
      });
  }
  
  seleccionarcama(cama: Cama) {
    this.selectedcama = cama;
    this.selectedcama.isEditable = true; // Habilita la edición para la fila seleccionada
  }

  @ViewChild(MatTable) table: MatTable<any> | undefined;

  get isEditable(): boolean {
    return this.camas.some(cama => cama.isEditable);
  }
  
}

interface Cama {
  ID: any;
  Numero: string;
  Estado: string;
  Habitacion_ID: string;
  isEditable: boolean; // Añadimos la propiedad para controlar si es editable
}
