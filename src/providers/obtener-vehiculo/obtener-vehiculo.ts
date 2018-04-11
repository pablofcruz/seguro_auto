import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ObtenerVehiculoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ObtenerVehiculoProvider {

  url : string;
  
  constructor(public http: HttpClient) {
    console.log('Hello ObtenerVehiculoProvider Provider');
    this.url = 'https://api.us.apiconnect.ibmcloud.com/app-mobile-consorcio-prod/desarrolladores/obtenervehiculo/getDatos';
  }
  obtenerDatos( rut: String , patente : String){

    var params =  
      { header: { token: 'tokentoken' },
      request: { patente: patente, rutPagador: rut } }
    ;

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json')
    .set('X-IBM-Client-Id','aaaeec6d-c779-4021-bee7-ae76d4de8561')
    .set('X-IBM-Client-Secret', 'jG3oR4lK2nY2wX6oF4cM2aQ8dY3pQ4sL4lA3xU8qD6xM7fY6oN');

    //let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
	
    return this.http.post(this.url, params, { headers: headers  } );
  }
}
