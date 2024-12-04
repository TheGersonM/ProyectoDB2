import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'app/service/global.service';
import { ProceduresService } from 'app/service/procedures.service';
import { QueriesService } from 'app/service/queries.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';


declare var $: any;
@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.sass']
})
export class FacturaComponent implements OnInit {

  facturas: any[] = []
  pacientes: any[] = []

  ID: any
  ID_Paciente: any
  Fecha: any
  Subtotal: any
  Impuesto: any
  Total: any
  FacturaDetalle: any[] = []

  atenciones: any[] = []

  seleccionFactura: Set<any> = new Set()
  seleccionDetalle: Set<any> = new Set()
  seleccionAtencion: Set<any> = new Set()
  edicionFila: Set<any> = new Set();
  edicion: any
  modoFormulario: 'insertar' | 'actualizar' = 'insertar'

  constructor(
    private toastService: ToastrService,
    private globalService: GlobalService,
    private qService: QueriesService,
    private pService: ProceduresService
  ) { }
  ngOnInit(): void {
    this.ObtenerFacturas()
    this.obtenerPacientes()
  }

  ObtenerFacturas = () => {
    this.qService.ObtenerFacturas().pipe(
      catchError((err) => {
        return [];
      })
    ).subscribe(data => {
      this.facturas = data
    })
  }

  obtenerFactura = () => {
    const { ID } = Array.from(this.seleccionFactura.values())[0];
    this.qService.ObtenerFactura(ID).pipe(
      catchError((err) => {
        return [];
      })
    ).subscribe(data => {
      this.qService.ObtenerFacturaDetalle(ID).pipe(
        catchError((error: any) => {
          return []
        })
      ).subscribe(rs => {
        this.EstablecerParametros(data[0].ID, data[0].ID_Paciente, data[0].Fecha, data[0].Subtotal, data[0].Impuesto, data[0].Total, rs)
      })

    })
  }

  obtenerPacientes = () => {
    this.qService.ObtenerPacientes().pipe(
      catchError((err) => {
        return [];
      })
    ).subscribe(data => {
      this.pacientes = data
    })
  }

  ObtenerAtencionesPorPaciente = () => {
    this.qService.ObtenerAtencionesPorPaciente(this.ID_Paciente).pipe(
      catchError((err) => {
        return [];
      })
    ).subscribe(data => {
      this.atenciones = data
    })
  }

  confirmarEdicion = (event: any) => {
    if (event.key === 'Enter') {
      this.edicionFila.clear()
      this.edicion = undefined
    }
  }

  insertarFactura = () => {
    this.pService.InsertarFactura(this.ID_Paciente, this.Fecha).pipe(
      catchError((err) => {
        return [];
      })
    ).subscribe(data => {
      this.insertarFacturaDetalle(data[1][0].ID, this.FacturaDetalle)
      
    })
  }

  insertarFacturaDetalle = (ID: any, FacturaDetalle: any) => {
    this.pService.InsertarFacturaDetalle(ID, FacturaDetalle).pipe(
      catchError((err) => {
        return [];
      })
    ).subscribe(data => {
      this.toastService.success("Factura Creada")
      this.ObtenerFacturas()
      this.seleccionFactura.clear()
      this.cerrarModal()
    })
  }

  actualizarFactura = () => {
    this.pService.ActualizarFactura(this.ID, this.ID_Paciente, this.Fecha).pipe(
      catchError((err) => {
        return [];
      })
    ).subscribe(data => {
      this.actualizarFacturaDetalle(this.ID, this.FacturaDetalle)
    })
  }

  actualizarFacturaDetalle = (ID: any, FacturaDetalle: any) => {
    this.pService.ActualizarFacturaDetalle(ID, FacturaDetalle).pipe(
      catchError((err) => {
        return [];
      })
    ).subscribe(data => {
      this.toastService.success("Factura Actualizada")
      this.ObtenerFacturas()
      this.obtenerFactura()
      this.seleccionDetalle.clear()
      this.seleccionFactura.clear()
      this.cerrarModal()
    })
  }

