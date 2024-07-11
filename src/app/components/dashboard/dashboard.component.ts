import { Component, HostListener, OnInit } from '@angular/core';
import { MyDataServices } from 'src/app/auth/mydata.service';
import * as Est from './interfaces/Statistics';
import { CookieService } from 'ngx-cookie-service';
import { LoginUser } from 'src/app/auth/model/user.interface';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

interface Graphics {
  labels: string[];
  count: number[];
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  userFromLocal = this.cookieService.get('userData');
  user: LoginUser = JSON.parse(this.userFromLocal) as LoginUser

  dateinputformat: Est.PostDate = {
    fechaInicial: "",
    fechaFinal: "",
    tipo_Producto: "Marcos"
  }

  Tipo_producto: string = "Marcos"

  BestSellers: Est.SellProducts[] = []
  LessSold: Est.SellProducts[] = []
  BestSellersG: Graphics = {
    labels: [],
    count: []
  }
  LessSoldsG: Graphics = {
    labels: [],
    count: []
  }


  BestSellersCode: Est.SellProducts[] = []
  LessSoldCode: Est.SellProducts[] = []

  CurrentClient: Est.CurrentClient[] = []
  CurrentClientG: Graphics = {
    labels: [],
    count: []
  }


  CurrentPatient: Est.CurrentPatient[] = []
  CurrentPatientG: Graphics = {
    labels: [],
    count: []
  }
  CurrentPatienAge: Est.CurrentPatienAge[] = []
  CurrentPatienAgeG: Graphics = {
    labels: [],
    count: []
  }

  MostCurrentSupplier: Est.CurrentSupplier[] = []
  MostCurrentSupplierG: Graphics = {
    labels: [],
    count: []
  }
  LessCurrentSupplier: Est.CurrentSupplier[] = []
  LessCurrentSupplierG: Graphics = {
    labels: [],
    count: []
  }

  MostPurchasedProducts: Est.PurchasedProducts[] = []
  MostPurchasedProductsG: Graphics = {
    labels: [],
    count: []
  }
  LessPurchasedProducts: Est.PurchasedProducts[] = []
  LessPurchasedProductsG: Graphics = {
    labels: [],
    count: []
  }

  MostCurrentLab: Est.CurrentLab[] = []
  MostCurrentLabG: Graphics = {
    labels: [],
    count: []
  }
  LessCurrentLab: Est.CurrentLab[] = []
  LessCurrentLabG: Graphics = {
    labels: [],
    count: []
  }

  MostOrderedProduct: Est.OrderedProduct[] = []
  MostOrderedProductG: Graphics = {
    labels: [],
    count: []
  }
  LessOrderedProduct: Est.OrderedProduct[] = []
  LessOrderedProductG: Graphics = {
    labels: [],
    count: []
  }

  PreferredPaymentType: Est.PreferredPaymentType[] = []
  PreferredPaymentTypeG: Graphics = {
    labels: [],
    count: []
  }
  BillsEmployee: Est.BillsEmployee[] = []
  BillsEmployeeG: Graphics = {
    labels: [],
    count: []
  }
  ExamEyeEmployee: Est.ExamEyeEmployee[] = []
  ExamEyeEmployeeG: Graphics = {
    labels: [],
    count: []
  }

  OrderEmployee: Est.OrderEmployee[] = []
  OrderEmployeeG: Graphics = {
    labels: [],
    count: []
  }

  Benefits: Est.Benefits[] = []
  AllBenefits: Est.AllBenefits[] = []

  CurrentRoll: Est.CurrentRoll[] = []
  CurrentRollG: Graphics = {
    labels: [],
    count: []
  }


  constructor(private mydataservices: MyDataServices, private cookieService: CookieService) {
  }

  ngOnInit(): void {

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    let fechaActual = new Date();
    fechaActual.setMonth(fechaActual.getMonth() - 12)

    this.dateinputformat.fechaInicial = Est.GetFormateDate(fechaActual)
    this.dateinputformat.fechaFinal = Est.GetFormateDate(new Date)

    console.log(this.dateinputformat.fechaInicial)
    console.log(this.dateinputformat.fechaFinal)

    this.LoadAll()

  }

