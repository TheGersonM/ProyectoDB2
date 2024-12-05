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

  ID_Paciente: any 
  ID_Medico: any = 1
  nombre_Paciente: any
  ID_Hospitalizacion: any
  cirugias_Recibidas: any
  atenciones_Recibidas: any
  modoFormulario: 'insertar' | 'actualizar' = 'insertar'

  seleccionPacienteAtendido: Set<any> = new Set()

  constructor(
    private toastService: ToastrService,
    private globalService: GlobalService,
    private qService: QueriesService,
    private pService: ProceduresService
  ) { }

  ngOnInit(): void {
    this.obtenerPacientesAtendidosPorMedico(this.ID_Medico);
    this.obtenerMedicos(); // Llamar al método para obtener los doctores
  }

  obtenerPacientesAtendidosPorMedico = (ID_Medico: number) => {
    this.qService.ObtenerPacientesAtendidosPorMedico(ID_Medico).pipe(catchError((error: any) => {
      return [];
    })).subscribe(data => {
      this.pacientesAtendidos = data
    })
  }

  obtenerMedicos = () => {
    this.qService.ObtenerMedicos().pipe(catchError((error: any) => {
      return [];
    })).subscribe(data => {
      this.medicos = data;
    })
  }

  seleccionarLinea = (set: Set<any>, obj: any, tipo: number) => {
    this.globalService.addLine(set, obj, tipo);
  }
}
