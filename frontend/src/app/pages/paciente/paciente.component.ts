import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'app/service/global.service';
import { ProceduresService } from 'app/service/procedures.service';
import { QueriesService } from 'app/service/queries.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

declare var $:any;

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.sass']
})
export class PacienteComponent implements OnInit {

  pacientes: any[] = []

  ID: any
  Nombres: any
  Apellidos: any
  Direccion: any
  Telefono: any
  FechaNacimiento: any
  SeguroMedico: any
  modoFormulario: 'insertar' | 'actualizar' = 'insertar';

  seleccionPaciente: Set<any> = new Set();

  constructor(
    private pService: ProceduresService,
    private toastService: ToastrService,
    private qService: QueriesService,
    private globalService: GlobalService
  ) {
  }

  ngOnInit(): void {
    this.obtenerPacientes();
  }

  obtenerPacientes = () => {
    this.qService.ObtenerPacientes().pipe(
      catchError((error: any) => {
        this.toastService.error("Error Interno");
        return [];
      })).subscribe(data => {
        this.pacientes = data
      })
  }

  obtenerPaciente = () => {
    const { ID } = Array.from(this.seleccionPaciente.values())[0];
    this.qService.ObtenerPaciente(ID).pipe(
      catchError((error: any) => {
        this.toastService.error("Error Interno");
        return [];
      })).subscribe(data => {
        this.establecerParametros(data[0].ID, data[0].Nombre, data[0].Apellidos, data[0].Direccion, data[0].Telefono, data[0].FechaNacimiento, data[0].SeguroMedico);
      })
  }
  // #region Insertar paciente
  insertarPaciente = () => {
    this.pService.InsertarPaciente(this.Nombres, this.Apellidos, this.Direccion, this.Telefono, this.FechaNacimiento, this.SeguroMedico).pipe(
      catchError((error: any) => {
        this.toastService.error("Error Interno");
        return [];
      })
    ).subscribe(data => {
      this.toastService.success("Se ha insertado el paciente");
      this.obtenerPacientes();
      this.cerrarModal();  // Llamar al método para cerrar el modal después de insertar
      $('#medic').modal('hide'); // Usar jQuery para cerrar el modal (ajustar el ID según tu modal)
    });
  }
  cerrarModal() {
  }
  
  // #region Actualizar paciente
  actualizarPaciente = () => {
    this.pService.ActualizarPaciente(this.ID, this.Nombres, this.Apellidos, this.Direccion, this.Telefono, this.FechaNacimiento, this.SeguroMedico).pipe(
      catchError((error: any) => {
        this.toastService.error("Error Interno");
        return [];
      })
    ).subscribe(data => {
      this.toastService.success("Se ha actualizado el paciente");
      this.obtenerPacientes();
      this.seleccionPaciente.clear();
      this.cerrarModal();  // Cerrar el modal después de actualizar
      $('#medic').modal('hide'); // Cerrar el modal con jQuery (ajustar ID si es necesario)
    });
  }

  eliminarPaciente = () => {
    const { ID } = Array.from(this.seleccionPaciente.values())[0];
    this.pService.EliminarPaciente(ID).pipe(
      catchError((error: any) => {
        this.toastService.error("Error Interno");
        return [];
      })).subscribe(data => {
        this.toastService.success("Se ha eliminado el paciente");
        this.obtenerPacientes();
        this.seleccionPaciente.clear();
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

  establecerParametros = (ID: any, Nombres: any, Apellidos: any, Direccion: any, Telefono: any, FechaNacimiento: any, SeguroMedico: any) => {
    this.ID = ID;
    this.Nombres = Nombres;
    this.Apellidos = Apellidos;
    this.Direccion = Direccion;
    this.Telefono = Telefono;
    this.FechaNacimiento = FechaNacimiento;
    this.SeguroMedico = SeguroMedico;
  }
  
  abrirModal(modo: 'insertar' | 'actualizar') {
    this.modoFormulario = modo;
  
    if (modo === 'insertar') {
      // Limpiar el formulario
      this.Nombres = '';
      this.Apellidos = '';
      this.Direccion = '';
      this.Telefono = '';
      this.FechaNacimiento = '';
      this.SeguroMedico = '';
    } else if (modo === 'actualizar') {
      this.ID = this.obtenerPaciente();
      // Cargar los datos del quirófano seleccionado
      const seleccionado = Array.from(this.seleccionPaciente.values())[0];
      if (seleccionado) {
        this.Nombres = seleccionado.Nombres;
        this.Apellidos = seleccionado.Apellidos;
        this.Direccion = seleccionado.Direccion;
        this.Telefono = seleccionado.Telefono;
        this.FechaNacimiento = seleccionado.FechaNacimiento;
        this.SeguroMedico = seleccionado.SeguroMedico;
      }
    }
  }
}
