import { Component, HostListener, OnInit } from '@angular/core';
import { MyDataServices } from 'src/app/auth/mydata.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import * as Est  from './interfaces/Statistics';
import { AllBenefits } from './interfaces/Statistics';



interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  dateinputformat: Est.PostDate = {
    fechaInicial: "",
    fechaFinal: "",
    tipo_Producto: "Marcos"
  }

  Tipo_producto: string = "Marcos"

  BestSellers: Est.SellProducts[] = []
  LessSold: Est.SellProducts[] = []

  BestSellersCode: Est.SellProducts[] = []
  LessSoldCode: Est.SellProducts[] = []

  CurrentClient: Est.CurrentClient[] = []
  CurrentPatient: Est.CurrentPatient[] = []
  CurrentPatienAge: Est.CurrentPatienAge[] = []

  MostCurrentSupplier: Est.CurrentSupplier[] = []
  LessCurrentSupplier: Est.CurrentSupplier[] = []

  MostPurchasedProducts: Est.PurchasedProducts[] = []
  LessPurchasedProducts: Est.PurchasedProducts[] = []

  MostCurrentLab: Est.CurrentLab[] = []
  LessCurrentLab: Est.CurrentLab[] = []

  MostOrderedProduct: Est.OrderedProduct[] =[]
  LessOrderedProduct: Est.OrderedProduct[] =[]

  PreferredPaymentType: Est.PreferredPaymentType[] =[]
  BillsEmployee: Est.BillsEmployee[] = []
  ExamEyeEmployee: Est.ExamEyeEmployee[] = []
  OrderEmployee: Est.OrderEmployee[] = []

  Benefits: Est.Benefits[] =[]
  AllBenefits: Est.AllBenefits[] =[]

  CurrentRoll:Est.CurrentRoll[] =[]

  constructor(private mydataservices: MyDataServices) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    let fechaActual = new Date();
    fechaActual.setMonth(fechaActual.getMonth() - 12)

    this.dateinputformat.fechaInicial = this.GetFormateDate(fechaActual)
    this.dateinputformat.fechaFinal = this.GetFormateDate(new Date)

    console.log(this.dateinputformat.fechaInicial)
    console.log(this.dateinputformat.fechaFinal)

    this.LoadAll()

  }

  LoadProductsSelling() {

    this.mydataservices.postDataStatic("estadistica/productovendido/true", this.dateinputformat).subscribe((respuesta: any) => {

      this.BestSellers = respuesta

    }, (error) => {

      console.log(error)
    })

    this.mydataservices.postDataStatic("estadistica/productovendido/false", this.dateinputformat).subscribe((respuesta: any) => {

      this.LessSold = respuesta

    }, (error) => {

      console.log(error)
    })

  }

  LoadProductsSellingByCode() {

    this.mydataservices.postDataStatic("estadistica/productovendidoportipo/true", this.dateinputformat).subscribe((respuesta: any) => {

      this.BestSellersCode = respuesta

    }, (error) => {

      console.log(error)
    })

    this.mydataservices.postDataStatic("estadistica/productovendidoportipo/false", this.dateinputformat).subscribe((respuesta: any) => {

      this.LessSoldCode = respuesta

    }, (error) => {

      console.log(error)
    })

  }

  LoadCurrentClient() {

    this.mydataservices.postDataStatic("estadistica/clienterecurrente", this.dateinputformat).subscribe((respuesta: any) => {

      this.CurrentClient = respuesta

    }, (error) => {

      console.log(error)
    })

  }

  LoadCurrentSupplier() {

    this.mydataservices.postDataStatic("estadistica/proveedorrecurrente/true", this.dateinputformat).subscribe((respuesta: any) => {

      this.MostCurrentSupplier = respuesta

    }, (error) => {

      console.log(error)
    })

    this.mydataservices.postDataStatic("estadistica/proveedorrecurrente/false", this.dateinputformat).subscribe((respuesta: any) => {

      this.LessCurrentSupplier = respuesta

    }, (error) => {

      console.log(error)
    })

  }

  LoadPurchasedProducts() {

    this.mydataservices.postDataStatic("estadistica/productoadquirido/true", this.dateinputformat).subscribe((respuesta: any) => {

      this.MostPurchasedProducts = respuesta

    }, (error) => {

      console.log(error)
    })

    this.mydataservices.postDataStatic("estadistica/productoadquirido/false", this.dateinputformat).subscribe((respuesta: any) => {

      this.LessPurchasedProducts = respuesta

    }, (error) => {

      console.log(error)
    })

  }

  LoadCurrentLab() {

    this.mydataservices.postDataStatic("estadistica/laboratoriorecurrente/true", this.dateinputformat).subscribe((respuesta: any) => {

      this.MostCurrentLab = respuesta

    }, (error) => {

      console.log(error)
    })

    this.mydataservices.postDataStatic("estadistica/laboratoriorecurrente/false", this.dateinputformat).subscribe((respuesta: any) => {

      this.LessCurrentLab = respuesta

    }, (error) => {

      console.log(error)
    })

  }

  LoadOrderedProduct() {

    this.mydataservices.postDataStatic("estadistica/productopedido/true", this.dateinputformat).subscribe((respuesta: any) => {

      this.MostOrderedProduct = respuesta

    }, (error) => {

      console.log(error)
    })

    this.mydataservices.postDataStatic("estadistica/productopedido/false", this.dateinputformat).subscribe((respuesta: any) => {

      this.LessOrderedProduct = respuesta

    }, (error) => {

      console.log(error)
    })

  }

  LoadCurrentPatient() {

    this.mydataservices.postDataStatic("estadistica/pacienterecurrente", this.dateinputformat).subscribe((respuesta: any) => {

      this.CurrentPatient = respuesta

    }, (error) => {

      console.log(error)
    })

  }

  LoadCurrentPatientAge() {

    this.mydataservices.postDataStatic("estadistica/edadrecurrente", this.dateinputformat).subscribe((respuesta: any) => {

      this.CurrentPatienAge = respuesta

    }, (error) => {

      console.log(error)
    })

  }

  //Falta por poner en el HTML

  LoadPreferredPaymentType() {

    this.mydataservices.postDataStatic("estadistica/tipopagopreferido", this.dateinputformat).subscribe((respuesta: any) => {

      this.PreferredPaymentType = respuesta

    }, (error) => {

      console.log(error)
    })

  }

  LoadBillsEmployee() {

    this.mydataservices.postDataStatic("estadistica/empleadofactura", this.dateinputformat).subscribe((respuesta: any) => {

      this.BillsEmployee = respuesta

    }, (error) => {

      console.log(error)
    })

  }

  LoadExamEyeEmployee() {

    this.mydataservices.postDataStatic("estadistica/empleadoexamen", this.dateinputformat).subscribe((respuesta: any) => {

      this.ExamEyeEmployee = respuesta

    }, (error) => {

      console.log(error)
    })

  }

  LoadExamOrderEmployee() {

    this.mydataservices.postDataStatic("estadistica/empleadoorden", this.dateinputformat).subscribe((respuesta: any) => {

      this.OrderEmployee = respuesta

    }, (error) => {

      console.log(error)
    })

  }

  LoadBenefits() {

    this.mydataservices.postDataStatic("estadistica/beneficios", this.dateinputformat).subscribe((respuesta: any) => {

      this.Benefits = respuesta

    }, (error) => {

      console.log(error)
    })

  }

  LoadAllBenefits() {

    this.mydataservices.postDataStatic("estadistica/beneficiostotal", this.dateinputformat).subscribe((respuesta: any) => {

      this.AllBenefits = respuesta

    }, (error) => {

      console.log(error)
    })

  }

  LoadCurrentRoll() {

    this.mydataservices.getData("estadistica/rolrecurrente").subscribe((respuesta: any) => {

      this.CurrentRoll = respuesta

    }, (error) => {

      console.log(error)
    })

  }

