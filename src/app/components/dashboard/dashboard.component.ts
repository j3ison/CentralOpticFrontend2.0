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

interface Graphics{
  labels: string[];
  count: number[];
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
  BestSellersG: Graphics = {
    labels:[],
    count:[]
  }
  LessSoldsG: Graphics = {
    labels:[],
    count:[]
  }


  BestSellersCode: Est.SellProducts[] = []
  LessSoldCode: Est.SellProducts[] = []

  CurrentClient: Est.CurrentClient[] = []
  CurrentClientG: Graphics = {
    labels:[],
    count:[]
  }


  CurrentPatient: Est.CurrentPatient[] = []
  CurrentPatientG: Graphics = {
    labels:[],
    count:[]
  }
  CurrentPatienAge: Est.CurrentPatienAge[] = []
  CurrentPatienAgeG: Graphics = {
    labels:[],
    count:[]
  }

  MostCurrentSupplier: Est.CurrentSupplier[] = []
  MostCurrentSupplierG: Graphics = {
    labels:[],
    count:[]
  }
  LessCurrentSupplier: Est.CurrentSupplier[] = []
  LessCurrentSupplierG: Graphics = {
    labels:[],
    count:[]
  }

  MostPurchasedProducts: Est.PurchasedProducts[] = []
  MostPurchasedProductsG: Graphics = {
    labels:[],
    count:[]
  }
  LessPurchasedProducts: Est.PurchasedProducts[] = []
  LessPurchasedProductsG: Graphics = {
    labels:[],
    count:[]
  }

  MostCurrentLab: Est.CurrentLab[] = []
  MostCurrentLabG: Graphics = {
    labels:[],
    count:[]
  }
  LessCurrentLab: Est.CurrentLab[] = []
  LessCurrentLabG: Graphics = {
    labels:[],
    count:[]
  }

  MostOrderedProduct: Est.OrderedProduct[] =[]
  MostOrderedProductG: Graphics = {
    labels:[],
    count:[]
  }
  LessOrderedProduct: Est.OrderedProduct[] =[]
  LessOrderedProductG: Graphics = {
    labels:[],
    count:[]
  }

  PreferredPaymentType: Est.PreferredPaymentType[] =[]
  PreferredPaymentTypeG: Graphics = {
    labels:[],
    count:[]
  }
  BillsEmployee: Est.BillsEmployee[] = []
  BillsEmployeeG: Graphics = {
    labels:[],
    count:[]
  }
  ExamEyeEmployee: Est.ExamEyeEmployee[] = []
  ExamEyeEmployeeG: Graphics = {
    labels:[],
    count:[]
  }

  OrderEmployee: Est.OrderEmployee[] = []
  OrderEmployeeG: Graphics = {
    labels:[],
    count:[]
  }

  Benefits: Est.Benefits[] =[]
  AllBenefits: Est.AllBenefits[] =[]

