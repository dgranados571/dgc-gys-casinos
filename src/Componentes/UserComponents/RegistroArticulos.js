import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { Paginacion } from '../Paginacion'
import Select from 'react-select'


export const RegistroArticulos = () => {

    const tipoInventarioOptions = [
        { value: 'MATERIA_PRIMA', label: 'Materia prima' },
        { value: 'ASEO_ELEMETOS_PLASTICOS', label: 'Aseo / Elementos plasticos' }
    ]

    const [elementsPaginacionArticulos, setElementsPaginacionArticulos] = useState(
        { totalElementos: '', elementosPorPagina: '3', paginaActual: '1' }
    );

    const [elementsPaginacionProveedores, setElementsPaginacionProveedores] = useState(
        { totalElementos: '', elementosPorPagina: '3', paginaActual: '1' }
    );

    const [articulos, setArticulos] = useState([
        { nombre: 'ABLANDA CARNES' }, { nombre: 'ACELGAS' }, { nombre: 'AGUACATE' },
        { nombre: 'AHUYAMA' }, { nombre: 'AJO' }, { nombre: 'APIO' },
        { nombre: 'AROMAICAS' }, { nombre: 'ARRACACHA' }, { nombre: 'ARROZ' },
        { nombre: 'ARVEJA' }, { nombre: 'AVENA' }, { nombre: 'AZUCAR' },
        /*
        { nombre: 'BANANO' }, { nombre: 'BLANQUILLOS' }, { nombre: 'BOCADILLOS' },
        { nombre: 'BROCOLI' }, { nombre: 'CADERA' }, { nombre: 'CAFÉ' },
        { nombre: 'CALABAZA' }, { nombre: 'CANELA' }, { nombre: 'CARNE MOLIDA' },
        { nombre: 'CEBADA PERLADA' }, { nombre: 'CEBOLLA CABEZONA' }, { nombre: 'CEBOLLA LARGA' },
        { nombre: 'CHAMPIÑONES' }, { nombre: 'CHOCOLATE' }, { nombre: 'CHOCOLISTO' },
        */
    ])

    const [proveedores, setProveedores] = useState([
        { nombre: 'SURTIDOR 1' }, { nombre: 'SURTIDOR 2' }, { nombre: 'SURTIDOR 3' },
        { nombre: 'SURTIDOR 4' }, { nombre: 'SURTIDOR 5' }, { nombre: 'SURTIDOR 6' },
        /*
        { nombre: 'SURTIDOR 7' }, { nombre: 'SURTIDOR 7' }, { nombre: 'SURTIDOR 9' },
        { nombre: 'SURTIDOR 10' }, { nombre: 'SURTIDOR 11' }, { nombre: 'SURTIDOR 12' },
        */
    ])

    useEffect(() => {
        setElementsPaginacionArticulos({ ...elementsPaginacionArticulos, totalElementos: articulos.length })
        setElementsPaginacionProveedores({ ...elementsPaginacionProveedores, totalElementos: proveedores.length })
    }, [])

    return (
        <div>
            <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-style-form'>
                        <div className='div-form'>
                            <p className='p-label-form'> Articulo: </p>
                            <input type="text" className='form-control' placeholder='Ej: Arracacha' autoComplete='off' />
                        </div>

                        <div className='div-form'>
                            <p className='p-label-form'> Tipo Inventario: </p>
                            <Select options={tipoInventarioOptions} placeholder='Seleccione' />
                        </div>
                        
                        
                        
                        <div className='div-buttom-registra'>
                            <button className='btn btn-primary bottom-custom' >Guardar</button>
                        </div>

                        
                    </div>
                    <div className='div-style-form'>
                        {
                            articulos.map((element) => {
                                return (
                                    <div className='div-list-element'>
                                        <div className="row">
                                            <div className="col-6 col-sm-6 col-md-6 col-lg-6" >
                                                <p className='p-list'>{element.nombre}</p>
                                            </div>
                                            <div className="col-6 col-sm-6 col-md-6 col-lg-6" >
                                                <div className='div-list-icons'>
                                                    <button className='btn btn-link'>
                                                        <FontAwesomeIcon className='icon-fa-edit' icon={faPenToSquare} />
                                                    </button>
                                                    <button className='btn btn-link'>
                                                        <FontAwesomeIcon className='icon-fa-delete' icon={faTrashCan} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className='div-paginador-container'>
                            <Paginacion elementsPaginacion={elementsPaginacionArticulos} setElementsPaginacion={setElementsPaginacionArticulos} />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 " >
                    <div className='div-style-form'>
                        <div className='div-form'>
                            <p className='p-label-form'> Proveedor: </p>
                            <input type="text" className='form-control' placeholder='Ej: Corabastos' autoComplete='off' />
                        </div>
                        <div className='div-buttom-registra'>
                            <button className='btn btn-primary bottom-custom' >Guardar</button>
                        </div>
                    </div>
                    <div className='div-style-form'>
                        {
                            proveedores.map((element) => {
                                return (
                                    <div className='div-list-element'>
                                        <div className="row">
                                            <div className="col-6 col-sm-6 col-md-6 col-lg-6" >
                                                <p className='p-list'>{element.nombre}</p>
                                            </div>
                                            <div className="col-6 col-sm-6 col-md-6 col-lg-6" >
                                                <div className='div-list-icons'>
                                                    <button className='btn btn-link'>
                                                        <FontAwesomeIcon className='icon-fa-edit' icon={faPenToSquare} />
                                                    </button>
                                                    <button className='btn btn-link'>
                                                        <FontAwesomeIcon className='icon-fa-delete' icon={faTrashCan} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className='div-paginador-container'>
                            <Paginacion elementsPaginacion={elementsPaginacionProveedores} setElementsPaginacion={setElementsPaginacionProveedores} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
