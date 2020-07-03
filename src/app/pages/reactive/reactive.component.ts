import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Usuario} from '../../User';
import {PaisesServicesService} from '../../services/paises-services.service';
import {ValidadoresService} from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  public reativeForm: FormGroup;

  usuario: Usuario;
  paises: any[];

  constructor(private  paisesServicesService: PaisesServicesService, private formBuilder: FormBuilder,
              private validadores: ValidadoresService
  ) {

    this.createReactiveForm();
    this.loadCountries();
    this.cargarDataAlFormulario();
    this.crearListeners();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('Do  submit', {reativeForm: this.reativeForm});
    console.log('Do  submit', {usuario: this.reativeForm.value});
    if (this.reativeForm.invalid) {

      return Object.values(this.reativeForm.controls).forEach(control => {

        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }


      });

    }
    // this is only to learn
    if (this.reativeForm.valid) {
      console.log('Do  submit', {usuario: this.reativeForm.value});


    }

  }

  private createReactiveForm() {

    // nombre: new FormControl({value: this.usuario.nombre, disabled: false}, [Validators.required]),
    // {value: this.usuario.pais, disabled: false}
    this.reativeForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, this.validadores.validBussinesName], [this.validadores.existeUsuario]),
      email: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(20)]),

      pais: new FormControl('', [Validators.required]),
      pass1   :  new FormControl(['', Validators.required ]),
      pass2   :  new FormControl(['', Validators.required ]),
      pasatiempos: this.formBuilder.array([]),

      direccion: this.formBuilder.group({
        distrito: ['', Validators.required ],
        ciudad  : ['', Validators.required ],
      }),


    }, {validators: this.validadores.passwordMatchValidator});


  }

  get nombreNoValido() {
    return this.reativeForm.get('nombre').invalid && this.reativeForm.get('nombre').touched;
  }


  crearListeners()
  {
    // this.forma.valueChanges.subscribe( valor => {
    //   console.log(valor);
    // });

    // this.forma.statusChanges.subscribe( status => console.log({ status }));
    this.reativeForm.get('nombre').valueChanges.subscribe( console.log );
  }


  get pass1NoValido() {
    return this.reativeForm.get('pass1').invalid && this.reativeForm.get('pass1').touched;
  }

  get pass2NoValido() {
    const pass1 = this.reativeForm.get('pass1').value;
    const pass2 = this.reativeForm.get('pass2').value;

    return ( pass1 === pass2 ) ? false : true;
  }

  get distritoNoValido() {
    return this.reativeForm.get('direccion.distrito').invalid && this.reativeForm.get('direccion.distrito').touched;
  }

  get ciudadNoValido() {
    return this.reativeForm.get('direccion.ciudad').invalid && this.reativeForm.get('direccion.ciudad').touched;
  }


  get pasatiempos() {
    return this.reativeForm.get('pasatiempos') as FormArray;
  }

  agregarPasatiempo() {
    this.pasatiempos.push(  this.formBuilder.control('')  );
  }

  borrarPasatiempo(i: number) {
    this.pasatiempos.removeAt(i);
  }


  cargarDataAlFormulario() {

    // this.forma.setValue({
    this.reativeForm.reset({
      nombre: 'pepjito',
      apellido: 'robo',
      correo: 'juan@juan.com',
      pass1: '123',
      pass2: '123',
      direccion: {
        distrito: 'valle',
        ciudad: 'cali'
      },
    });

  }



  private loadCountries() {
    this.paisesServicesService.getPaises().subscribe(paises => {
      this.paises = paises;
    });
  }
}
