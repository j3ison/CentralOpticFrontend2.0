import { Component } from '@angular/core';
import { MyDataServices } from 'src/app/auth/mydata.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {

  constructor(private mydataservices: MyDataServices) { }

  ngOnInit() {

    //Ejemplos del uso de los endpoint en la API con get

    this.mydataservices.getData("rol").subscribe((respuesta: any) => {

      console.log(respuesta)

    }, (error) => {

      console.log(error)
    }
    )

    this.mydataservices.getData("usuario").subscribe((respuesta: any) => {

      console.log(respuesta)

    }, (error) => {

      console.log(error)
    }
    )

    //Ejemplos del uso de los endpoint en la API con get para un valor del arreglo de Json en especifico

    this.mydataservices.getData("rol/1").subscribe((respuesta: any) => {

      console.log(respuesta)

    }, (error) => {

      console.log(error)
    }
    )

    this.mydataservices.getData("usuario/2").subscribe((respuesta: any) => {

      console.log(respuesta)

    }, (error) => {

      console.log(error)
    }
    )

  }

}