  eliminarFactura = () => {
    if(1==1)
      {
        this.toastService.error("Las facturas no se pueden eliminar")
        return 0;
      }else {
        return 0; 
      }
  }

  eliminarFacturaDetalle = (ID: any) => {
    if(1==1)
    {
      this.toastService.error("Las facturas no se pueden eliminar")
      return 0;
    }else {
      return 0; 
    }
  }
  agragerAtencionesAFactura = () => {
    this.FacturaDetalle = Array.from(new Set([...this.FacturaDetalle, ...this.seleccionAtencion])).map(atencion => {
      if (atencion.Detalle.startsWith('Cirugia')) {
        atencion.Precio = 1000;
      }
        else if (atencion.Detalle.startsWith('Cirugía')) {
          atencion.Precio = 1000;
      } else if (atencion.Detalle.startsWith('Consulta')) {
        atencion.Precio = 500;
      } else if (atencion.Detalle.startsWith('Hospitalizacion')) {
        atencion.Precio = 800;
      } else if (atencion.Detalle.startsWith('Hospitalización')) {
        atencion.Precio = 800;
      } else if (atencion.Detalle.startsWith('Atenciones')) {
        atencion.Precio = 200;
      } else {
        atencion.Precio = 1; // Valor por defecto si no coincide con ninguna condición
      }
      return atencion;
    });
    this.seleccionDetalle.clear();
    this.seleccionAtencion.clear();
  }
  
  //agragerAtencionesAFactura = () => {
    //this.FacturaDetalle = Array.from(new Set([...this.FacturaDetalle, ...this.seleccionAtencion]))
    //this.seleccionDetalle.clear()
   // this.seleccionAtencion.clear()
  //}

  seleccionarLinea = (set: Set<any>, obj: any, tipo: number) => {
    this.globalService.addLine(set, obj, tipo);
  }

  edicionLinea = (obj: any, celda: any) => {
    if (this.edicionFila.size == 0) {
      this.edicionFila.add(obj);
      this.edicion = celda
    }
  }

  validarEdicion = (tipo: number): boolean => {
    if (tipo == 1) {
      return true
    }
    return false
  }

  seleccionarTodo = (arr: any[], set: Set<any>) => {
    this.globalService.selectAll(arr, set);
  }

  removeLine = (arr: any[], set: Set<any>) => {
    this.globalService.removeLine(arr, set);
  }

  EstablecerParametros = (ID: any, ID_Paciente: any, Fecha: any, Subtotal: any, Impuesto: any, Total: any, FacturaDetalle: any) => {
    this.ID = ID
    this.ID_Paciente = ID_Paciente
    this.Fecha = Fecha
    this.Subtotal = Subtotal
    this.Impuesto = Impuesto
    this.Total = Total
    this.FacturaDetalle = FacturaDetalle
  }

  abrirModal = (modo: 'insertar' | 'actualizar') => {
    this.modoFormulario = modo;
    if (this.modoFormulario === 'insertar') {
      this.ID_Paciente = '';
      this.Fecha = '';
      this.Subtotal = '';
      this.Impuesto = '';
      this.Total = '';
      this.FacturaDetalle = [];
      
    } else if (this.modoFormulario === 'actualizar') {
      const seleccionado = Array.from(this.seleccionFactura.values())[0];
      if (seleccionado) {
        this.ID = seleccionado.ID;
        this.ID_Paciente = seleccionado.ID_Paciente;
        this.Fecha = seleccionado.Fecha;
        this.Subtotal = seleccionado.Subtotal;
        this.Impuesto = seleccionado.Impuesto;
        this.Total = seleccionado.Total;
        this.obtenerFactura()
      }
    }
  };

  cerrarModal() {
    $('#medic').modal('hide');
  }

}
