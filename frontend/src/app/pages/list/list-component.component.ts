import { Component } from '@angular/core';
import { MedicoComponent } from '@pages/medico/medico.component';

@Component({
  selector: 'app-list-component',
  standalone: true,
  imports: [MedicoComponent],
  template: `<section >
    <app-medico></app-medico>
  </section>`,
  styleUrls: ['./list-component.component.sass']

})
export class ListComponentComponent {

}
