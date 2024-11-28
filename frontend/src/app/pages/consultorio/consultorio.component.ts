import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'app/service/global.service';
import { ProceduresService } from 'app/service/procedures.service';
import { QueriesService } from 'app/service/queries.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-consultorio',
  templateUrl: './consultorio.component.html',
  styleUrls: ['./consultorio.component.sass']
})
export class ConsultorioComponent implements OnInit {
  consultorios: any[] = [];
  medicos: any[] = [];

  ID: any;
  Nombre: any;
  ID_Medico: any;
  Tipo: any;

  seleccionConsultorio: Set<any> = new Set();

  constructor(
    private globalService: GlobalService,
    private qService: QueriesService,
    private pService: ProceduresService,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    this.obtenerConsultorios();
    this.obtenerMedicos();
  }

  obtenerConsultorios = () => {
    this.qService.ObtenerConsultorios().pipe(
      catchError((error: any) => {
        return [];
      })
    ).subscribe(data => {
      this.consultorios = data
    })
  }

  obtenerConsultorio = () => {
    const { ID } = Array.from(this.seleccionConsultorio.values())[0];
    this.qService.ObtenerConsultorio(ID).pipe(
      catchError((error: any) => {
        return [];
      })
    ).subscribe(data => {
      this.establecerParametros(data[0].ID, data[0].Nombre, data[0].ID_Medico, data[0].Tipo);
    })
  }

  obtenerMedicos = () => {
    this.qService.ObtenerMedicos().pipe(
      catchError((error: any) => {
        return [];
      })
    ).subscribe(data => {
      this.medicos = data
    })
  }

  insertarConsultorio = () => {
    this.pService.InsertarConsultorio(this.Nombre, this.ID_Medico, this.Tipo).pipe(
      catchError((error: any) => {
        this.toastService.error("Error Interno");
        return [];
      })
    ).subscribe(data => {
      this.toastService.success("Operacion Exitosa");
      this.obtenerConsultorios();
    })
  }

  actualizarConsultorio = () => {
    this.pService.ActualizarConsultorio(this.ID, this.Nombre, this.ID_Medico, this.Tipo).pipe(
      catchError((error: any) => {
        this.toastService.error("Error Interno");
        return [];
      })
    ).subscribe(data => {
      this.toastService.success("Operacion Exitosa");
      this.obtenerConsultorios();
      this.seleccionConsultorio.clear();
    })
  }

  eliminarConsultorio = () => {
    this.pService.EliminarConsultorio(this.ID).pipe(
      catchError((error: any) => {
        this.toastService.error("Error Interno");
        return [];
      })
    ).subscribe(data => {
      this.toastService.success("Operacion Exitosa");
      this.obtenerConsultorios();
      this.seleccionConsultorio.clear();
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

  establecerParametros = (ID: any, Nombre: any, ID_Medico: any, Tipo: any) => {
    this.ID = ID;
    this.Nombre = Nombre;
    this.ID_Medico = ID_Medico;
    this.Tipo = Tipo;
  }

}