  LoadProductsSelling() {

    this.mydataservices.postDataStatic("estadistica/productovendido/true", this.dateinputformat).subscribe((respuesta: any) => {

      this.BestSellers = respuesta
      this.BestSellersG.labels = this.BestSellers.map(producto => producto.descripcion)
      this.BestSellersG.count = this.BestSellers.map(producto => producto.total)

    }, (error) => {

      console.log(error)
    })

    this.mydataservices.postDataStatic("estadistica/productovendido/false", this.dateinputformat).subscribe((respuesta: any) => {

      this.LessSold = respuesta
      this.LessSoldsG.labels = this.LessSold.map(producto => producto.descripcion)
      this.LessSoldsG.count = this.LessSold.map(producto => producto.total)


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
      this.CurrentClientG.labels = this.CurrentClient.map(producto => producto.cliente)
      this.CurrentClientG.count = this.CurrentClient.map(producto => producto.veces_Facturadas)

    }, (error) => {

      console.log(error)
    })

  }

  LoadCurrentSupplier() {

    this.mydataservices.postDataStatic("estadistica/proveedorrecurrente/true", this.dateinputformat).subscribe((respuesta: any) => {

      this.MostCurrentSupplier = respuesta
      this.MostCurrentSupplierG.labels = this.MostCurrentSupplier.map(producto => producto.nombre_Empresa)
      this.MostCurrentSupplierG.count = this.MostCurrentSupplier.map(producto => producto.total_Productos)

    }, (error) => {

      console.log(error)
    })

    this.mydataservices.postDataStatic("estadistica/proveedorrecurrente/false", this.dateinputformat).subscribe((respuesta: any) => {

      this.LessCurrentSupplier = respuesta
      this.LessCurrentSupplierG.labels = this.LessCurrentSupplier.map(producto => producto.nombre_Empresa)
      this.LessCurrentSupplierG.count = this.LessCurrentSupplier.map(producto => producto.total_Productos)

    }, (error) => {

      console.log(error)
    })

  }

  LoadPurchasedProducts() {

    this.mydataservices.postDataStatic("estadistica/productoadquirido/true", this.dateinputformat).subscribe((respuesta: any) => {

      this.MostPurchasedProducts = respuesta
      this.MostPurchasedProductsG.labels = this.MostPurchasedProducts.map(producto => producto.descripcion)
      this.MostPurchasedProductsG.count = this.MostPurchasedProducts.map(producto => producto.total_Productos)

    }, (error) => {

      console.log(error)
    })

    this.mydataservices.postDataStatic("estadistica/productoadquirido/false", this.dateinputformat).subscribe((respuesta: any) => {

      this.LessPurchasedProducts = respuesta
      this.LessPurchasedProductsG.labels = this.LessPurchasedProducts.map(producto => producto.descripcion)
      this.LessPurchasedProductsG.count = this.LessPurchasedProducts.map(producto => producto.total_Productos)

    }, (error) => {

      console.log(error)
    })

  }

  LoadCurrentLab() {

    this.mydataservices.postDataStatic("estadistica/laboratoriorecurrente/true", this.dateinputformat).subscribe((respuesta: any) => {

      this.MostCurrentLab = respuesta
      this.MostCurrentLabG.labels = this.MostCurrentLab.map(producto => producto.nombre)
      this.MostCurrentLabG.count = this.MostCurrentLab.map(producto => producto.cantidad_Pedidos)


    }, (error) => {

      console.log(error)
    })

    this.mydataservices.postDataStatic("estadistica/laboratoriorecurrente/false", this.dateinputformat).subscribe((respuesta: any) => {

      this.LessCurrentLab = respuesta
      this.LessCurrentLabG.labels = this.LessCurrentLab.map(producto => producto.nombre)
      this.LessCurrentLabG.count = this.LessCurrentLab.map(producto => producto.cantidad_Pedidos)

    }, (error) => {

      console.log(error)
    })

  }

  LoadOrderedProduct() {

    this.mydataservices.postDataStatic("estadistica/productopedido/true", this.dateinputformat).subscribe((respuesta: any) => {

      this.MostOrderedProduct = respuesta
      this.MostOrderedProductG.labels = this.MostOrderedProduct.map(producto => producto.descripcion)
      this.MostOrderedProductG.count = this.MostOrderedProduct.map(producto => producto.veces_Pedidas)

    }, (error) => {

      console.log(error)
    })

    this.mydataservices.postDataStatic("estadistica/productopedido/false", this.dateinputformat).subscribe((respuesta: any) => {

      this.LessOrderedProduct = respuesta
      this.LessOrderedProductG.labels = this.LessOrderedProduct.map(producto => producto.descripcion)
      this.LessOrderedProductG.count = this.LessOrderedProduct.map(producto => producto.veces_Pedidas)

    }, (error) => {

      console.log(error)
    })

  }

