import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'app/service/global.service';
import { ProceduresService } from 'app/service/procedures.service';
import { QueriesService } from 'app/service/queries.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-cobro-consultorio',
  templateUrl: './cobro-consultorio.component.html',
  styleUrls: ['./cobro-consultorio.component.sass']
})
export class CobroConsultorioComponent implements OnInit {
  cobroConsultorios: any[] = [];
  consultorios: any[] = [];

  ID: any
  Nombre: any
  Concepto: any
  Valor: any
  Impuesto: any
  Total: any
  ID_Consultorio: any

  seleccionCobroConsultorio: Set<any> = new Set();

  constructor(
    private globalService: GlobalService,
    private qService: QueriesService,
    private pService: ProceduresService,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    this.obtenerCobroConsultorios();
    this.obtenerConsultoriosAlquilados();
  }

  obtenerCobroConsultorios = () => {
    this.qService.ObtenerCobroConsultorios().pipe(catchError((error: any) => {
      return [];
    })).subscribe(data => {
      this.cobroConsultorios = data
    })
  }

  obtenerCobroConsultorio = () => {
    const { ID } = Array.from(this.seleccionCobroConsultorio.values())[0];
    this.qService.ObtenerCobroConsultorio(ID).pipe(catchError((error: any) => {
      return [];
    })).subscribe(data => {
      this.establecerParametros(data[0].ID, data[0].Nombre, data[0].Concepto, data[0].Valor, data[0].Impuesto, data[0].Total, data[0].ID_Consultorio);
    })
  }

  obtenerConsultoriosAlquilados = () => {
    this.qService.ObtenerConsultoriosAlquilados().pipe(catchError((error: any) => {
      return [];
    })).subscribe(data => {
      this.consultorios = data
    })
  }

  insertarCobroConsultorio = () => {
    this.pService.InsertarCobroConsultorio(this.Nombre, this.Concepto, this.Valor, this.Impuesto, this.Total, this.ID_Consultorio).pipe(
      catchError((error: any) => {
        this.toastService.error("Error Interno");
        return [];
      })
    ).subscribe(data => {
      this.obtenerCobroConsultorios()
      this.toastService.success("Cobro Creado Correctamente");
    })
  }

  actualizarCobroConsultorio = () => {
    this.pService.ActualizarCobroConsultorio(this.ID, this.Nombre, this.Concepto, this.Valor, this.Impuesto, this.Total, this.ID_Consultorio).pipe(
      catchError((error: any) => {
        this.toastService.error("Error Interno");
        return [];
      })
    ).subscribe(data => {
      this.obtenerCobroConsultorios()
      this.toastService.success("Cobro Creado Correctamente");
      this.seleccionCobroConsultorio.clear();
    })
  }

  eliminarCobroConsultorio = () => {
    console.log(Array.from(this.seleccionCobroConsultorio.values())[0])
    const { ID } = Array.from(this.seleccionCobroConsultorio.values())[0];
    this.pService.EliminarCobroConsultorio(ID).pipe(
      catchError((error: any) => {
        this.toastService.error("Error Interno");
        return [];
      })
    ).subscribe(data => {
      this.obtenerCobroConsultorios()
      this.toastService.success("Cobro Eliminado Correctamente");
      this.seleccionCobroConsultorio.clear();
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

  establecerParametros(ID: any, Nombre: any, Concepto: any, Valor: any, Impuesto: any, Total: any, ID_Consultorio: any) {
    this.ID = ID
    this.Nombre = Nombre
    this.Concepto = Concepto
    this.Valor = Valor
    this.Impuesto = Impuesto
    this.Total = Total
    this.ID_Consultorio = ID_Consultorio
  }

}
