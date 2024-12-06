import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MedicoComponent } from './medico/medico.component';
import { HabitacionComponent } from './habitacion/habitacion.component';
import { QuirofanoComponent } from './quirofano/quirofano.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PacienteComponent } from './paciente/paciente.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { CamaComponent } from './cama/cama.component';
import { HospitalizacionComponent } from './hospitalizacion/hospitalizacion.component';
import { AtencionComponent } from './atencion/atencion.component';
import { CirugiaComponent } from './cirugia/cirugia.component';
import { ConsultorioComponent } from './consultorio/consultorio.component';
import { FacturaComponent } from './factura/factura.component';
import { CobroConsultorioComponent } from './cobro-consultorio/cobro-consultorio.component';
import { ChequeComponent } from './cheque/cheque.component';
import { PacientesAtendidosComponent } from './pacientes-atendidos/pacientes-atendidos.component';
import { InventarioComponent } from './inventario/inventario.component';
import { ResumenMedicosComponent } from './resumen-medicos/resumen-medicos.component';
import { ListComponentComponent } from './list/list-component.component';
import { EditarInventarioComponent } from '@pages/editar-inventario/editar-inventario.component';



@NgModule({
  declarations: [
    MainComponent,
    QuirofanoComponent,
    ConsultaComponent,
    HospitalizacionComponent,
    AtencionComponent,
    CirugiaComponent,
    ConsultorioComponent,
    FacturaComponent,
    CobroConsultorioComponent,
    ChequeComponent,
    PacientesAtendidosComponent,
    InventarioComponent,
    ResumenMedicosComponent,
    EditarInventarioComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ToastrModule.forRoot(),
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    MedicoComponent,
    ListComponentComponent,
    HabitacionComponent,
    PacienteComponent,
    CamaComponent
  ]
})
export class PagesModule { }
