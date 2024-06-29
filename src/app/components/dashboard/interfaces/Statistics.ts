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