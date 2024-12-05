import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'app/service/global.service';
import { ProceduresService } from 'app/service/procedures.service';
import { QueriesService } from 'app/service/queries.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';


declare var $: any;
@Component({
  selector: 'app-cobro-consultorio',
  templateUrl: './cobro-consultorio.component.html',
  styleUrls: ['./cobro-consultorio.component.sass']
})
export class CobroConsultorioComponent implements OnInit {
  cobroConsultorios: any[] = [];
  consultorios: any[] = [];
  medicos: any[] = []

  ID: any
  ID_Medico: any
  Concepto: any
  Valor: any
  Impuesto: any
  Total: any
  ID_Consultorio: any
  modoFormulario: 'insertar' | 'actualizar' = 'insertar'; 

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
    this.ObtenerMedicosExternos();
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

  ObtenerMedicosExternos = () => {
    this.qService.ObtenerMedicosExternos().pipe(catchError((error: any) => {
      return [];
    })).subscribe(data => {
      this.medicos = data
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
    this.pService.InsertarCobroConsultorio(this.ID_Medico, this.Concepto, this.Valor, this.Impuesto, this.Total, this.consultorios[0].ID).pipe(
      catchError((error: any) => {
        this.toastService.error("Error Interno");
        return [];
      })
    ).subscribe(data => {
      this.obtenerCobroConsultorios()
      this.toastService.success("Cobro Creado Correctamente");
      this.seleccionCobroConsultorio.clear();
      this.cerraModal();
    })
  }

  actualizarCobroConsultorio = () => {
    this.pService.ActualizarCobroConsultorio(this.ID, this.ID_Medico, this.Concepto, this.Valor, this.Impuesto, this.Total, this.ID_Consultorio).pipe(
      catchError((error: any) => {
        this.toastService.error("Error Interno");
        return [];
      })
    ).subscribe(data => {
      this.obtenerCobroConsultorios()
      this.toastService.success("Cobro actualizado Correctamente");
      this.seleccionCobroConsultorio.clear();
      this.cerraModal();
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

  establecerParametros(ID: any, ID_Medico: any, Concepto: any, Valor: any, Impuesto: any, Total: any, ID_Consultorio: any) {
    this.ID = ID
    this.ID_Medico = ID_Medico
    this.Concepto = Concepto
    this.Valor = Valor
    this.Impuesto = Impuesto
    this.Total = Total
    this.ID_Consultorio = ID_Consultorio
  }

  OnMedicoChange = (ID_Medico: any) => {
    this.ID_Medico = ID_Medico
    this.toastService.success("Medico Seleccionado " + ID_Medico);
    this.ObtenerConsultorioPorMedico(ID_Medico);
  }
  
  ObtenerConsultorioPorMedico = (ID_Medico: number) => {
    this.qService
      .ObtenerConsultorioPorMedico(ID_Medico)
      .pipe(
        catchError((error: any) => {
          this.toastService.error('Seleccione al medico primero', 'Error Interno');
          return [];
        })
      )
      .subscribe((data) => {
        this.consultorios = data;
        if (this.consultorios.length > 0) {
          this.ID = data[0].ID // Establecer el primer médico como seleccionado
        } 
      });
  };
  abrirModal = (modo: 'insertar' | 'actualizar') => {
    this.modoFormulario = modo;
    if (this.modoFormulario === 'insertar') {
      this.ID_Medico = '';
      this.Concepto = '';
      this.Valor = '';
      this.Impuesto = '';
      this.Total = '';
      this.ID_Consultorio = '';
      
    } else if (this.modoFormulario === 'actualizar') {
      const seleccionado = Array.from(this.seleccionCobroConsultorio.values())[0];
      if (seleccionado) {
        this.ID = seleccionado.ID;
        this.ID_Medico = seleccionado.ID_Medico;
        this.Concepto = seleccionado.Concepto;
        this.Valor = seleccionado.Valor;
        this.Impuesto = seleccionado.Impuesto;
        this.Total = seleccionado.Total;
        this.ID_Consultorio = seleccionado.ID_Consultorio;
      }
    }
  };

  cerraModal = () => {
    $('#medic').modal('hide');
  }

}
