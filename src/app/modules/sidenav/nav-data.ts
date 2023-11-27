import { Router } from '@angular/router';
import { INavbarData } from './helper';

export const navbarData: INavbarData[] = [
    {
        routeLink: 'dashboard',
        icon: 'fa-solid fa-house',
        label: 'Inicio',
        role: ['Administrador', 'Super Administrador', 'Venta', 'Optometrista']
    },
    {
        routeLink: 'client',
        icon: 'fa-regular fa-address-card',
        label: 'Cliente',
        role: ['Administrador', 'Super Administrador', 'Venta', 'Optometrista']
    },
    {
        routeLink: 'employee',
        icon: 'fa-solid fa-users-line',
        label: 'Empleado',
        role: ['Administrador']
    },
    {
        routeLink: 'employee',
        icon: 'fa-solid fa-users-line',
        label: 'Empleado',
        items: [
            {
                routeLink: 'employee/employee',
                icon: 'fa-solid fa-user-tie',
                label: 'Empleados',
                role: ['Super Administrador']
            },
            {
                routeLink: 'employee/user',
                icon: 'fa-solid fa-user-lock',
                label: 'Usuarios',
                // items: [
                //     {
                //         routeLink: 'employee/user/user',
                //         icon: 'fa-solid fa-user-lock',
                //         label: 'Usuarios',
                //     }
                // ],
                role: ['Super Administrador']

            }
        ],
        role: ['Super Administrador']
    }, {
        routeLink: 'invoice',
        icon: 'fa-solid fa-file-invoice',
        label: 'Factura',
        role: ['Administrador', 'Super Administrador', 'Venta']
    }, {
        routeLink: 'pay',
        icon: 'fa-solid fa-coins',
        label: 'Pago',
        role: ['Administrador', 'Super Administrador', 'Venta']
    }, {
        routeLink: 'eye-exam',
        icon: 'fa-solid fa-hospital-user',
        label: 'Examen de vista',
        role: ['Administrador', 'Super Administrador', 'Optometrista']
    },{
        routeLink: 'product',
        icon: 'fa-solid fa-glasses',
        label: 'Producto',
        items: [
            {
                routeLink: 'product/inventory',
                icon: 'fa-solid fa-warehouse',
                label: 'Inventario',
                role: ['Administrador', 'Super Administrador', 'Venta']
            },
            {
                routeLink: 'product/add',
                icon: 'fa-solid fa-plus',
                label: 'Agregar Producto',
                role: ['Administrador', 'Super Administrador', 'Venta']

            }
        ],
        role: ['Administrador', 'Super Administrador', 'Venta']
    }, {
        routeLink: 'order',
        icon: 'fa-solid fa-truck-field',
        label: 'Orden Pedido',
        role: ['Administrador', 'Super Administrador']
    }
    /*,
    {    <i class=""></i>
        routeLink: 'empleado',
        icon: 'fa-solid fa-user-tie',
        label: 'Empleado',
        items:[
            {
                routeLink: 'empleado/info',
                icon: 'fa-regular fa-address-card', 
                label: 'Información del Empleado',
                role:['Manager','Vendedor']
            },
            {
                routeLink: 'empleado/contacto-empleado',
                icon: 'fa-solid fa-mobile-screen-button',
                label: 'Contactos del Empleado',
                role:['Manager','Vendedor']
            }
        ],
        role:['Admin']
    },*/
    // {
    //     routeLink:'provedor',
    //     icon: 'fa-solid fa-address-card',
    //     label:'Proveedor',
    //     items:[
    //         {
    //             routeLink: 'provedor/info',
    //             icon: 'fa-regular fa-address-card', 
    //             label: 'Información del Proveedor'
    //         },
    //         {
    //             routeLink: 'provedor/contacto-proveedor',
    //             icon: 'fa-solid fa-mobile-screen-button',
    //             label: 'Contactos del Proveedor'
    //         }
    //     ]
    // },{
    //     routeLink:'factura',
    //     icon: 'fa-solid fa-file-invoice-dollar',
    //     label:'Factura'
    // },
    // {
    //     routeLink:'detalle-factura',
    //     icon: 'fa-solid fa-receipt',
    //     label:'Detalle Factura'
    // },
    // {
    //     routeLink: 'producto',
    //     icon: 'fa-solid fa-tags',
    //     label: 'Producto'
    // },
    // {
    //     routeLink:'proveedor-producto',
    //     icon: 'fa-solid fa-truck-ramp-box',
    //     label:'Producto Proveído'
    // },{
    //     routeLink:'examen-vista',
    //     icon: 'fa-regular fa-eye',
    //     label:'Examen de Vista'
    // },{
    //     routeLink:'pago',
    //     icon: 'fa-solid fa-money-bill-1-wave',
    //     label:'Pago'
    // },
    // {
    //     routeLink:'bodega',
    //     icon: 'fa-solid fa-store',
    //     label:'Bodega'
    // },{
    //     routeLink:'registro-bodega',
    //     icon: 'fa-solid fa-warehouse',
    //     label:'Producto en Bodega'
    // },
    // {
    //     routeLink:'laboratorio',
    //     icon: 'fa-solid fa-flask-vial',
    //     label:'Laboratorio'
    // } ,
    // {
    //     routeLink:'orden-pedido',
    //     icon: 'fa-regular fa-paste',
    //     label:'Pedido'
    // },
    // {
    //     routeLink:'entrega',
    //     icon: 'fa-solid fa-truck',
    //     label:'Entrega'
    // }
    // {
    //     routeLink:'orden-pedido-entrega',
    //     icon: 'fa-solid fa-file-signature',
    //     label:'Orden Pedido Entrega'
    // },

];

// <i class="fa-regular fa-paste"></i>
