import { Component, OnInit } from '@angular/core';
import { NavController , LoadingController} from 'ionic-angular';
import { ObtenerVehiculoProvider } from '../../providers/obtener-vehiculo/obtener-vehiculo';
import { Vehiculo } from '../../models/vehiculo.interface';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  
  data
  soapSwitch: string;
  public comprarSoap: FormGroup;
  vehiculo: Vehiculo;
  constructor(public navCtrl: NavController, public obtenerVehiculo:ObtenerVehiculoProvider,     
    private loadingCtrl: LoadingController,) { 
    
    this.soapSwitch = "paso1";
    this.vehiculo = new Vehiculo();
  }

  ngOnInit() {
    this.comprarSoap = new FormGroup({
      rut: new FormControl('', Validators.compose([Validators.required])),
      patente: new FormControl('', Validators.compose([Validators.required])),
      ano_fab: new FormControl('', Validators.compose([Validators.required])),
      marca: new FormControl('', Validators.compose([Validators.required])),
      modelo: new FormControl('', Validators.compose([Validators.required])),
      nro_motor: new FormControl('', Validators.compose([Validators.required])),
    });
  }
  
  ionViewDidLoad(){

  }
  siguiente(vehiculo: Vehiculo, isValid: boolean) {
    let cargandoCmp = this.loadingCtrl.create({ content: 'Procesando petición...' });


    console.log("form valido:" + isValid);
    if (this.soapSwitch == "paso1") {
      /*
        var rutSinDigito = this.cliente.rut.substr(0, this.cliente.rut.length - 1);
        var digitoVerificador = this.cliente.rut.charAt(this.cliente.rut.length - 1).toUpperCase();
        */
        cargandoCmp.present();
        this.obtenerVehiculo.obtenerDatos( this.vehiculo.rut , this.vehiculo.patente )
        .subscribe(
          (data) => {
            console.log(" ban1" + data['body']['data']);
            this.data = data['body']['data'];
            let v =  this.data;
            console.log(" ban2" + v.Ano_Fab);
            console.log(" ban3" + data['body']['data'][0].Ano_Fab);
           this.vehiculo.ano_fab =  data['body']['data'][0].Ano_Fab;
           this.vehiculo.modelo =  data['body']['data'][0].Modelo;
           this.vehiculo.marca =  data['body']['data'][0].Marca;
           this.vehiculo.nro_motor =  data['body']['data'][0].Nro_Motor;
           cargandoCmp.dismissAll();
           this.soapSwitch = "paso2";
          },
          (error) => {console.log(error);}
        )
      
    } else

      if (this.soapSwitch == "paso2") {
      /*  if (this.validaPaso2()) {
          this.soapSwitch = "paso3";
        } else {
         //this.showToast("bottom", "Datos requeridos, favor revisar " + this.msgValidaPaso2);
        }*/
      }
  }
}
