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
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.sass'],
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    CommonModule
  ],
})
export class MedicoComponent implements OnInit {

  medicos: any[] = [];
  selectedMedico: Medico | null = null;

  ID: any = null;
  Nombre: string = '';
  NumeroLicencia: string = '';
  Especialidad: string = '';
  Tipo: string = '';

  seleccionMedico: Set<any> = new Set();

  displayedColumns: string[] = ['Nombre', 'Licencia', 'Especialidad', 'Tipo', 'Acciones'];

  constructor(
    private pService: ProceduresService,
    private qService: QueriesService,
    private globalService: GlobalService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.obtenerMedicos();
  }

  obtenerMedicos() {
    this.qService.ObtenerMedicos().pipe(catchError((error: any) => {
      this.toastService.error("Error Interno");
      return [];
    })).subscribe(data => {
      this.medicos = data;
    })
  }

  insertarMedico() {
    if (!this.Nombre || !this.NumeroLicencia || !this.Especialidad || !this.Tipo) {
      this.toastService.warning('Todos los campos son obligatorios');
      return;
    }

    this.toastService.success('nombre ' + this.Nombre + ' numero ' + this.NumeroLicencia + ' especialidad ' + this.Especialidad + ' tipo ' + this.Tipo);
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
        this.obtenerMedicos();
      });
  }

  actualizarMedico() {
    if (!this.ID || !this.Nombre || !this.NumeroLicencia || !this.Especialidad || !this.Tipo) {
      this.toastService.warning('Todos los campos son obligatorios');
      return;
    }

    this.toastService.success('ID '+ this.ID + ' nombre ' + this.Nombre + ' numero ' + this.NumeroLicencia + ' especialidad ' + this.Especialidad + ' tipo ' + this.Tipo);
   
    this.pService
      .ActualizarMedico(this.ID, this.Nombre, this.NumeroLicencia, this.Especialidad, this.Tipo)
      .pipe(
        catchError((error: any) => {
          this.toastService.error('Error al actualizar médico justo aqui');
          return [];
        })
      )
      .subscribe(() => {
        this.toastService.success('Médico actualizado exitosamente');
        this.obtenerMedicos();
      });
  }


  toggleEdit(row: any) {
    this.medicos.forEach(medico => medico.isEditing = false); // Asegura que solo una fila pueda ser editada a la vez
    row.isEditing = true;
  }

  saveRow(row: any) {
    if (!row.Nombre || !row.NumeroLicencia || !row.Especialidad || !row.Tipo) {
      this.toastService.warning('Todos los campos son obligatorios');
      return;
    }

    this.Nombre = row.Nombre;
    this.NumeroLicencia = row.NumeroLicencia;
    this.Especialidad = row.Especialidad;
    this.Tipo = row.Tipo;
    if(row.ID === null) {
      this.insertarMedico();
      return;
    }else{
      this.ID = row.ID;
      if(this.Tipo == null || this.Tipo == undefined)
      {
        this.toastService.warning('El tipo no puede ser nulo');
      }
      const TipoTemporal = this.Tipo;
      this.pService
      .ActualizarMedico(this.ID, this.Nombre, this.NumeroLicencia, this.Especialidad,  TipoTemporal)
      .pipe(
        catchError((error: any) => {
          this.toastService.error('Error al actualizar médico justo aqui ' + this.Tipo);
          return [];
        })
      ).subscribe(() => {
        this.toastService.success('Médico actualizado exitosamente');
        this.obtenerMedicos();
      });
      row.isEditing = false; 
    }
  }

  agregarFila() {
    const nuevoMedico: Medico = {
      ID: null,
      Nombre: '',
      NumeroLicencia: '',
      Especialidad: '',
      Tipo: '',
      isEditable: true, // La nueva fila es editable desde el principio
    };
    this.medicos.unshift(nuevoMedico); // Agregar la nueva fila al principio del array
    if (this.table) {
      this.table.renderRows(); // Renderiza las filas después de agregar un elemento
    }
  }

  guardarCambios() {
    const filaIncompleta = this.medicos.some(
      (medico) =>
        !medico.Nombre || !medico.NumeroLicencia || !medico.Especialidad || !medico.Tipo
    );
  
    if (filaIncompleta) {
      this.toastService.warning('Hay filas incompletas, por favor llene todos los campos');
      return;
    }
  
    this.medicos.forEach(medico => {
      if (medico.isEditable) {
        
        this.insertarMedico();
        medico.isEditable = false;
      }
    });
  }
  

  cancelarEdicion(medico: Medico) {

    //ponemos en false la edicion de todos los medicos
    this.medicos.forEach(medico => medico.isEditable = false);
    
    //todas lasfilas se les quita el modo de edicion
    this.medicos.forEach(medico => medico.isEditing = false);

    if (medico.ID === null) {
      this.medicos = this.medicos.filter(item => item !== medico); // Elimina la fila si no fue guardada
    }
  }

  hasEditableMedicos(): boolean {
    return this.medicos.some(medico => medico.isEditing);
  }
  
  eliminarMedico() {
    const seleccionado = this.medicos.find(medico => medico.isEditing);
    if (!seleccionado) {
      this.toastService.warning('Debe seleccionar un médico para eliminar');
      return;
    }
  
    this.pService.EliminarMedico(seleccionado.ID)
      .pipe(
        catchError((error: any) => {
          this.toastService.error('Error al eliminar médico');
          return [];
        })
      )
      .subscribe(() => {
        this.toastService.success('Médico eliminado exitosamente');
        this.medicos = this.medicos.filter(medico => medico !== seleccionado);
        if (this.table) {
          this.obtenerMedicos();
          this.table.renderRows(); // Renderiza las filas después de eliminar un elemento
        }
      });
  }
  
  seleccionarMedico(medico: Medico) {
    this.selectedMedico = medico;
    this.selectedMedico.isEditable = true; // Habilita la edición para la fila seleccionada
  }

  @ViewChild(MatTable) table: MatTable<any> | undefined;

  get isEditable(): boolean {
    return this.medicos.some(medico => medico.isEditable);
  }
  
}

interface Medico {
  ID: any;
  Nombre: string;
  NumeroLicencia: string;
  Especialidad: string;
  Tipo: string;
  isEditable: boolean; // Añadimos la propiedad para controlar si es editable
}