  LoadCurrentPatient() {

    this.mydataservices.postDataStatic("estadistica/pacienterecurrente", this.dateinputformat).subscribe((respuesta: any) => {

      this.CurrentPatient = respuesta
      this.CurrentPatientG.labels = this.CurrentPatient.map(producto => producto.cliente)
      this.CurrentPatientG.count = this.CurrentPatient.map(producto => producto.examenes_Realizados)

    }, (error) => {

      console.log(error)
    })

  }

  LoadCurrentPatientAge() {

    this.mydataservices.postDataStatic("estadistica/edadrecurrente", this.dateinputformat).subscribe((respuesta: any) => {

      this.CurrentPatienAge = respuesta
      this.CurrentPatienAgeG.labels = this.CurrentPatienAge.map(producto => {
        if (producto.edad === 0)
          return 'Sin edad registrada'
        else
          return producto.edad.toString()
      })
      this.CurrentPatienAgeG.count = this.CurrentPatienAge.map(producto => producto.cantidad_Pacientes)

    }, (error) => {

      console.log(error)
    })

  }

  LoadPreferredPaymentType() {

    this.mydataservices.postDataStatic("estadistica/tipopagopreferido", this.dateinputformat).subscribe((respuesta: any) => {

      this.PreferredPaymentType = respuesta
      this.PreferredPaymentTypeG.labels = this.PreferredPaymentType.map(producto => producto.tipo_Pago)
      this.PreferredPaymentTypeG.count = this.PreferredPaymentType.map(producto => producto.frecuencia_de_uso)

    }, (error) => {

      console.log(error)
    })

  }

  LoadBillsEmployee() {

    this.mydataservices.postDataStatic("estadistica/empleadofactura", this.dateinputformat).subscribe((respuesta: any) => {

      this.BillsEmployee = respuesta
      this.BillsEmployeeG.labels = this.BillsEmployee.map(producto => producto.empleado)
      this.BillsEmployeeG.count = this.BillsEmployee.map(producto => producto.facturas_Emitidas)

    }, (error) => {

      console.log(error)
    })

  }

  LoadExamEyeEmployee() {

    this.mydataservices.postDataStatic("estadistica/empleadoexamen", this.dateinputformat).subscribe((respuesta: any) => {

      this.ExamEyeEmployee = respuesta
      this.ExamEyeEmployeeG.labels = this.ExamEyeEmployee.map(producto => producto.empleado)
      this.ExamEyeEmployeeG.count = this.ExamEyeEmployee.map(producto => producto.examenes_Realizados)

    }, (error) => {

      console.log(error)
    })

  }

