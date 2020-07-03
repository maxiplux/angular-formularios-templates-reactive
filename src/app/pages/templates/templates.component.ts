import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {PaisesServicesService} from '../../services/paises-services.service';
import {Usuario} from '../../User';


@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {

  usuario: Usuario;
  paises: any[];
  constructor(private  paisesServicesService: PaisesServicesService) { }

  ngOnInit(): void {
    this.createUser();
    this.loadCountries();
  }

  submit(forma: NgForm) {
    console.log('Do  submit', {forma});
  }

  private loadCountries() {
    this.paisesServicesService.getPaises().subscribe( paises => {
      this.paises = paises;

    });
  }

  private createUser() {
    this.usuario = { nombre: 'juan', email: 'juan@juan.com', apellido: 'apielie', pais: 'wakanda'};
  }
}
