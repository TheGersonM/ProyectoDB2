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
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.sass'],
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
export class PacienteComponent implements OnInit {

  pacientes: any[] = [];
  selectedPaciente: Paciente | null = null;

  ID: any = null;
  Nombre: string = '';
  Apellidos : string = '';
  Direccion : string = '';
  Telefono : string = '';
  FechaNacimiento : string = '';
  SeguroMedico : string = '';

  seleccionPaciente: Set<any> = new Set();

  displayedColumns: string[] = ['Nombre', 'Apellidos', 'Direccion', 'Telefono', 'FechaNacimiento', 'SeguroMedico', 'Acciones'];

  constructor(
    private pService: ProceduresService,
    private qService: QueriesService,
    private globalService: GlobalService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.obtenerPacientes();
  }

  obtenerPacientes() {
    this.qService.ObtenerPacientes().pipe(catchError((error: any) => {
      this.toastService.error("Error Interno");
      return [];
    })).subscribe(data => {
      this.pacientes = data;
    })
  }

  insertarPaciente() {
    if (!this.Nombre  || !this.Apellidos || !this.Direccion || !this.Telefono || !this.FechaNacimiento || !this.SeguroMedico) {
      this.toastService.warning('Todos los campos son obligatorios');
      return;
    }

    this.pService
      .InsertarPaciente(this.Nombre, this.Apellidos, this.Direccion, this.Telefono, this.FechaNacimiento, this.SeguroMedico)
      .pipe(
        catchError((error: any) => {
          this.toastService.error('Error al insertar médico');
          return [];
        })
      )
      .subscribe(() => {
        this.toastService.success('Paciente insertado exitosamente');
        this.obtenerPacientes();
      });
  }

  actualizarPaciente() {
    if (!this.ID || !this.Nombre || !this.Apellidos || !this.Direccion || !this.Telefono || !this.FechaNacimiento || !this.SeguroMedico) {
      this.toastService.warning('Todos los campos son obligatorios');
      return;
    }

    this.pService
      .ActualizarPaciente(this.ID, this.Nombre, this.Apellidos, this.Direccion, this.Telefono, this.FechaNacimiento, this.SeguroMedico)
      .pipe(
        catchError((error: any) => {
          this.toastService.error('Error al actualizar paciente');
          return [];
        })
      )
      .subscribe(() => {
        this.toastService.success('Paciente actualizado exitosamente');
        this.obtenerPacientes();
      });
  }


  toggleEdit(row: any) {
    this.pacientes.forEach(paciente => paciente.isEditing = false); // Asegura que solo una fila pueda ser editada a la vez
    row.isEditing = true;
  }

  saveRow(row: any) {
    if (!row.Nombre || !row.Apellidos || !row.Direccion || !row.Telefono || !row.FechaNacimiento || !row.SeguroMedico) {
      this.toastService.warning('Todos los campos son obligatorios');
      return;
    }

    this.Nombre = row.Nombre;
    this.Apellidos = row.Apellidos;
    this.Direccion = row.Direccion;
    this.Telefono = row.Telefono;
    this.FechaNacimiento = row.FechaNacimiento;
    this.SeguroMedico = row.SeguroMedico;
    if(row.ID === null) {
      this.insertarPaciente();
      return;
    }else{
      this.ID = row.ID;
      this.pService
      .ActualizarPaciente(this.ID, this.Nombre, this.Apellidos, this.Direccion, this.Telefono, this.FechaNacimiento, this.SeguroMedico)
      .pipe(
        catchError((error: any) => {
          this.toastService.error('Error al actualizar paciente justo aqui ');
          return [];
        })
      ).subscribe(() => {
        this.toastService.success('Paciente actualizado exitosamente');
        this.obtenerPacientes();
      });
      row.isEditing = false; 
    }
  }

  agregarFila() {
    const nuevoPaciente: Paciente = {
      ID: null,
      Nombre: '',
      Apellidos: '',
      Direccion: '',
      Telefono: '',
      FechaNacimiento: '',
      SeguroMedico: '',
      isEditable: true, // La nueva fila es editable desde el principio
    };
    this.pacientes.unshift(nuevoPaciente); // Agregar la nueva fila al principio del array
    this.toggleEdit(nuevoPaciente); // Activar el modo de edición de la nueva fila
    if (this.table) {
      this.table.renderRows(); // Renderiza las filas después de agregar un elemento
    }
  }

  guardarCambios() {
    const filaIncompleta = this.pacientes.some(
      (paciente) =>
        !paciente.Nombre || !paciente.Apellidos || !paciente.Direccion || !paciente.Telefono || !paciente.FechaNacimiento || !paciente.SeguroMedico
    );
  
    if (filaIncompleta) {
      this.toastService.warning('Hay filas incompletas, por favor llene todos los campos');
      return;
    }
  
    this.pacientes.forEach(paciente => {
      if (paciente.isEditable) {
        
        this.insertarPaciente();
        paciente.isEditable = false;
      }
    });
  }
  

  cancelarEdicion(paciente: Paciente) {

    //ponemos en false la edicion de todos los medicos
    this.pacientes.forEach(paciente => paciente.isEditable = false);
    
    //todas lasfilas se les quita el modo de edicion
    this.pacientes.forEach(paciente => paciente.isEditing = false);

    if (paciente.ID === null) {
      this.pacientes = this.pacientes.filter(item => item !== paciente); // Elimina la fila si no fue guardada
    }
  }

  hasEditablePacientes(): boolean {
    return this.pacientes.some(paciente => paciente.isEditing);
  }
  
  eliminarPaciente() {
    const seleccionado = this.pacientes.find(paciente => paciente.isEditing);
    if (!seleccionado) {
      this.toastService.warning('Debe seleccionar un paciente para eliminar');
      return;
    }
  
    this.pService.EliminarPaciente(seleccionado.ID)
      .pipe(
        catchError((error: any) => {
          this.toastService.error('Error al eliminar paciente');
          return [];
        })
      )
      .subscribe(() => {
        this.toastService.success('Paciente eliminado exitosamente');
        this.pacientes = this.pacientes.filter(paciente => paciente !== seleccionado);
        if (this.table) {
          this.obtenerPacientes();
          this.table.renderRows(); // Renderiza las filas después de eliminar un elemento
        }
      });
  }
  
  seleccionarPaciente(paciente: Paciente) {
    this.selectedPaciente = paciente;
    this.selectedPaciente.isEditable = true; // Habilita la edición para la fila seleccionada
  }

  @ViewChild(MatTable) table: MatTable<any> | undefined;

  get isEditable(): boolean {
    return this.pacientes.some(paciente => paciente.isEditable);
  }
  
}

interface Paciente {
  ID: any;
  Nombre: string;
  Apellidos: string;
  Direccion: string;
  Telefono: string;
  FechaNacimiento: string;
  SeguroMedico: string;
  isEditable: boolean; // Añadimos la propiedad para controlar si es editable
}
