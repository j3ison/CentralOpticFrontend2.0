export interface Client {
    codigo_Cliente: number;
    empresa_Asociada: string;
    nombres: string;
    apellidos: string;
    cedula: string;
    direccion: string;
    fechaNac: string;
    edad: string;
    correos: string;
    telefonos: string;
}


export interface Employee {
    Numero_Empleado: number;
    Cedula: string;
    Nombres: string;
    Apellidos: string;
    Direccion: string;
    Fecha_Nacimiento: string;
    Estado: boolean;
    Telefono: string;
    Correo: string;
}

export interface User {
    Numero_Usuario: number;
    Id_Rol: number;
    Numero_Empleado: number;
    Clave: string;
    Nombre_Usuario: string;
    Estado: boolean;
    Rol: string;
    Descripcion: string;
}

// export interface Rol{
//     Id_Rol:number;
//     Rol:string;
//     Descripcion:string;
// }

export interface DetailExam {
    Numero_Examen: string;
    ojo: boolean;
    sph: number;
    cyl: number;
    add: number;
    eje: number;
    dp: number;
    alt: number;
}

export interface EyeExam {
    Numero_Examen: number;
    Empleado: Employee;
    Cliente: Client;
    Estado: boolean;
    Fecha_Realizacion: string;
    Observacion: string;
}

export interface orderGlasses {
    Numero_Orden: number;
    Costo: number;
    Fecha_Emision: string;
    Examen: EyeExam;
    Empleado: Employee;
    Laboratorio: Laboratory;
    Producto: Product;
    Estado_OrdenLente: string;
}

// export interface StatusOrderGlasses{
//     Id_EstadoOrdenLente:number;
//     Estado_OrdenLente:string;
// }

export interface DeliveryGlasses {
    Codigo_Entrega: number;
    Numero_orden: number;
    Fecha_Obtencion: string;
    Estado: boolean;
    Observacion: string;
}

export interface Laboratory {
    Codigo_Laboratorio: number;
    Nombre: string;
    Estado: boolean;
    Direccion: string;
    Telefono: string;
    Correo: string;
}

export interface Product {
    codProducto: string;
    descripcion: string;
    tipoProducto: string;
    estado?: boolean;
    precioVenta: number;
    precioCompra: number;
    cantidad: number;
    stockMinimo: number;
    stockMaximo: number;
}

export interface Product {
    codProducto: string;
    descripcion: string;
    tipoProducto: string;
    estado?: boolean;
    precioVenta: number;
    precioCompra: number;
    cantidad: number;
    stockMinimo: number;
    stockMaximo: number;
}

export interface RegistrationProduct {
    Codigo_Producto: string;
    Proveedor: Supplier;
    Fecha_Adquisicion: string;
    Costo: number;
    Cantidad: number;
    Estado: boolean;
}

export interface Supplier {
    Codigo_Proveedor: string;
    Nombre_Empresa: string;
    Estado: string;
    Nombre_Contacto: string;
    Direccion: string;
    Correo: string;
    Telefono: string;
}

export interface EmailSupplier {
    Codigo_Proveedor: number;
    Correo: string;
}

export interface PhoneSupplier {
    Codigo_Proveedor: number;
    Telefono: string;
}

export interface InvoicePost {
    numFactura?: number;
    estado_Factura: string;
    tipo_Factura?: string;
    numeroEmpleado: number;
    codigo_Cliente: number;
    numExamen?: number;
    tipoVenta: boolean;
    impuesto: number;
    descuento: number;
    fecha_Emision: string;
    descripcion_Credito?: string;
}

export interface InvoiceGet {
    numFactura?: number;
    fecha_Emision: string;
    estado_Factura: string;
    tipo_Factura?: string;
    tipoVenta: boolean;
    numero_Ruc: string;
    empresa_Asociada: string;
    cliente: string;
    impuesto: number;
    descuento: number;
    subtotal: number;
    total?: number;
    descripcion_Credito?: string;
    paciente?: string;
    observacion?: string;
    sphIz?: number
    cylIz?: number;
    addIz?: number;
    ejeIz?: number;
    dpIz?: number;
    altIz?: number;
    sphDe?: number;
    cylDe?: number;
    addDe?: number;
    ejeDe?: number;
    dpDe?: number;
    altDe?: number;
}

export interface DetailInvoice {
    numFactura: number;
    codigo_Producto: string;
    descripcion:string;
    precio_Unitario: number;
    cantidad: number;
    monto:number;
}

export interface StatusInvoice {
    idEstadoFactura: number;
    estadoFactura: string;
}

export interface Exam {
    numExamen: number;
    estado: boolean;
    empleado: string;
    paciente: string;
    fecha_Realizacion: string;
    observacion?: string;
    sPHIz?: number;
    cYLIz?: number;
    aDDIz?: number;
    eJEIz?: number;
    dPIz?: number;
    aLTIz?: number;
    sPHDe?: number;
    cYLDe?: number;
    aDDDe?: number;
    eJEDe?: number;
    dPDe?: number;
    aLTDe?: number;
}

export interface TypeInvoice {
    id_TipoFactura: number;
    tipo_Factura: string;
}

export interface pay {
    Id_Pago: number;
    // Factura:Invoice;
    Tipo_Pago: string;
    Abono: number;
    Fecha_Pago: string;
    Estado: boolean;
    Descripcion: string;
}


