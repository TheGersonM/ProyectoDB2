import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'app/service/global.service';
import { ProceduresService } from 'app/service/procedures.service';
import { QueriesService } from 'app/service/queries.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

declare var $:any;
@Component({
  selector: 'app-editar-inventario',
  templateUrl: './editar-inventario.component.html',
  styleUrls: ['./editar-inventario.component.sass']
})
export class EditarInventarioComponent implements OnInit {


  items: any[] = [];

  ID: any;
  categoria: any;
  Nombre: any;
  Stock: any;
  Precio: any;
  modoFormulario: 'insertar' | 'actualizar' = 'insertar';


  seleccionItem: Set<any> = new Set();

  constructor(
    private pService: ProceduresService,
    private qService: QueriesService,
    private globalService: GlobalService,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    this.obtenerItems()
  }

  obtenerItems = () => {
    this.qService.VistaInventario().pipe(catchError((error: any) => {
      this.toastService.error("Error Interno");
      return [];
    })).subscribe(data => {
      this.items = data
    })
  }

  obteneritem = () => {
    const { ID, Categoria } = Array.from(this.seleccionItem.values())[0];
    this.qService.ObtenerItemInventario(ID, Categoria).pipe(catchError((error: any) => {
      this.toastService.error("Error Interno");
      return [];
    })).subscribe(data => {
      this.establecerParametros(data[0].ID, data[0].categoria, data[0].Nombre, data[0].Stock, data[0].Precio);
    })
  }
  //#region Insertar quirófano
  insertarItem = () => {
    this.pService.CrearItemInventario(this.categoria, this.Nombre, this.Stock, this.Precio).pipe(
      catchError((error: any) => {
        this.toastService.error("Error Interno");
        return [];
      })
    ).subscribe(data => {
      this.seleccionItem.clear();
      this.toastService.success("Se ha insertado el Item");
      this.obtenerItems(); // Refrescar la lista de quirófanos
      this.cerrarModal(); // Llamar al método para cerrar el modal
    });
  }
  // #region Actualizar quirófano
  actualizarItem = () => {
    this.pService.EditarItemInventario(this.ID, this.Nombre, this.categoria, this.Stock, this.Precio).pipe(
      catchError((error: any) => {
        this.toastService.error("Error Interno");
        return [];
      })
    ).subscribe(data => {
      this.seleccionItem.clear();
      this.toastService.success("Se ha actualizado el Quirofano");
      this.obtenerItems(); // Refrescar la lista de quirófanos
      this.cerrarModal(); // Llamar al método para cerrar el modal
    });
  }
  
  cerrarModal() {
    $('#medic').modal('hide'); // Cerrar el modal con jQuery
  }

  eliminarItem = () => {
    const { ID, Categoria } = Array.from(this.seleccionItem.values())[0];
    this.pService.EliminarItemInventario(ID, Categoria).pipe(
      catchError((error: any) => {
        this.toastService.error("Error Interno");
        return [];
      })
    ).subscribe(data => {
      this.seleccionItem.clear();
      this.toastService.success("Se ha eliminado el item");
      this.obtenerItems();
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

  establecerParametros = (ID: any, Categoria: any, Nombre: any, Stock: any, Precio: any) => {
    this.ID = ID;
    this.categoria = Categoria;
    this.Nombre = Nombre;
    this.Stock = Stock;
    this.Precio = Precio;
    
  }
  abrirModal(modo: 'insertar' | 'actualizar') {
    this.modoFormulario = modo;
  
    if (modo === 'insertar') {
      // Limpiar el formulario
      this.categoria = '';
      this.Nombre = '';
      this.Stock = '';
      this.Precio = '';
    } else if (modo === 'actualizar') {
      this.ID = this.obteneritem();
      // Cargar los datos del quirófano seleccionado
      const seleccionado = Array.from(this.seleccionItem.values())[0];
      if (seleccionado) {
        this.categoria = seleccionado.categoria;
        this.Nombre = seleccionado.Nombre;
        this.Stock = seleccionado.Stock;
        this.Precio = seleccionado.Precio;
      }
    }
  }
  

}
