import React, { useEffect, useState, useRef } from 'react'
import { utilUrl } from '../../utilUrl';
import { Cargando } from '../Cargando';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import { Paginacion } from '../Paginacion'
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'


import 'react-toastify/dist/ReactToastify.css';

export const Registros = () => {

    const { urlEntorno } = utilUrl();
    const [cargando, setCargando] = useState(false)

    const tipoInventarioOptions = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'MATERIA_PRIMA', label: 'Materia prima' },
        { value: 'ASEO_ELEMETOS_PLASTICOS', label: 'Aseo / Elementos plasticos' }
    ]

    const [articulos, setArticulos] = useState([])
    const [proveedores, setProveedores] = useState([])

    const [nombreArticulo, setNombreArticulo] = useState('')
    const [tipoInventario, setTipoInventario] = useState(tipoInventarioOptions[0])

    const [proveedor, setProveedor] = useState('')
    const [contactoProveedor, setContactoProveedor] = useState('')

    const [editaArticulo, setEditaArticulo] = useState(false)
    const [eliminaArticulo, setEliminaArticulo] = useState(false)
    const [eliminaArticuloObject, setEliminaArticuloObject] = useState('')
    const [editaArticuloObject, setEditaArticuloObject] = useState('')

    const [editaProveedor, setEditaProveedor] = useState(false)
    const [eliminaProveedor, setEliminaProveedor] = useState(false)
    const [eliminaProveedorObject, setEliminaProveedorObject] = useState('')
    const [editaProveedorObject, setEditaProveedorObject] = useState('')

    const nombreArticuloRef = useRef('')
    const tipoInventarioRef = useRef('')

    const nombreArticuloEditaRef = useRef('')
    const tipoInventarioEditaRef = useRef('')

    const proveedorRef = useRef('')
    const contactoProveedorRef = useRef('')

    const proveedorEditaRef = useRef('')
    const contactoProveedorEditaRef = useRef('')

    const [elementsPaginacionArticulos, setElementsPaginacionArticulos] = useState(
        { totalElementos: '', elementosPorPagina: '10', paginaActual: '1' }
    );

    const [elementsPaginacionProveedores, setElementsPaginacionProveedores] = useState(
        { totalElementos: '', elementosPorPagina: '10', paginaActual: '1' }
    );

    useEffect(() => {
        consultaInformacionMateriaPrima()
        consultaInformacionProveedores()
    }, [elementsPaginacionArticulos.paginaActual, elementsPaginacionProveedores.paginaActual])

    const guardarArticuloInventario = () => {
        let formValidado = [];
        nombreArticuloRef.current.className = 'form-control';
        if (nombreArticulo.length === 0) {
            formValidado.push('nombreArticulo');
            nombreArticuloRef.current.className = 'form-control form-control-error'
        }
        if (tipoInventario.value === 'INITIAL') {
            formValidado.push('Tipo Inventario');
        }
        if (formValidado.length === 0) {
            enviaInformacionMateriaPrima()
        } else {
            formValidado.splice(0, formValidado.length)
            toast('Errores en el formulario Materia Prima')
        }
    }

    const guardarProveedor = () => {
        let formValidado = [];
        proveedorRef.current.className = 'form-control';
        if (proveedor.length === 0) {
            formValidado.push('proveedor');
            proveedorRef.current.className = 'form-control form-control-error'
        }
        contactoProveedorRef.current.className = 'form-control';
        if (contactoProveedor.length === 0) {
            formValidado.push('Contacto proveedor');
            contactoProveedorRef.current.className = 'form-control form-control-error'
        }
        if (formValidado.length === 0) {
            enviaInformacionProveedor()
        } else {
            formValidado.splice(0, formValidado.length)
            toast('Errores en el formulario proveedores')
        }
    }

    const editarArticuloAction = (element) => {
        setNombreArticulo(element.nombre_registro)
        const tipoInventarioActual = tipoInventarioOptions.filter((tipInv) => {
            if (tipInv.value === element.tipo_inventario) {
                return tipInv
            }
        })
        setTimeout(() => {
            tipoInventarioEditaRef.current.setValue(tipoInventarioActual[0])
        }, 100)
        setEditaArticuloObject(element)
        setEditaArticulo(true)
    }

    const confirmaEditarArticulo = () => {
        let formValidado = [];
        nombreArticuloEditaRef.current.className = 'form-control';
        if (nombreArticulo.length === 0) {
            formValidado.push('nombreArticulo');
            nombreArticuloEditaRef.current.className = 'form-control form-control-error'
        }
        if (tipoInventario.value === 'INITIAL') {
            formValidado.push('Tipo Inventario');
        }
        if (formValidado.length === 0) {
            enviaInformacionEditaMateriaPrima()
        } else {
            formValidado.splice(0, formValidado.length)
            toast('Errores en el formulario de edición Materia Prima')
        }
    }

    const cancelaEdicionArticlulo = () => {
        setEditaArticulo(false)
        setNombreArticulo('')
    }

    const eliminaArticuloAction = (element) => {
        setEliminaArticuloObject(element)
        setEliminaArticulo(true)
    }

    const confirmaEliminarArticulo = () => {
        eliminaArticuloServicio(eliminaArticuloObject.id)
        setEliminaArticuloObject('')
        setEliminaArticulo(false)
    }

    const cancelaEliminarArticulo = () => {
        setEliminaArticuloObject('')
        setEliminaArticulo(false)
    }

    const editarProveedorAction = (element) => {
        setProveedor(element.nombre_proveedor)
        setContactoProveedor(element.no_contacto_proveedor)
        setEditaProveedorObject(element)
        setEditaProveedor(true)
    }

    const confirmaEditarProveedor = () => {
        let formValidado = [];
        proveedorEditaRef.current.className = 'form-control';
        if (proveedor.length === 0) {
            formValidado.push('proveedor');
            proveedorEditaRef.current.className = 'form-control form-control-error'
        }
        contactoProveedorEditaRef.current.className = 'form-control';
        if (contactoProveedor.length === 0) {
            formValidado.push('Contacto proveedor');
            contactoProveedorEditaRef.current.className = 'form-control form-control-error'
        }
        if (formValidado.length === 0) {
            enviaInformacionEditaProveedores()
        } else {
            formValidado.splice(0, formValidado.length)
            toast('Errores en el formulario de edición Proveedores')
        }
    }

    const cancelaEdicionProveedor = () => {
        setProveedor('')
        setContactoProveedor('')
        setEditaProveedor(false)
    }

    const eliminaProveedorAction = (element) => {
        setEliminaProveedorObject(element)
        setEliminaProveedor(true)
    }

    const confirmaEliminarProveedor = () => {
        eliminaProveedorServicio(eliminaProveedorObject.id)
        setEliminaProveedorObject('')
        setEliminaProveedor(false)
    }

    const cancelaEliminarProveedor = () => {
        setEliminaProveedorObject('')
        setEliminaProveedor(false)
    }

    const consultaInformacionMateriaPrima = async () => {
        setCargando(true)
        await axios.get(`${urlEntorno}/service/dgcgys/casinos/obtieneMateriaPrima?elementosPorPagina=${elementsPaginacionArticulos.elementosPorPagina}&paginaActual=${elementsPaginacionArticulos.paginaActual}`)
            .then((response) => {
                setTimeout(() => {
                    setCargando(false)
                    setArticulos(response.data.registrosInventarioListPaginada)
                    setElementsPaginacionArticulos({ ...elementsPaginacionArticulos, totalElementos: response.data.totalElementos })
                }, 250)
            }).catch(() => {
                setTimeout(() => {
                    setCargando(false)
                }, 250)
            })
    }

    const consultaInformacionProveedores = async () => {
        setCargando(true)
        await axios.get(`${urlEntorno}/service/dgcgys/casinos/obtieneProveedores?elementosPorPagina=${elementsPaginacionProveedores.elementosPorPagina}&paginaActual=${elementsPaginacionProveedores.paginaActual}`)
            .then((response) => {
                setTimeout(() => {
                    setCargando(false)
                    setProveedores(response.data.registroProveedorlistPaginada)
                    setElementsPaginacionProveedores({ ...elementsPaginacionProveedores, totalElementos: response.data.totalElementos })
                }, 250)
            }).catch(() => {
                setTimeout((error) => {
                    setCargando(false)
                    console.log(error)
                }, 250)
            })
    }

    const enviaInformacionMateriaPrima = async () => {
        setCargando(true)
        const f = new FormData();
        f.append('nombreArticulo', nombreArticulo);
        f.append('tipoInventario', tipoInventario.value);
        const usuarioLocalStorage = sessionStorage.getItem('usuarioApp');
        f.append('usuarioApp', usuarioLocalStorage);
        await axios.post(`${urlEntorno}/service/dgcgys/casinos/registraMateriaPrima`, f)
            .then((response) => {
                setTimeout(() => {
                    setCargando(false)
                    if (response.data.status) {
                        setNombreArticulo('')
                        tipoInventarioRef.current.setValue(tipoInventarioOptions[0])
                        consultaInformacionMateriaPrima()
                    }
                    toast(response.data.mensaje)
                }, 1000)
            }).catch(() => {
                setTimeout(() => {
                    setCargando(false)
                    toast('No es posible el registro, intente mas tarde')
                }, 1000)
            })
    }

    const enviaInformacionProveedor = async () => {
        setCargando(true)
        const f = new FormData();
        f.append('nombreProveedor', proveedor);
        f.append('contactoProveedor', contactoProveedor);
        const usuarioLocalStorage = sessionStorage.getItem('usuarioApp');
        f.append('usuarioApp', usuarioLocalStorage);
        await axios.post(`${urlEntorno}/service/dgcgys/casinos/registraProveedor`, f)
            .then((response) => {
                setTimeout(() => {
                    setCargando(false)
                    if (response.data.status) {
                        setProveedor('')
                        setContactoProveedor('')
                        consultaInformacionProveedores()
                    }
                    toast(response.data.mensaje)
                }, 1000)
            }).catch(() => {
                setTimeout(() => {
                    setCargando(false)
                    toast('No es posible el registro, intente mas tarde')
                }, 1000)
            })
    }

    const enviaInformacionEditaMateriaPrima = async () => {
        setCargando(true)
        const f = new FormData();
        f.append('id', editaArticuloObject.id);
        f.append('nombreArticulo', nombreArticulo);
        f.append('tipoInventario', tipoInventario.value);
        const usuarioLocalStorage = sessionStorage.getItem('usuarioApp');
        f.append('usuarioApp', usuarioLocalStorage);
        await axios.post(`${urlEntorno}/service/dgcgys/casinos/editaMateriaPrima`, f)
            .then((response) => {
                setTimeout(() => {
                    setCargando(false)
                    if (response.data.status) {
                        setNombreArticulo('')
                        consultaInformacionMateriaPrima()
                    }
                    setEditaArticulo(false)
                    toast(response.data.mensaje)
                }, 1000)
            }).catch(() => {
                setTimeout(() => {
                    setCargando(false)
                    toast('No es posible el registro, intente mas tarde')
                }, 1000)
            })
    }

    const enviaInformacionEditaProveedores = async () => {
        setCargando(true)
        const f = new FormData();
        f.append('id', editaProveedorObject.id);
        f.append('nombreProveedor', proveedor);
        f.append('contactoProveedor', contactoProveedor);
        const usuarioLocalStorage = sessionStorage.getItem('usuarioApp');
        f.append('usuarioApp', usuarioLocalStorage);
        await axios.post(`${urlEntorno}/service/dgcgys/casinos/editaProveedor`, f)
            .then((response) => {
                setTimeout(() => {
                    setCargando(false)
                    if (response.data.status) {
                        setProveedor('')
                        setContactoProveedor('')
                        consultaInformacionProveedores()
                    }
                    setEditaProveedor(false)
                    toast(response.data.mensaje)
                }, 1000)
            }).catch(() => {
                setTimeout(() => {
                    setCargando(false)
                    toast('No es posible el registro, intente mas tarde')
                }, 1000)
            })
    }

    const eliminaArticuloServicio = async (id) => {
        setCargando(true)
        await axios.get(`${urlEntorno}/service/dgcgys/casinos/eliminaMateriaPrima?id=${id}`)
            .then((response) => {
                setTimeout(() => {
                    setCargando(false)
                    toast(response.data.mensaje)
                    consultaInformacionMateriaPrima()
                }, 1000)
            }).catch(() => {
                setTimeout(() => {
                    setCargando(false)
                    toast('No es posible eliminar el registro, intente mas tarde')
                }, 1000)
            })
    }

    const eliminaProveedorServicio = async (id) => {
        setCargando(true)
        await axios.get(`${urlEntorno}/service/dgcgys/casinos/eliminaProveedor?id=${id}`)
            .then((response) => {
                setTimeout(() => {
                    setCargando(false)
                    toast(response.data.mensaje)
                    consultaInformacionProveedores()
                }, 1000)
            }).catch(() => {
                setTimeout(() => {
                    setCargando(false)
                    toast('No es posible eliminar el registro, intente mas tarde')
                }, 1000)
            })
    }

    return (
        <div>
            <ToastContainer autoClose={4000} hideProgressBar={true} />
            <div className='div-style-form'>
                <h3>Registros del sistema (Articulos y Proveedores)</h3>
            </div>
            <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-style-form'>
                        <div className='div-form'>
                            <p className='p-label-form'> Articulo: </p>
                            <input ref={nombreArticuloRef} value={nombreArticulo} onChange={(e) => setNombreArticulo(e.target.value)} type="text" className='form-control' placeholder='Ej: Arracacha' autoComplete='off' />
                        </div>
                        <div className='div-form'>
                            <p className='p-label-form'> Tipo Inventario: </p>
                            <Select ref={tipoInventarioRef} onChange={(e) => setTipoInventario(e)} options={tipoInventarioOptions} placeholder='Seleccione' />
                        </div>
                        <div className='div-buttom-registra'>
                            <button className='btn btn-primary bottom-custom' onClick={guardarArticuloInventario} >Guardar</button>
                        </div>
                    </div>
                    <div className='div-style-form'>
                        {
                            articulos.map((element, i) => {
                                return (
                                    <div className='div-list-element'>
                                        <div className="row div-row-elements">
                                            <div className="col-12 col-sm-6 col-md-4 col-lg-4" >
                                                <p className='p-list'>{element.nombre_registro}</p>
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-4 col-lg-4" >
                                                <p className='p-list'>{element.tipo_inventario}</p>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-4 col-lg-4" >
                                                <div className='div-list-icons'>
                                                    <>
                                                        <button onClick={() => editarArticuloAction(element)} className='btn btn-link btn-editar'>
                                                            <FontAwesomeIcon className='icon-fa-edit' icon={faPenToSquare} />Editar
                                                        </button>
                                                        <button onClick={() => eliminaArticuloAction(element)} className='btn btn-link btn-delete'>
                                                            <FontAwesomeIcon className='icon-fa-delete' icon={faTrashCan} />Eliminar
                                                        </button>
                                                    </>
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
                            <input ref={proveedorRef} value={proveedor} onChange={(e) => setProveedor(e.target.value)} type="text" className='form-control' placeholder='Ej: Corabastos' autoComplete='off' />
                        </div>
                        <div className='div-form'>
                            <p className='p-label-form'> No de contacto: </p>
                            <input ref={contactoProveedorRef} value={contactoProveedor} onChange={(e) => setContactoProveedor(e.target.value)} type="text" className='form-control' placeholder='Ej: 311-1234567' autoComplete='off' />
                        </div>
                        <div className='div-buttom-registra'>
                            <button className='btn btn-primary bottom-custom' onClick={guardarProveedor} >Guardar</button>
                        </div>
                    </div>
                    <div className='div-style-form'>
                        {
                            proveedores.map((element) => {
                                return (
                                    <div className='div-list-element'>
                                        <div className="row">
                                            <div className="col-12 col-sm-6 col-md-4 col-lg-4" >
                                                <p className='p-list'>{element.nombre_proveedor}</p>
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-4 col-lg-4" >
                                                <p className='p-list'>{element.no_contacto_proveedor}</p>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-4 col-lg-4" >
                                                <div className='div-list-icons'>
                                                    <button onClick={()=> editarProveedorAction(element)} className='btn btn-link btn-editar'>
                                                        <FontAwesomeIcon className='icon-fa-edit' icon={faPenToSquare} />Editar
                                                    </button>
                                                    <button onClick={() => eliminaProveedorAction(element)} className='btn btn-link btn-delete'>
                                                        <FontAwesomeIcon className='icon-fa-delete' icon={faTrashCan} />Eliminar
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
            {eliminaArticulo ?
                <div className='div-cargando-active'>
                    <div className='div-gift-element'>
                        <div className='div-modal-container'>
                            <h3>Eliminar Articulo</h3>
                            <p>¿Esta seguro de eliminar el articulo {eliminaArticuloObject.nombre_registro} ?</p>
                            <button className='btn btn-primary bottom-custom' onClick={confirmaEliminarArticulo} >Eliminar</button>
                            <button className='btn btn-secundary bottom-custom-secondary' onClick={cancelaEliminarArticulo}>Cancelar</button>
                        </div>
                    </div>
                </div>
                :
                <></>
            }
            {editaArticulo ?
                <div className='div-cargando-active'>
                    <div className='div-gift-element'>
                        <div className='div-modal-container'>
                            <h3>Editar Articulo</h3>
                            <div className='div-form'>
                                <p className='p-label-form'> Articulo: </p>
                                <input ref={nombreArticuloEditaRef} value={nombreArticulo} onChange={(e) => setNombreArticulo(e.target.value)} type="text" className='form-control' placeholder='Ej: Arracacha' autoComplete='off' />
                            </div>
                            <div className='div-form'>
                                <p className='p-label-form'> Tipo Inventario: </p>
                                <Select ref={tipoInventarioEditaRef} onChange={(e) => setTipoInventario(e)} options={tipoInventarioOptions} placeholder='Seleccione' />
                            </div>
                            <div className='div-buttom-registra'>
                                <button className='btn btn-primary bottom-custom' onClick={confirmaEditarArticulo} >Guardar cambios</button>
                                <button className='btn btn-secundary bottom-custom-secondary' onClick={cancelaEdicionArticlulo}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <></>
            }
            {eliminaProveedor ?
                <>
                    <div className='div-cargando-active'>
                        <div className='div-gift-element'>
                            <div className='div-modal-container'>
                                <h3>Eliminar Proveedor</h3>
                                <p>¿Esta seguro de eliminar el proveedor {eliminaProveedorObject.nombre_proveedor} ?</p>
                                <button className='btn btn-primary bottom-custom' onClick={confirmaEliminarProveedor}>Eliminar</button>
                                <button className='btn btn-secundary bottom-custom-secondary' onClick={cancelaEliminarProveedor}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </>
                :
                <></>
            }
            {editaProveedor ?
                <div className='div-cargando-active'>
                    <div className='div-gift-element'>
                        <div className='div-modal-container'>
                            <h3>Editar Proveedor</h3>
                            <div className='div-form'>
                                <p className='p-label-form'> Proveedor: </p>
                                <input ref={proveedorEditaRef} value={proveedor} onChange={(e) => setProveedor(e.target.value)} type="text" className='form-control' placeholder='Ej: Corabastos' autoComplete='off' />
                            </div>
                            <div className='div-form'>
                                <p className='p-label-form'>No de contacto: </p>
                                <input ref={contactoProveedorEditaRef} value={contactoProveedor} onChange={(e) => setContactoProveedor(e.target.value)} type="text" className='form-control' placeholder='Ej: 311-1234567' autoComplete='off' />
                            </div>
                            <div className='div-buttom-registra'>
                                <button className='btn btn-primary bottom-custom' onClick={confirmaEditarProveedor} >Guardar cambios</button>
                                <button className='btn btn-secundary bottom-custom-secondary' onClick={cancelaEdicionProveedor}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <></>
            }
            {cargando ?
                <Cargando />
                :
                <></>
            }
        </div>
    )
}
