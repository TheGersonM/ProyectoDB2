import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '@pages/main/main.component';
import { MedicoComponent } from './medico/medico.component';
import { HabitacionComponent } from './habitacion/habitacion.component';
import { QuirofanoComponent } from './quirofano/quirofano.component';
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

const routes: Routes = [
  {
    path: 'main', component: MainComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'medico', component: MedicoComponent, pathMatch: 'full' },
      { path: 'habitacion', component: HabitacionComponent, pathMatch: 'full' },
      { path: 'quirofano', component: QuirofanoComponent, pathMatch: 'full' },
      { path: 'paciente', component: PacienteComponent, pathMatch: 'full' },
      { path: 'consulta', component: ConsultaComponent, pathMatch: 'full' },
      { path: 'cama', component: CamaComponent, pathMatch: 'full' },
      { path: 'hospitalizacion', component: HospitalizacionComponent, pathMatch: 'full' },
      { path: 'atencion', component: AtencionComponent, pathMatch: 'full' },
      { path: 'cirugia', component: CirugiaComponent, pathMatch: 'full' },
      { path: 'consultorio', component: ConsultorioComponent, pathMatch: 'full' },
      { path: 'factura', component: FacturaComponent, pathMatch: 'full' },
      { path: 'cobroconsultorio', component: CobroConsultorioComponent, pathMatch: 'full' },
      { path: 'cheque', component: ChequeComponent, pathMatch: 'full' },
      { path: 'pacientesatendidos', component: PacientesAtendidosComponent, pathMatch: 'full' },
      { path: 'inventario', component: InventarioComponent, pathMatch: 'full' },
      { path: 'resumenmedicos', component: ResumenMedicosComponent, pathMatch: 'full' },
      { path: 'list', component: ListComponentComponent, pathMatch: 'full' }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
