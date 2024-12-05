import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'app/service/global.service';
import { ProceduresService } from 'app/service/procedures.service';
import { QueriesService } from 'app/service/queries.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';


@Component({
  selector: 'app-resumen-medicos',
  templateUrl: './resumen-medicos.component.html',
  styleUrls: ['./resumen-medicos.component.sass']
})
export class ResumenMedicosComponent {
  Resumenes: any[] = []

  ID_medico: any
  Nombre_Medico: any
  Especialidad: any
  Consultas_Realizadas: any
  Cirugias_Realizadas: any

  seleccionResumen: Set<any> = new Set()
  constructor(
    private pService: ProceduresService,
    private qService: QueriesService,
    private globalService: GlobalService,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    this.ResumenMedicos();
  }

  ResumenMedicos = () => {
    this.qService.ResumenMedicos().pipe(catchError((error: any) => {
      this.toastService.error("Error Interno");
      return [];
    })).subscribe(data => {
      this.Resumenes = data
    })
  }

  
  seleccionarLinea = (set: Set<any>, obj: any, tipo: number) => {
    this.globalService.addLine(set, obj, tipo);
  }
}


