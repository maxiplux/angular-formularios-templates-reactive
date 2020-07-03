import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
// can return any number of keys type bool or string
interface ErrorValidate {
  [s: string]: boolean|string ;

}


@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  existeUsuario( control: FormControl ): Promise<ErrorValidate> | Observable<ErrorValidate> {

    if ( !control.value ) {
      return Promise.resolve(null);
    }

    return new Promise( (resolve, reject) => {

      setTimeout(() => {

        if ( control.value === 'mosquera' ) {
          resolve({
            status: true,
            msg: `Usuario ${control.value} asincrono existe `

          });
        } else {
          resolve( null );
        }

      }, 3500);


    });

  }


  validBussinesName( control: FormControl ): ErrorValidate {

    if ( control.value?.toLowerCase() === 'juan' ){
      return {
        status: true,
        msg: `Usuario ${control.value} sincrono existe`
      };
    }

    return null;
  }


  passwordsIguales( pass1Name: string, pass2Name: string ) {

    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];

      if ( pass1Control.value === pass2Control.value ) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }

    };

  }

  passwordMatchValidator(g: FormGroup) {
    // learning ractivive  forms for 2020
    if (g.controls.pass1.value === g.controls.pass2.value){
      return  null;
    }
    g.controls.pass1.setErrors({status: true, msg: 'Fallo en password 1'});
    g.controls.pass2.setErrors({status: true, msg: 'Fallo en password2'});
    return {status: true, msg: 'Los passwords no son iguales'};
  }


}
