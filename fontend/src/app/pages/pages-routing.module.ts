import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '@pages/main/main.component';
import { MedicoComponent } from './medico/medico.component';
import { HabitacionComponent } from './habitacion/habitacion.component';
import { QuirofanoComponent } from './quirofano/quirofano.component';
import { PacienteComponent } from './paciente/paciente.component';
import { ConsultaComponent } from './consulta/consulta.component';

const routes: Routes = [
  {
    path: 'main', component: MainComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'medico', component: MedicoComponent, pathMatch: 'full' },
      { path: 'habitacion', component: HabitacionComponent, pathMatch: 'full' },
      { path: 'quirofano', component: QuirofanoComponent, pathMatch: 'full' },
      { path: 'paciente', component: PacienteComponent, pathMatch: 'full' },
      { path: 'consulta', component: ConsultaComponent, pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
