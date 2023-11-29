import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'app/service/global.service';
import { ProceduresService } from 'app/service/procedures.service';
import { QueriesService } from 'app/service/queries.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.sass']
})
export class MedicoComponent implements OnInit {
  medicos: any[] = [];

  ID: any
  Nombre: any
  NumeroLicencia: any
  Especialidad: any

  seleccionMedico: Set<any> = new Set();

  constructor(
    private pService: ProceduresService,
    private qService: QueriesService,
    private globalService: GlobalService,
    private toastService: ToastrService
  ) { }


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

  obtenerMedico = () => {
    const { ID } = Array.from(this.seleccionMedico.values())[0];
    this.qService.ObtenerMedico(ID).pipe(catchError((error: any) => {
      this.toastService.error("Error Interno");
      return [];
    })).subscribe(data => {
      this.establecerParametos(data[0].ID, data[0].Nombre, data[0].NumeroLicencia, data[0].Especialidad);
    })
  }

  insertarMedico = () => {
    this.pService.InsertarMedico(this.Nombre, this.NumeroLicencia, this.Especialidad).pipe(
      catchError((error: any) => {
        this.toastService.error("Error Interno");
        return [];
      })
    )
      .subscribe(data => {
        this.toastService.success("Medico insertado");
        this.obtenerMedicos();
      })
  }

  eliminarMedico = () => {
    const { ID } = Array.from(this.seleccionMedico.values())[0];
    this.pService.EliminarMedico(ID).pipe(
      catchError((error: any) => {
        this.toastService.error("Error Interno");
        return [];
      }),
    ).subscribe(data => {
      this.toastService.success("Medico eliminado");
      this.seleccionMedico.clear();
      this.obtenerMedicos();
    })
  }

  actualizarMedico = () => {
    this.pService.ActualizarMedico(this.ID, this.Nombre, this.NumeroLicencia, this.Especialidad).pipe(
      catchError((error: any) => {
        this.toastService.error("Error Interno");
        return [];
      }),
    ).subscribe(data => {
      this.toastService.success("Medico actualizado");
      this.seleccionMedico.clear();
      this.obtenerMedicos();
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

  establecerParametos = (ID: any, Nombre: any, NumeroLicencia: any, Especialidad: any) => {
    this.ID = ID;
    this.Nombre = Nombre;
    this.NumeroLicencia = NumeroLicencia;
    this.Especialidad = Especialidad;
  }

}