  CurrentRoll:Est.CurrentRoll[] =[]
  CurrentRollG: Graphics = {
    labels:[],
    count:[]
  }


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
      this.BestSellersG.labels = this.BestSellers.map( producto => producto.descripcion)
      this.BestSellersG.count = this.BestSellers.map( producto => producto.total)

    }, (error) => {

      console.log(error)
    })

    this.mydataservices.postDataStatic("estadistica/productovendido/false", this.dateinputformat).subscribe((respuesta: any) => {

      this.LessSold = respuesta
      this.LessSoldsG.labels = this.LessSold.map( producto => producto.descripcion)
      this.LessSoldsG.count = this.LessSold.map( producto => producto.total)
 

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
      this.CurrentClientG.labels = this.CurrentClient.map( producto => producto.cliente)
      this.CurrentClientG.count = this.CurrentClient.map( producto => producto.veces_Facturadas)

    }, (error) => {

      console.log(error)
    })

  }

  LoadCurrentSupplier() {

    this.mydataservices.postDataStatic("estadistica/proveedorrecurrente/true", this.dateinputformat).subscribe((respuesta: any) => {

      this.MostCurrentSupplier = respuesta
      this.MostCurrentSupplierG.labels = this.MostCurrentSupplier.map( producto => producto.nombre_Empresa)
      this.MostCurrentSupplierG.count = this.MostCurrentSupplier.map( producto => producto.total_Productos)

    }, (error) => {

      console.log(error)
    })

    this.mydataservices.postDataStatic("estadistica/proveedorrecurrente/false", this.dateinputformat).subscribe((respuesta: any) => {

      this.LessCurrentSupplier = respuesta
      this.LessCurrentSupplierG.labels = this.LessCurrentSupplier.map( producto => producto.nombre_Empresa)
      this.LessCurrentSupplierG.count = this.LessCurrentSupplier.map( producto => producto.total_Productos)

    }, (error) => {

      console.log(error)
    })

  }

  LoadPurchasedProducts() {

    this.mydataservices.postDataStatic("estadistica/productoadquirido/true", this.dateinputformat).subscribe((respuesta: any) => {

      this.MostPurchasedProducts = respuesta
      this.MostPurchasedProductsG.labels = this.MostPurchasedProducts.map( producto => producto.descripcion)
      this.MostPurchasedProductsG.count = this.MostPurchasedProducts.map( producto => producto.total_Productos)

    }, (error) => {

      console.log(error)
    })

    this.mydataservices.postDataStatic("estadistica/productoadquirido/false", this.dateinputformat).subscribe((respuesta: any) => {

      this.LessPurchasedProducts = respuesta
      this.LessPurchasedProductsG.labels = this.LessPurchasedProducts.map( producto => producto.descripcion)
      this.LessPurchasedProductsG.count = this.LessPurchasedProducts.map( producto => producto.total_Productos)

    }, (error) => {

      console.log(error)
    })

  }

  LoadCurrentLab() {

    this.mydataservices.postDataStatic("estadistica/laboratoriorecurrente/true", this.dateinputformat).subscribe((respuesta: any) => {

      this.MostCurrentLab = respuesta
      this.MostCurrentLabG.labels = this.MostCurrentLab.map( producto => producto.nombre)
      this.MostCurrentLabG.count = this.MostCurrentLab.map( producto => producto.cantidad_Pedidos)


    }, (error) => {

      console.log(error)
    })

    this.mydataservices.postDataStatic("estadistica/laboratoriorecurrente/false", this.dateinputformat).subscribe((respuesta: any) => {

      this.LessCurrentLab = respuesta
      this.LessCurrentLabG.labels = this.LessCurrentLab.map( producto => producto.nombre)
      this.LessCurrentLabG.count = this.LessCurrentLab.map( producto => producto.cantidad_Pedidos)

    }, (error) => {

      console.log(error)
    })

  }

  LoadOrderedProduct() {

    this.mydataservices.postDataStatic("estadistica/productopedido/true", this.dateinputformat).subscribe((respuesta: any) => {

      this.MostOrderedProduct = respuesta
      this.MostOrderedProductG.labels = this.MostOrderedProduct.map( producto => producto.descripcion)
      this.MostOrderedProductG.count = this.MostOrderedProduct.map( producto => producto.veces_Pedidas)

    }, (error) => {

      console.log(error)
    })

    this.mydataservices.postDataStatic("estadistica/productopedido/false", this.dateinputformat).subscribe((respuesta: any) => {

      this.LessOrderedProduct = respuesta
      this.LessOrderedProductG.labels = this.LessOrderedProduct.map( producto => producto.descripcion)
      this.LessOrderedProductG.count = this.LessOrderedProduct.map( producto => producto.veces_Pedidas)

    }, (error) => {

      console.log(error)
    })

  }

  LoadCurrentPatient() {

    this.mydataservices.postDataStatic("estadistica/pacienterecurrente", this.dateinputformat).subscribe((respuesta: any) => {

      this.CurrentPatient = respuesta
      this.CurrentPatientG.labels = this.CurrentPatient.map( producto => producto.cliente)
      this.CurrentPatientG.count = this.CurrentPatient.map( producto => producto.examenes_Realizados)

    }, (error) => {

      console.log(error)
    })

  }

  LoadCurrentPatientAge() {

    this.mydataservices.postDataStatic("estadistica/edadrecurrente", this.dateinputformat).subscribe((respuesta: any) => {

      this.CurrentPatienAge = respuesta
      this.CurrentPatienAgeG.labels = this.CurrentPatienAge.map( producto => producto.edad.toString())
      this.CurrentPatienAgeG.count = this.CurrentPatienAge.map( producto => producto.cantidad_Pacientes)

    }, (error) => {

      console.log(error)
    })

  }

  LoadPreferredPaymentType() {

    this.mydataservices.postDataStatic("estadistica/tipopagopreferido", this.dateinputformat).subscribe((respuesta: any) => {

      this.PreferredPaymentType = respuesta
      this.PreferredPaymentTypeG.labels = this.PreferredPaymentType.map( producto => producto.tipo_Pago)
      this.PreferredPaymentTypeG.count = this.PreferredPaymentType.map( producto => producto.frecuencia_de_uso)

    }, (error) => {

      console.log(error)
    })

  }

  LoadBillsEmployee() {

    this.mydataservices.postDataStatic("estadistica/empleadofactura", this.dateinputformat).subscribe((respuesta: any) => {

      this.BillsEmployee = respuesta
      this.BillsEmployeeG.labels = this.BillsEmployee.map( producto => producto.empleado)
      this.BillsEmployeeG.count = this.BillsEmployee.map( producto => producto.facturas_Emitidas)

    }, (error) => {

      console.log(error)
    })

  }

  LoadExamEyeEmployee() {

    this.mydataservices.postDataStatic("estadistica/empleadoexamen", this.dateinputformat).subscribe((respuesta: any) => {

      this.ExamEyeEmployee = respuesta
      this.ExamEyeEmployeeG.labels = this.ExamEyeEmployee.map( producto => producto.empleado)
      this.ExamEyeEmployeeG.count = this.ExamEyeEmployee.map( producto => producto.examenes_Realizados)

    }, (error) => {

      console.log(error)
    })

  }

  LoadExamOrderEmployee() {

    this.mydataservices.postDataStatic("estadistica/empleadoorden", this.dateinputformat).subscribe((respuesta: any) => {

      this.OrderEmployee = respuesta
      this.OrderEmployeeG.labels = this.OrderEmployee.map( producto => producto.empleado)
      this.OrderEmployeeG.count = this.OrderEmployee.map( producto => producto.pedidos_Realizados)

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
      this.CurrentRollG.labels = this.CurrentRoll.map( producto => producto.rol)
      this.CurrentRollG.count = this.CurrentRoll.map( producto => producto.cantidad_Usuarios)

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
