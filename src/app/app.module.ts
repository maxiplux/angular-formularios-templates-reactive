import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplatesComponent } from './pages/templates/templates.component';
import { ReactiveComponent } from './pages/reactive/reactive.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { PrintErrorComponent } from './pages/reactive/print-error/print-error.component';


@NgModule({
  declarations: [
    AppComponent,
    TemplatesComponent,
    ReactiveComponent,
    PrintErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
