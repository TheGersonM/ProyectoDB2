import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'app/service/global.service';
import { ProceduresService } from 'app/service/procedures.service';
import { QueriesService } from 'app/service/queries.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-cirugia',
  templateUrl: './cirugia.component.html',
  styleUrls: ['./cirugia.component.sass']
})
export class CirugiaComponent implements OnInit {

  cirugias: any[] = []
  pacientes: any[] = []
  medicos: any[] = []
  quirofanos: any[] = []

  ID: any
  ID_Paciente: any
  ID_Medico: any
  Fecha: any
  Hora: any
  Tipo: any
  PersonalMedico: any
  Medicamentos: any
  Materiales: any
  ID_Quirofano: any

  seleccionCirugia: Set<any> = new Set();

  constructor(
    private toastService: ToastrService,
    private globalService: GlobalService,
    private qService: QueriesService,
    private pService: ProceduresService
  ) { }

  ngOnInit(): void {
    this.obtenerCirugias();
    this.obtenerPacientes();
    this.obtenerMedicos();
    this.obtenerQuirofanos();
  }

  obtenerCirugias = () => {
    this.qService.ObtenerCirugias().pipe(catchError((error: any) => {
      return [];
    })).subscribe(data => {
      this.cirugias = data
    })
  }

  obtenerCirugia = () => {
    const { ID } = Array.from(this.seleccionCirugia.values())[0];
    this.qService.ObtenerCirugia(ID).pipe(catchError((error: any) => {
      return [];
    })).subscribe(data => {
      this.establecerParametros(data[0].ID, data[0].ID_Paciente, data[0].ID_Medico, data[0].Fecha, data[0].Hora, data[0].Tipo, data[0].PersonalMedico, data[0].Medicamentos, data[0].Materiales, data[0].ID_Quirofano);
    })
  }

  obtenerPacientes = () => {
    this.qService.ObtenerPacientes().pipe(catchError((error: any) => {
      return [];
    })).subscribe(data => {
      this.pacientes = data
    })
  }

  obtenerMedicos = () => {
    this.qService.ObtenerMedicos().pipe(catchError((error: any) => {
      return [];
    })).subscribe(data => {
      this.medicos = data
    })
  }

  obtenerQuirofanos = () => {
    this.qService.ObtenerQuirofanos().pipe(catchError((error: any) => {
      return [];
    })).subscribe(data => {
      this.quirofanos = data
    })
  }

  insertarCirugia = () => {
    const { ID_Paciente, ID_Medico, Fecha, Hora, Tipo, PersonalMedico, Medicamentos, Materiales, ID_Quirofano } = this
    this.pService.InsertarCirugia(ID_Paciente, ID_Medico, Fecha, Hora, Tipo, PersonalMedico, Medicamentos, Materiales, ID_Quirofano).pipe(catchError((error: any) => {
      this.toastService.error("Error Interno");
      return [];
    })).subscribe(() => {
      this.toastService.success("Cirugía Creada");
      this.obtenerCirugias();
    })
  }

  actualizarCirugia = () => {
    this.pService.ActualizarCirugia(this.ID, this.ID_Paciente, this.ID_Medico, this.Fecha, this.Hora, this.Tipo, this.PersonalMedico, this.Medicamentos, this.Materiales, this.ID_Quirofano).pipe(catchError((error: any) => {
      this.toastService.error("Error Interno");
      return [];
    })).subscribe((data) => {
      this.toastService.success("Cirugía Actualizada");
      this.seleccionCirugia.clear();
      this.obtenerCirugias();
    })
  }

  eliminarCirugia = () => {
    const { ID } = Array.from(this.seleccionCirugia.values())[0];
    this.pService.EliminarCirugia(ID).pipe(catchError((error: any) => {
      this.toastService.error("Error Interno");
      return [];
    })).subscribe(() => {
      this.toastService.success("Cirugía Eliminada");
      this.seleccionCirugia.clear();
      this.obtenerCirugias();
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

  establecerParametros = (ID: any, ID_Paciente: any, ID_Medico: any, Fecha: any, Hora: any, Tipo: any, PersonalMedico: any, Medicamentos: any, Materiales: any, ID_Quirofano: any) => {
    this.ID = ID
    this.ID_Paciente = ID_Paciente
    this.ID_Medico = ID_Medico
    this.Fecha = Fecha
    this.Hora = Hora
    this.Tipo = Tipo
    this.PersonalMedico = PersonalMedico
    this.Medicamentos = Medicamentos
    this.Materiales = Materiales
    this.ID_Quirofano = ID_Quirofano
  }

}
