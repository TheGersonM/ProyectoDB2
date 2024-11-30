import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'app/service/global.service';
import { ProceduresService } from 'app/service/procedures.service';
import { QueriesService } from 'app/service/queries.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-cheque',
  templateUrl: './cheque.component.html',
  styleUrls: ['./cheque.component.sass']
})
export class ChequeComponent implements OnInit {
  cheques: any[] = []
  medicos: any[] = []

  ID: any
  ID_Medico: any
  Fecha: any
  Concepto: any
  Valor: any

  seleccionCheque: Set<any> = new Set()

  constructor(
    private toastService: ToastrService,
    private globalService: GlobalService,
    private qService: QueriesService,
    private pService: ProceduresService
  ) { }

  ngOnInit(): void {
    this.obtenerCheques();
    this.obtenerMedicos();
  }

  obtenerCheques = () => {
    this.qService.ObtenerCheques().pipe(catchError((error: any) => {
      return [];
    })).subscribe(data => {
      this.cheques = data
    })
  }

  obtenerCheque = () => {
    const { ID } = Array.from(this.seleccionCheque.values())[0];
    this.qService.ObtenerCheque(ID).pipe(catchError((error: any) => {
      return [];
    })).subscribe(data => {
      this.establecerParametros(data[0].ID, data[0].ID_Medico, data[0].Fecha, data[0].Concepto, data[0].Valor);
    })
  }

  obtenerMedicos = () => {
    this.qService.ObtenerMedicos().pipe(catchError((error: any) => {
      return [];
    })).subscribe(data => {
      this.medicos = data
    })
  }

  insertarCheque = () => {
    this.pService.InsertarCheque(this.ID_Medico, this.Fecha, this.Concepto, this.Valor).pipe(catchError((error: any) => {
      this.toastService.error("Error Interno");
      return [];
    })).subscribe(data => {
      this.obtenerCheques();
      this.toastService.success("Se inserto correctamente");
    })
  }

  actualizarCheque = () => {
    this.pService.ActualizarCheque(this.ID, this.ID_Medico, this.Fecha, this.Concepto, this.Valor).pipe(catchError((error: any) => {
      this.toastService.error("Error Interno");
      return [];
    })).subscribe(data => {
      this.obtenerCheques();
      this.toastService.success("Se actualizo correctamente");
      this.seleccionCheque.clear();
    })
  }

  eliminarCheque = () => {
    this.pService.EliminarCheque(this.ID).pipe(catchError((error: any) => {
      this.toastService.error("Error Interno");
      return [];
    })).subscribe(data => {
      this.obtenerCheques();
      this.toastService.success("Se elimino correctamente");
      this.seleccionCheque.clear();
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

  establecerParametros = (ID: any, ID_Medico: any, Fecha: any, Concepto: any, Valor: any) => {
    this.ID = ID
    this.ID_Medico = ID_Medico
    this.Fecha = Fecha
    this.Concepto = Concepto
    this.Valor = Valor
  }

}
