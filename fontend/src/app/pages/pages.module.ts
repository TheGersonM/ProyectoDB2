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



@NgModule({
  declarations: [
    MainComponent,
    MedicoComponent,
    HabitacionComponent,
    QuirofanoComponent,
    PacienteComponent,
    ConsultaComponent,
    CamaComponent,
    HospitalizacionComponent,
    AtencionComponent,
    CirugiaComponent,
    ConsultorioComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ToastrModule.forRoot(),
    RouterModule,
    FormsModule,
    BrowserAnimationsModule
  ]
})
export class PagesModule { }