  LoadExamOrderEmployee() {

    this.mydataservices.postDataStatic("estadistica/empleadoorden", this.dateinputformat).subscribe((respuesta: any) => {

      this.OrderEmployee = respuesta
      this.OrderEmployeeG.labels = this.OrderEmployee.map(producto => producto.empleado)
      this.OrderEmployeeG.count = this.OrderEmployee.map(producto => producto.pedidos_Realizados)

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
      this.CurrentRollG.labels = this.CurrentRoll.map(producto => producto.rol)
      this.CurrentRollG.count = this.CurrentRoll.map(producto => producto.cantidad_Usuarios)

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

  //Funion para cargar todo

  LoadAll() {
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

  exportToExcel(Inf: any[], filename: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(Inf);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, filename);

  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  exportToPDF(Inf: any[], filename: string, format: boolean = false): void {
    let doc = new jsPDF.default()

    if (format) {
      doc = new jsPDF.default({
        orientation: 'landscape', // Orientación horizontal (paisaje)
        unit: 'mm', // Unidad de medida: milímetros
        format: 'a4' // Formato de página: A4
      });
    }

    const columns = this.generateHeaders(Inf);
    const rows = Inf.map(product => Object.values(product));
    const currentDate = new Date().toString();
    doc.setFont('arial');
    const docWidth = doc.internal.pageSize.width;
    const textoCentrado = 'CENTRAL OPTIC';
    const fontSize = 20;
    const textWidth = doc.getStringUnitWidth(textoCentrado) * fontSize / doc.internal.scaleFactor;
    let StartY = 10;
    doc.setFontSize(20);
    doc.text('CENTRAL OPTIC', (docWidth - textWidth) / 2, StartY);
    StartY = StartY + 10
    doc.setFontSize(12);
    doc.text(`Fecha de generacion del reporte: ${currentDate}`, 14, StartY);
    StartY = StartY + 10
    doc.text(`Informacion obtenida a partir del rango de fechas:`, 14, StartY);
    StartY = StartY + 10
    doc.text(`Fecha de inicio: ${this.dateinputformat.fechaInicial}`, 14, StartY);
    StartY = StartY + 10
    doc.text(`Fecha de fin: ${this.dateinputformat.fechaFinal} `, 14, StartY);
    StartY = StartY + 10


    if (format) {

      (doc as any).autoTable({
        head: [columns],
        body: rows,
        startY: StartY,
        styles: {
          fontSize: 8,
        },
        headStyles: {
          fontSize: 8,
          fontStyle: 'bold'
        }
      });

    }
    else {
      (doc as any).autoTable({
        head: [columns],
        body: rows,
        startY: StartY,
        styles: {
          fontSize: 10,
          cellWidth: 'wrap',
          valign: 'middle'
        },
        headStyles: {
          fontSize: 10,
          fontStyle: 'bold'
        }
      });
    }

    doc.save(filename);

  }

  exportToPDFAll() {
    const doc = new jsPDF.default({
      orientation: 'landscape', // Orientación horizontal (paisaje)
      unit: 'mm', // Unidad de medida: milímetros
      format: 'a4' // Formato de página: A4
    });

    const currentDate = new Date().toString();
    const docWidth = doc.internal.pageSize.width;
    const textoCentrado = 'CENTRAL OPTIC';
    const fontSize = 20;
    const textWidth = doc.getStringUnitWidth(textoCentrado) * fontSize / doc.internal.scaleFactor;
    let startY = 10;
    doc.setFont('arial');
    doc.setFontSize(20);
    doc.text('CENTRAL OPTIC', (docWidth - textWidth) / 2, startY);
    startY = startY + 10
    doc.setFontSize(12);
    doc.text(`Fecha de generacion del reporte: ${currentDate}`, 14, startY);
    startY = startY + 10
    doc.text(`Informacion obtenida a partir del rango de fechas:`, 14, startY);
    startY = startY + 10
    doc.text(`Fecha de inicio: ${this.dateinputformat.fechaInicial}`, 14, startY);
    startY = startY + 10
    doc.text(`Fecha de fin: ${this.dateinputformat.fechaFinal} `, 14, startY);
    startY = startY + 10

    doc.setFont('arial', 'bold');

    let columns = this.generateHeaders(this.BestSellers);
    let rows = this.BestSellers.map(product => Object.values(product));
    let finalY = 0

    if (this.user.role !== 'Optometrista') {

      doc.text('Productos/Servicios mas vendidos', 14, startY)
      startY = startY + 10;



      (doc as any).autoTable({
        head: [columns],
        body: rows,
        startY: startY,
        styles: {
          fontSize: 10,
          cellWidth: 'wrap', // Ajusta el ancho de la celda para ajustarse al contenido
          valign: 'middle' // Tamaño de letra para el contenido de la tabla
        },
        headStyles: {
          fontSize: 10,
          fontStyle: 'bold' // Tamaño de letra para los encabezados de la tabla
        }
      });

      finalY = (doc as any).autoTable.previous.finalY;

      startY = finalY + 10;

      if (startY > doc.internal.pageSize.height - 20) {
        doc.addPage();
        startY = 20; // Reiniciar startY en la nueva página
      }

      doc.text('Productos/Servicios menos vendidos', 14, startY)
      startY = startY + 10;

      columns = this.generateHeaders(this.LessSold);
      rows = this.LessSold.map(product => Object.values(product));


      (doc as any).autoTable({
        head: [columns],
        body: rows,
        startY: startY,
        styles: {
          fontSize: 10,
          cellWidth: 'wrap', // Ajusta el ancho de la celda para ajustarse al contenido
          valign: 'middle' // Tamaño de letra para el contenido de la tabla
        },
        headStyles: {
          fontSize: 10,
          fontStyle: 'bold' // Tamaño de letra para los encabezados de la tabla
        }
      });

      finalY = (doc as any).autoTable.previous.finalY;
      startY = finalY + 10;

      if (startY > doc.internal.pageSize.height - 20) {
        doc.addPage();
        startY = 20; // Reiniciar startY en la nueva página
      }
    }

    doc.text('Clientes mas recurrentes', 14, startY)
    startY = startY + 10;

    columns = this.generateHeaders(this.CurrentClient);
    rows = this.CurrentClient.map(product => Object.values(product));

    (doc as any).autoTable({
      head: [columns],
      body: rows,
      startY: startY,
      styles: {
        fontSize: 10,
        cellWidth: 'wrap', // Ajusta el ancho de la celda para ajustarse al contenido
        valign: 'middle' // Tamaño de letra para el contenido de la tabla
      },
      headStyles: {
        fontSize: 10,
        fontStyle: 'bold' // Tamaño de letra para los encabezados de la tabla
      }
    });

    finalY = (doc as any).autoTable.previous.finalY;

    startY = finalY + 10;

    if (startY > doc.internal.pageSize.height - 20) {
      doc.addPage();
      startY = 20; // Reiniciar startY en la nueva página
    }

    if (this.user.role !== 'Optometrista') {

      doc.text('Proveedores mas recurrentes', 14, startY)
      startY = startY + 10;

      columns = this.generateHeaders(this.MostCurrentSupplier);
      rows = this.MostCurrentSupplier.map(product => Object.values(product));
      // Tamaño de letra para el encabezado de la tabla


      (doc as any).autoTable({
        head: [columns],
        body: rows,
        startY: startY,
        styles: {
          fontSize: 10,
          cellWidth: 'wrap', // Ajusta el ancho de la celda para ajustarse al contenido
          valign: 'middle' // Tamaño de letra para el contenido de la tabla
        },
        headStyles: {
          fontSize: 10,
          fontStyle: 'bold' // Tamaño de letra para los encabezados de la tabla
        }
      });

      finalY = (doc as any).autoTable.previous.finalY;
      startY = finalY + 10;

      if (startY > doc.internal.pageSize.height - 20) {
        doc.addPage();
        startY = 20; // Reiniciar startY en la nueva página
      }

      doc.text('Proveedores menos recurrentes', 14, startY)
      startY = startY + 10;

      columns = this.generateHeaders(this.LessCurrentSupplier);
      rows = this.LessCurrentSupplier.map(product => Object.values(product));
      // Tamaño de letra para el encabezado de la tabla


      (doc as any).autoTable({
        head: [columns],
        body: rows,
        startY: startY,
        styles: {
          fontSize: 10,
          cellWidth: 'wrap', // Ajusta el ancho de la celda para ajustarse al contenido
          valign: 'middle' // Tamaño de letra para el contenido de la tabla
        },
        headStyles: {
          fontSize: 10,
          fontStyle: 'bold' // Tamaño de letra para los encabezados de la tabla
        }
      });

      finalY = (doc as any).autoTable.previous.finalY;

      startY = finalY + 10;

      if (startY > doc.internal.pageSize.height - 20) {
        doc.addPage();
        startY = 20; // Reiniciar startY en la nueva página
      }

      doc.text('Productos mas adquiridos', 14, startY)
      startY = startY + 10;

      columns = this.generateHeaders(this.MostPurchasedProducts);
      rows = this.MostPurchasedProducts.map(product => Object.values(product));
      // Tamaño de letra para el encabezado de la tabla


      (doc as any).autoTable({
        head: [columns],
        body: rows,
        startY: startY,
        styles: {
          fontSize: 10,
          cellWidth: 'wrap', // Ajusta el ancho de la celda para ajustarse al contenido
          valign: 'middle' // Tamaño de letra para el contenido de la tabla
        },
        headStyles: {
          fontSize: 10,
          fontStyle: 'bold' // Tamaño de letra para los encabezados de la tabla
        }
      });

      finalY = (doc as any).autoTable.previous.finalY;

      startY = finalY + 10;

      if (startY > doc.internal.pageSize.height - 20) {
        doc.addPage();
        startY = 20; // Reiniciar startY en la nueva página
      }


      doc.text('Productos menos adquiridos', 14, startY)
      startY = startY + 10;

      columns = this.generateHeaders(this.LessPurchasedProducts);
      rows = this.LessPurchasedProducts.map(product => Object.values(product));
      // Tamaño de letra para el encabezado de la tabla


      (doc as any).autoTable({
        head: [columns],
        body: rows,
        startY: startY,
        styles: {
          fontSize: 10,
          cellWidth: 'wrap', // Ajusta el ancho de la celda para ajustarse al contenido
          valign: 'middle' // Tamaño de letra para el contenido de la tabla
        },
        headStyles: {
          fontSize: 10,
          fontStyle: 'bold' // Tamaño de letra para los encabezados de la tabla
        }
      });

      finalY = (doc as any).autoTable.previous.finalY;

      startY = finalY + 10;

      if (startY > doc.internal.pageSize.height - 20) {
        doc.addPage();
        startY = 20; // Reiniciar startY en la nueva página
      }

    }

    if (this.user.role !== 'Venta') {
      doc.text('Laboratorios mas recurrentes', 14, startY)
      startY = startY + 10;

      columns = this.generateHeaders(this.MostCurrentLab);
      rows = this.MostCurrentLab.map(product => Object.values(product));

      // Tamaño de letra para el encabezado de la tabla


      (doc as any).autoTable({
        head: [columns],
        body: rows,
        startY: startY,
        styles: {
          fontSize: 10,
          cellWidth: 'wrap', // Ajusta el ancho de la celda para ajustarse al contenido
          valign: 'middle' // Tamaño de letra para el contenido de la tabla
        },
        headStyles: {
          fontSize: 10,
          fontStyle: 'bold' // Tamaño de letra para los encabezados de la tabla
        }
      });

      finalY = (doc as any).autoTable.previous.finalY;

      startY = finalY + 10;

      if (startY > doc.internal.pageSize.height - 20) {
        doc.addPage();
        startY = 20; // Reiniciar startY en la nueva página
      }

      doc.text('Laboratorios menos recurrentes', 14, startY)
      startY = startY + 10;

      columns = this.generateHeaders(this.LessCurrentLab);
      rows = this.LessCurrentLab.map(product => Object.values(product));

      // Tamaño de letra para el encabezado de la tabla


      (doc as any).autoTable({
        head: [columns],
        body: rows,
        startY: startY,
        styles: {
          fontSize: 10,
          cellWidth: 'wrap', // Ajusta el ancho de la celda para ajustarse al contenido
          valign: 'middle' // Tamaño de letra para el contenido de la tabla
        },
        headStyles: {
          fontSize: 10,
          fontStyle: 'bold' // Tamaño de letra para los encabezados de la tabla
        }
      });

      finalY = (doc as any).autoTable.previous.finalY;

      startY = finalY + 10;

      if (startY > doc.internal.pageSize.height - 20) {
        doc.addPage();
        startY = 20; // Reiniciar startY en la nueva página
      }


      doc.text('Pedidos mas realizados', 14, startY)
      startY = startY + 10;

      columns = this.generateHeaders(this.MostOrderedProduct);
      rows = this.MostOrderedProduct.map(product => Object.values(product));

      // Tamaño de letra para el encabezado de la tabla


      (doc as any).autoTable({
        head: [columns],
        body: rows,
        startY: startY,
        styles: {
          fontSize: 10,
          cellWidth: 'wrap', // Ajusta el ancho de la celda para ajustarse al contenido
          valign: 'middle' // Tamaño de letra para el contenido de la tabla
        },
        headStyles: {
          fontSize: 10,
          fontStyle: 'bold' // Tamaño de letra para los encabezados de la tabla
        }
      });

      finalY = (doc as any).autoTable.previous.finalY;

      startY = finalY + 10;

      if (startY > doc.internal.pageSize.height - 20) {
        doc.addPage();
        startY = 20; // Reiniciar startY en la nueva página
      }

      doc.text('Pedidos menos realizados', 14, startY)
      startY = startY + 10;

      columns = this.generateHeaders(this.LessOrderedProduct);
      rows = this.LessOrderedProduct.map(product => Object.values(product));

      // Tamaño de letra para el encabezado de la tabla


      (doc as any).autoTable({
        head: [columns],
        body: rows,
        startY: startY,
        styles: {
          fontSize: 10,
          cellWidth: 'wrap', // Ajusta el ancho de la celda para ajustarse al contenido
          valign: 'middle' // Tamaño de letra para el contenido de la tabla
        },
        headStyles: {
          fontSize: 10,
          fontStyle: 'bold' // Tamaño de letra para los encabezados de la tabla
        }
      });

      finalY = (doc as any).autoTable.previous.finalY;

      startY = finalY + 10;

      if (startY > doc.internal.pageSize.height - 20) {
        doc.addPage();
        startY = 20; // Reiniciar startY en la nueva página
      }

      doc.text('Pacientes mas recurrentes', 14, startY)
      startY = startY + 10;

      columns = this.generateHeaders(this.CurrentPatient);
      rows = this.CurrentPatient.map(product => Object.values(product));

      // Tamaño de letra para el encabezado de la tabla


      (doc as any).autoTable({
        head: [columns],
        body: rows,
        startY: startY,
        styles: {
          fontSize: 10,
          cellWidth: 'wrap', // Ajusta el ancho de la celda para ajustarse al contenido
          valign: 'middle' // Tamaño de letra para el contenido de la tabla
        },
        headStyles: {
          fontSize: 10,
          fontStyle: 'bold' // Tamaño de letra para los encabezados de la tabla
        }
      });

      finalY = (doc as any).autoTable.previous.finalY;

      startY = finalY + 10;

      if (startY > doc.internal.pageSize.height - 20) {
        doc.addPage();
        startY = 20; // Reiniciar startY en la nueva página
      }

      doc.text('Edades mas recurrentes en examenes', 14, startY)
      startY = startY + 10;

      columns = this.generateHeaders(this.CurrentPatienAge);
      rows = this.CurrentPatienAge.map(product => Object.values(product));

      // Tamaño de letra para el encabezado de la table

      (doc as any).autoTable({
        head: [columns],
        body: rows,
        startY: startY,
        styles: {
          fontSize: 10,
          cellWidth: 'wrap', // Ajusta el ancho de la celda para ajustarse al contenido
          valign: 'middle' // Tamaño de letra para el contenido de la tabla
        },
        headStyles: {
          fontSize: 10,
          fontStyle: 'bold' // Tamaño de letra para los encabezados de la tabla
        }
      });

      finalY = (doc as any).autoTable.previous.finalY;

      startY = finalY + 10;

      if (startY > doc.internal.pageSize.height - 20) {
        doc.addPage();
        startY = 20; // Reiniciar startY en la nueva página
      }
    }

    if (this.user.role !== 'Optometrista') {
      doc.text('Tipos de pagos mas preferidos', 14, startY)
      startY = startY + 10;

      columns = this.generateHeaders(this.PreferredPaymentType);
      rows = this.PreferredPaymentType.map(product => Object.values(product));

      // Tamaño de letra para el encabezado de la tabla


      (doc as any).autoTable({
        head: [columns],
        body: rows,
        startY: startY,
        styles: {
          fontSize: 10,
          cellWidth: 'wrap', // Ajusta el ancho de la celda para ajustarse al contenido
          valign: 'middle' // Tamaño de letra para el contenido de la tabla
        },
        headStyles: {
          fontSize: 10,
          fontStyle: 'bold' // Tamaño de letra para los encabezados de la tabla
        }
      });

      finalY = (doc as any).autoTable.previous.finalY;

      startY = finalY + 10;

      if (startY > doc.internal.pageSize.height - 20) {
        doc.addPage();
        startY = 20; // Reiniciar startY en la nueva página
      }
    }

    if (this.user.role === 'Super Administrador' || this.user.role === 'Administrador') {

      doc.text('Empleados con mas facturas', 14, startY)
      startY = startY + 10;

      columns = this.generateHeaders(this.BillsEmployee);
      rows = this.BillsEmployee.map(product => Object.values(product));

      // Tamaño de letra para el encabezado de la tabla


      (doc as any).autoTable({
        head: [columns],
        body: rows,
        startY: startY,
        styles: {
          fontSize: 10,
          cellWidth: 'wrap', // Ajusta el ancho de la celda para ajustarse al contenido
          valign: 'middle' // Tamaño de letra para el contenido de la tabla
        },
        headStyles: {
          fontSize: 10,
          fontStyle: 'bold' // Tamaño de letra para los encabezados de la tabla
        }
      });

      finalY = (doc as any).autoTable.previous.finalY;

      startY = finalY + 10;

      if (startY > doc.internal.pageSize.height - 20) {
        doc.addPage();
        startY = 20; // Reiniciar startY en la nueva página
      }

      doc.text('Empleados con mas examenes realizados', 14, startY)
      startY = startY + 10;

      columns = this.generateHeaders(this.ExamEyeEmployee);
      rows = this.ExamEyeEmployee.map(product => Object.values(product));

      // Tamaño de letra para el encabezado de la tabla


      (doc as any).autoTable({
        head: [columns],
        body: rows,
        startY: startY,
        styles: {
          fontSize: 10,
          cellWidth: 'wrap', // Ajusta el ancho de la celda para ajustarse al contenido
          valign: 'middle' // Tamaño de letra para el contenido de la tabla
        },
        headStyles: {
          fontSize: 10,
          fontStyle: 'bold' // Tamaño de letra para los encabezados de la tabla
        }
      });

      finalY = (doc as any).autoTable.previous.finalY;

      startY = finalY + 10;

      if (startY > doc.internal.pageSize.height - 20) {
        doc.addPage();
        startY = 20; // Reiniciar startY en la nueva página
      }

      doc.text('Empleados con mas ordenes realizadas', 14, startY)
      startY = startY + 10;

      columns = this.generateHeaders(this.OrderEmployee);
      rows = this.OrderEmployee.map(product => Object.values(product));

      // Tamaño de letra para el encabezado de la tabla


      (doc as any).autoTable({
        head: [columns],
        body: rows,
        startY: startY,
        styles: {
          fontSize: 10,
          cellWidth: 'wrap', // Ajusta el ancho de la celda para ajustarse al contenido
          valign: 'middle' // Tamaño de letra para el contenido de la tabla
        },
        headStyles: {
          fontSize: 10,
          fontStyle: 'bold' // Tamaño de letra para los encabezados de la tabla
        }
      });

      finalY = (doc as any).autoTable.previous.finalY;

      startY = finalY + 10;

      if (startY > doc.internal.pageSize.height - 20) {
        doc.addPage();
        startY = 20; // Reiniciar startY en la nueva página
      }
    }

    if (this.user.role === 'Super Administrador') {
      doc.text('Roles del sistema mas recurrente', 14, startY)
      startY = startY + 10;

      columns = this.generateHeaders(this.CurrentRoll);
      rows = this.CurrentRoll.map(product => Object.values(product));

      // Tamaño de letra para el encabezado de la tabla


      (doc as any).autoTable({
        head: [columns],
        body: rows,
        startY: startY,
        styles: {
          fontSize: 10,
          cellWidth: 'wrap', // Ajusta el ancho de la celda para ajustarse al contenido
          valign: 'middle' // Tamaño de letra para el contenido de la tabla
        },
        headStyles: {
          fontSize: 10,
          fontStyle: 'bold' // Tamaño de letra para los encabezados de la tabla
        }
      });

      finalY = (doc as any).autoTable.previous.finalY;

      startY = finalY + 10;

      if (startY > doc.internal.pageSize.height - 20) {
        doc.addPage();
        startY = 20; // Reiniciar startY en la nueva página
      }
    }

    if (this.user.role === 'Super Administrador' || this.user.role === 'Administrador') {
      doc.text('Beneficios obtenidos por productos', 14, startY)
      startY = startY + 10;

      columns = this.generateHeaders(this.Benefits);
      rows = this.Benefits.map(product => Object.values(product));

      // Tamaño de letra para el encabezado de la tabla


      (doc as any).autoTable({
        head: [columns],
        body: rows,
        startY: startY,
        styles: {
          fontSize: 8, // Tamaño de letra para el contenido de la tabla
        },
        headStyles: {
          fontSize: 8,
          fontStyle: 'bold' // Tamaño de letra para los encabezados de la tabla
        }
      });

      finalY = (doc as any).autoTable.previous.finalY;

      startY = finalY + 10;

      if (startY > doc.internal.pageSize.height - 20) {
        doc.addPage();
        startY = 20; // Reiniciar startY en la nueva página
      }

      doc.text('Beneficios obtenidos en total', 14, startY)
      startY = startY + 10;

      columns = this.generateHeaders(this.AllBenefits);
      rows = this.AllBenefits.map(product => Object.values(product));


      (doc as any).autoTable({
        head: [columns],
        body: rows,
        startY: startY,
        styles: {
          fontSize: 10,
          cellWidth: 'wrap', // Ajusta el ancho de la celda para ajustarse al contenido
          valign: 'middle' // Tamaño de letra para el contenido de la tabla
        },
        headStyles: {
          fontSize: 10,
          fontStyle: 'bold' // Tamaño de letra para los encabezados de la tabla
        }
      });

      finalY = (doc as any).autoTable.previous.finalY;

      startY = finalY + 10;

      if (startY > doc.internal.pageSize.height - 20) {
        doc.addPage();
        startY = 20; // Reiniciar startY en la nueva página
      }
    }

    doc.save(`Reporte.pdf`);
  }

  private generateHeaders(data: any[]): string[] {
    if (data.length === 0) return [];
    return Object.keys(data[0]);
  }

}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';  
