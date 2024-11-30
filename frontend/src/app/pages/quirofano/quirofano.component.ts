import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'app/service/global.service';
import { ProceduresService } from 'app/service/procedures.service';
import { QueriesService } from 'app/service/queries.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

declare var $:any;
@Component({
  selector: 'app-quirofano',
  templateUrl: './quirofano.component.html',
  styleUrls: ['./quirofano.component.sass']
})
export class QuirofanoComponent implements OnInit {

  quirofanos: any[] = [];

  ID: any;
  Numero: any;
  Estado: any;

  seleccionQuirofano: Set<any> = new Set();

  constructor(
    private pService: ProceduresService,
    private qService: QueriesService,
    private globalService: GlobalService,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    this.obtenerQuirofanos()
  }

  obtenerQuirofanos = () => {
    this.qService.ObtenerQuirofanos().pipe(catchError((error: any) => {
      this.toastService.error("Error Interno");
      return [];
    })).subscribe(data => {
      this.quirofanos = data
    })
  }

  obtenerQuirofano = () => {
    const { ID } = Array.from(this.seleccionQuirofano.values())[0];
    this.qService.ObtenerQuirofano(ID).pipe(catchError((error: any) => {
      this.toastService.error("Error Interno");
      return [];
    })).subscribe(data => {
      this.establecerParametros(data[0].ID, data[0].Numero, data[0].Estado);
    })
  }
  //#region Insertar quirófano
  insertarQuirofano = () => {
    this.pService.InsertarQuirofano(this.Numero, this.Estado).pipe(
      catchError((error: any) => {
        this.toastService.error("Error Interno");
        return [];
      })
    ).subscribe(data => {
      this.seleccionQuirofano.clear();
      this.toastService.success("Se ha insertado el Quirofano");
      this.obtenerQuirofanos(); // Refrescar la lista de quirófanos
      this.cerrarModal(); // Llamar al método para cerrar el modal
    });
  }
  // #region Actualizar quirófano
  actualizarQuirofano = () => {
    this.pService.ActualizarQuirofano(this.ID, this.Numero, this.Estado).pipe(
      catchError((error: any) => {
        this.toastService.error("Error Interno");
        return [];
      })
    ).subscribe(data => {
      this.seleccionQuirofano.clear();
      this.toastService.success("Se ha actualizado el Quirofano");
      this.obtenerQuirofanos(); // Refrescar la lista de quirófanos
      this.cerrarModal(); // Llamar al método para cerrar el modal
    });
  }
  
  cerrarModal() {
    $('#medic').modal('hide'); // Cerrar el modal con jQuery
  }

  eliminarQuirofano = () => {
    const { ID } = Array.from(this.seleccionQuirofano.values())[0];
    this.pService.EliminarQuirofano(ID).pipe(
      catchError((error: any) => {
        this.toastService.error("Error Interno");
        return [];
      })
    ).subscribe(data => {
      this.seleccionQuirofano.clear();
      this.toastService.success("Se ha eliminado el Quirofano");
      this.obtenerQuirofanos();
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

  establecerParametros = (ID: any, Numero: any, Estado: any) => {
    this.ID = ID;
    this.Numero = Numero;
    this.Estado = Estado;
  }

}
