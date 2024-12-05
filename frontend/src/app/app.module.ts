import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { HttpClientModule } from '@angular/common/http';
import { GridModule, PagerModule } from '@syncfusion/ej2-angular-grids';
import { InventarioComponent } from './pages/inventario/inventario.component';

@NgModule({
  declarations: [
    AppComponent,
    InventarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    HttpClientModule,
    GridModule, PagerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
