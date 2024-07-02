//interface

export interface PostDate { 

    fechaInicial:string;
    fechaFinal:string;
    tipo_Producto?:string;

}

export interface SellProducts { //bool

    codigo_Producto:string;
    descripcion:string;
    tipo_Producto?:string;
    total:number;

}

export interface CurrentRoll { //bool

    rol:string;
    descripcion:string;
    cantidad_Usuarios:number;

}

export interface CurrentClient {

    cedula:string;
    cliente:string;
    veces_Facturadas:number;

}

export interface CurrentSupplier { //bool

    codigo_Proveedor:string;
    nombre_Empresa:string;
    total_Productos:number;

}

export interface PurchasedProducts { //bool

    codigo_Producto:string;
    descripcion:string;
    tipo_Producto:string;
    total_Productos:number;

}

export interface CurrentLab { //bool

    codigo_Laboratorio:number;
    nombre:string;
    cantidad_Pedidos:number;
}

export interface OrderedProduct { //bool

    codigo_Producto:string;
    descripcion:string;
    tipo_Producto:string;
    veces_Pedidas:number;
}

//Continuar

export interface CurrentPatient {

    cliente:string;
    edad:number;
    examenes_Realizados:number;
}

export interface CurrentPatienAge {

    edad:number;
    cantidad_Pacientes:number;
}

export interface PreferredPaymentType {

    tipo_Pago:string;
    frecuencia_de_uso:number;
}

export interface BillsEmployee {

    numero_Empleado:number;
    empleado:string;
    facturas_Emitidas:number;
}

export interface ExamEyeEmployee {

    numero_Empleado:number;
    empleado:string;
    examenes_Realizados:number;
}

export interface OrderEmployee {

    numero_Empleado:number;
    empleado:string;
    pedidos_Realizados:number;
}

export interface Benefits {

    codigo_Producto: string,
    descripcion: string,
    tipo_Producto: string,
    cantidad_Actual: number,
    cantidades_Vendidas: number,
    costo_Venta: number,
    total_Vendido: number,
    cantidad_Obtenida: number,
    costo_Obtencion: number,
    cantidad_Pedidos: number,
    costo_Pedido: number,
    costo_Total: number,
    beneficios: number

}

export interface AllBenefits {

    cantidades_Vendidas: number,
    costo_Venta: number,
    total_Vendido: number,
    cantidad_Obtenida: number,
    costo_Obtencion: number,
    cantidad_Pedidos: number,
    costo_Pedido: number,
    costo_Total: number,
    beneficios: number

}
// functions


// Funcion para obtener la fecha en string

export function GetFormateDate(date: Date):string {

    let fechaActual = date;
    fechaActual.setHours(0, 0, 0, 0);
    fechaActual.setDate(fechaActual.getDate() + 1);

    // Obtener los componentes de la fecha
    let año = fechaActual.getFullYear();
    let mes = fechaActual.getMonth() + 1; // getMonth() devuelve valores de 0 a 11, por eso sumamos 1
    let dia = fechaActual.getDate();
    let horas = fechaActual.getHours();
    let minutos = fechaActual.getMinutes();
    let segundos = fechaActual.getSeconds();

    // Formatear la fecha según el formato "YYYY-MM-DDTHH:mm:ss"
    let fechaFormateada = `${año}-${padNumber(mes)}-${padNumber(dia)}T${padNumber(horas)}:${padNumber(minutos)}:${padNumber(segundos)}`;

    // Función para asegurarse de que los números tengan dos dígitos (agrega ceros a la izquierda si es necesario)
    function padNumber(num: number): string {
      return num.toString().padStart(2, '0');
    }

    //console.log(fechaFormateada); // Imprimir la fecha formateada en la consola

    return fechaFormateada
  }

