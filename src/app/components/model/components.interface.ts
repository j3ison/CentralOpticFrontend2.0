export interface Client{
    Codigo_cliente:number;
    Numero_Ruc:string;
    Nombres:string;
    Apellidos:string;
    Cedula:string;
    Direccion:string;
    Fecha_Nacimiento:string;
    Empresa:string;
    Correo:string;
    Telefono:string;
}


export interface Employee{
    Numero_Empleado:number;
    Cedula:string;
    Nombres:string;
    Apellidos:string;
    Direccion:string;
    Fecha_Nacimiento:string;
    Estado:boolean;
    Telefono:string;
    Correo:string;
}

export interface User{
    Numero_Usuario:number;
    Id_Rol:number;
    Numero_Empleado:number;
    Clave:string;
    Nombre_Usuario:string;
    Estado:boolean;
    Rol:string;
    Descripcion:string;
}

// export interface Rol{
//     Id_Rol:number;
//     Rol:string;
//     Descripcion:string;
// }

export interface DetailExam{
    Numero_Examen:string;
    ojo:boolean;
    sph:number;
    cyl:number;
    add:number;
    eje:number;
    dp:number;
    alt:number;
}

export interface EyeExam{
    Numero_Examen:number;
    Empleado:Employee;
    Cliente:Client;
    Estado:boolean;
    Fecha_Realizacion:string;
    Observacion:string;
}

export interface orderGlasses{
    Numero_Orden:number;
    Costo:number;
    Fecha_Emision:string;
    Examen:EyeExam;
    Empleado:Employee;
    Laboratorio:Laboratory;
    Producto:Product;
    Estado_OrdenLente:string;
}

// export interface StatusOrderGlasses{
//     Id_EstadoOrdenLente:number;
//     Estado_OrdenLente:string;
// }

export interface DeliveryGlasses{
    Codigo_Entrega:number;
    Numero_orden:number;
    Fecha_Obtencion:string;
    Estado:boolean;
    Observacion:string;
}

export interface Laboratory{
    Codigo_Laboratorio:number;
    Nombre:string;
    Estado:boolean;
    Direccion:string;
    Telefono:string;
    Correo:string;
}

export interface Product{
    Codigo_Producto:string;
    Descripcion:string;
    Tipo:string;
    Estado:boolean;
    Precio_Venta:number;
    Precio_Compra:number;
    Cantidad:number;
    stock_Minimo:number;
    Stock_Maximo:number;
}

export interface RegistrationProduct{
    Codigo_Producto:string;
    Proveedor:Supplier;
    Fecha_Adquisicion:string;
    Costo:number;
    Cantidad:number;
    Estado:boolean;
}

export interface Supplier{
    Codigo_Proveedor:string;
    Nombre_Empresa:string;
    Estado:string;
    Nombre_Contacto:string;
    Direccion:string;
    Correo:string;
    Telefono:string;
}

export interface EmailSupplier{
    Codigo_Proveedor:number;
    Correo:string;
}

export interface PhoneSupplier{
    Codigo_Proveedor:number;
    Telefono:string;
}

export interface Invoice{
    Numero_Factura:number;
    EstadoFactura:string;
    TipoFactura:string;
    Empleado:Employee;
    Cliente:Client;
    Examen:EyeExam;
    Tipo_Venta:boolean;
    Impuesto:number;
    Descuento:string;
    Fecha_Emision:string;
    Descripcion_Credito?:string;
}

export interface DetailInvoice{
    Numero_Factura:number;
    Producto:Product;
    Precio_Unitario:number;
    Cantidad:number;
}

export interface StatusInvoice{
    Id_EstadoFactura:number;
    Estado_Factura:string;
}

export interface pay{
    Id_Pago:number;
    Factura:Invoice;
    Tipo_Pago:string;
    Abono:number;
    Fecha_Pago:string;
    Estado:boolean;
    Descripcion:string;
}


