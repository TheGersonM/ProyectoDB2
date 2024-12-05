import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'app/service/global.service';
import { ProceduresService } from 'app/service/procedures.service';
import { QueriesService } from 'app/service/queries.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

declare var $: any;
@Component({
  selector: 'app-pacientes-atendidos',
  templateUrl: './pacientes-atendidos.component.html',
  styleUrls: ['./pacientes-atendidos.component.sass']
})

export class PacientesAtendidosComponent implements OnInit {
  pacientesAtendidos: any[] = [];
  medicos: any[] = []

  ID: any
  ID_Medico: any
  Fecha: any
  Concepto: any
  Valor: any
  modoFormulario: 'insertar' | 'actualizar' = 'insertar'

  seleccionPacienteAtendido: Set<any> = new Set()

  constructor(
    private toastService: ToastrService,
    private globalService: GlobalService,
    private qService: QueriesService,
    private pService: ProceduresService
  ) { }

  ngOnInit(): void {
    this.obtenerPacientesAtendidosPorMedico();
    this.obtenerMedicosInternos();
  }

  obtenerPacientesAtendidosPorMedico = () => {
    this.qService.ObtenerPacientesAtendidosPorMedico(this.ID_Medico).pipe(catchError((error: any) => {
      return [];
    })).subscribe(data => {
      this.pacientesAtendidos = data
    })
  }

  

  obtenerMedicosInternos = () => {
    this.qService.ObtenerMedicosInternos().pipe(catchError((error: any) => {
      return [];
    })).subscribe(data => {
      this.medicos = data
    })
  }

  establecerParametros = (ID: any, ID_Medico: any, Fecha: any, Concepto: any, Valor: any) => {
    this.ID = ID;
    this.ID_Medico = ID_Medico;
    this.Fecha = Fecha;
    this.Concepto = Concepto;
    this.Valor = Valor;
  }

  limpiarParametros = () => {
    this.ID = undefined;
    this.ID_Medico = undefined;
    this.Fecha = undefined;
    this.Concepto = undefined;
    this.Valor = undefined;
  }
}