// Funciones para cargar los datos automaticamente

  onDateChange1(event: any) {
    // Aquí puedes manejar el cambio de fecha
    //console.log('Fecha seleccionada:', event.value);
    this.dateinputformat.fechaInicial = event.value
    this.LoadAll()
    // Llama a otras funciones o realiza otras operaciones según sea necesario
  }

  onDateChange2(event: any) {
    // Aquí puedes manejar el cambio de fecha
    //console.log('Fecha seleccionada:', event.value);
    this.dateinputformat.fechaFinal = event.value
    this.LoadAll()
    
    //console.log(this.dateinputformat)
    // Llama a otras funciones o realiza otras operaciones según sea necesario
  }

// Funcion para obtener la fecha en string

  GetFormateDate(date: Date):string {

    let fechaActual = date;

    // Obtener los componentes de la fecha
    let año = fechaActual.getFullYear();
    let mes = fechaActual.getMonth() + 1; // getMonth() devuelve valores de 0 a 11, por eso sumamos 1
    let dia = fechaActual.getDate() + 1 ;
    let horas = 0;
    let minutos = 0;
    let segundos = 0;

    // Formatear la fecha según el formato "YYYY-MM-DDTHH:mm:ss"
    let fechaFormateada = `${año}-${padNumber(mes)}-${padNumber(dia)}T${padNumber(horas)}:${padNumber(minutos)}:${padNumber(segundos)}`;

    // Función para asegurarse de que los números tengan dos dígitos (agrega ceros a la izquierda si es necesario)
    function padNumber(num: number): string {
      return num.toString().padStart(2, '0');
    }

    //console.log(fechaFormateada); // Imprimir la fecha formateada en la consola

    return fechaFormateada
  }

//Funion para cargar todo

  LoadAll(){
    this.LoadProductsSelling()
    this.LoadProductsSellingByCode()
    this.LoadCurrentClient()
    this.LoadCurrentSupplier()
    this.LoadPurchasedProducts()
    this.LoadCurrentLab()
    this.LoadOrderedProduct()
    this.LoadCurrentPatient()
    this.LoadCurrentPatientAge()
    this.LoadPreferredPaymentType()
    this.LoadBillsEmployee()
    this.LoadExamEyeEmployee()
    this.LoadExamOrderEmployee()
    this.LoadBenefits()
    this.LoadAllBenefits()
    this.LoadCurrentRoll()

  }

}
