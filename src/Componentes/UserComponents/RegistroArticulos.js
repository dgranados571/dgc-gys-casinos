import React, { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan, faFloppyDisk, faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { Paginacion } from '../Paginacion'
import { ToastContainer, toast } from 'react-toastify';
import { utilUrl } from '../../utilUrl';
import { Cargando } from '../Cargando';
import Select from 'react-select'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';

export const RegistroArticulos = () => {

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
    const [tipoInventario, setTipoInventario] = useState('')

    const [proveedor, setProveedor] = useState('')
    const [contactoProveedor, setContactoProveedor] = useState('')

    const [editaArticulo, setEditaArticulo] = useState({
        estadoEdita: false,
        idProcesamiento: ''
    })

    const [eliminaArticulo, setEliminaArticulo] = useState(false)
    const [eliminaArticuloObject, setEliminaArticuloObject] = useState('')

    const nombreArticuloRef = useRef('')
    const tipoInventarioRef = useRef('')

    const proveedorRef = useRef('')
    const contactoProveedorRef = useRef('')

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
        if (nombreArticulo.length == 0) {
            formValidado.push('nombreArticulo');
            nombreArticuloRef.current.className = 'form-control form-control-error'
        }
        if (tipoInventario.length == 0) {
            formValidado.push('Tipo Inventario');
        }
        if (formValidado.length == 0) {
            enviaInformacionMateriaPrima()
        } else {
            formValidado.splice(0, formValidado.length)
            toast('Errores en el formulario Materia Prima')
        }
    }

    const guardarProveedor = () => {
        let formValidado = [];
        proveedorRef.current.className = 'form-control';
        if (proveedor.length == 0) {
            formValidado.push('proveedor');
            proveedorRef.current.className = 'form-control form-control-error'
        }
        contactoProveedorRef.current.className = 'form-control';
        if (contactoProveedor.length == 0) {
            formValidado.push('Contacto proveedor');
            contactoProveedorRef.current.className = 'form-control form-control-error'
        }
        if (formValidado.length == 0) {
            enviaInformacionProveedor()
        } else {
            formValidado.splice(0, formValidado.length)
            toast('Errores en el formulario proveedores')
        }
    }

    const editarArticulo = (element) => {
        setEditaArticulo({
            estadoEdita: true,
            idProcesamiento: element.id_procesamiento
        })
        setNombreArticulo(element.nombre_registro)
    }

    const cancelaEdicionArticlulo = () => {
        setEditaArticulo({
            estadoEdita: false,
            idProcesamiento: ''
        })
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

    const cancelaEliminarArticulo = ()=>{
        setEliminaArticuloObject('')
        setEliminaArticulo(false)
    }

    const consultaInformacionMateriaPrima = async () => {
        setCargando(true)
        await axios.get(`${urlEntorno}/service/dgcgys/casinos/obtieneMateriaPrima?elementosPorPagina=${elementsPaginacionArticulos.elementosPorPagina}&paginaActual=${elementsPaginacionArticulos.paginaActual}`)
            .then((response) => {
                setTimeout(() => {
                    setCargando(false)
                    setArticulos(response.data.registrosInventarioListPaginada)
                    setElementsPaginacionArticulos({ ...elementsPaginacionArticulos, totalElementos: response.data.totalElementos })
                }, 1000)
            }).catch(() => {
                setTimeout(() => {
                    setCargando(false)
                }, 1000)
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
                }, 1000)
            }).catch(() => {
                setTimeout((error) => {
                    setCargando(false)
                    console.log(error)
                }, 1000)
            })
    }

    const enviaInformacionMateriaPrima = async () => {
        setCargando(true)
        const f = new FormData();
        f.append('nombreArticulo', nombreArticulo);
        f.append('tipoInventario', tipoInventario);
        const usuarioLocalStorage = sessionStorage.getItem('usuarioApp');
        f.append('usuarioApp', usuarioLocalStorage);
        await axios.post(`${urlEntorno}/service/dgcgys/casinos/registraMateriaPrima`, f)
            .then((response) => {
                setTimeout(() => {
                    setCargando(false)
                    if (response.data.status) {
                        setNombreArticulo('')
                        tipoInventarioRef.current.setValue('INITIAL')
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

    return (
        <div>
            <ToastContainer autoClose={4000} hideProgressBar={true} />
            <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-style-form'>
                        <div className='div-form'>
                            <p className='p-label-form'> Articulo: </p>
                            <input ref={nombreArticuloRef} value={nombreArticulo} onChange={(e) => setNombreArticulo(e.target.value)} type="text" className='form-control' placeholder='Ej: Arracacha' autoComplete='off' />
                        </div>
                        <div className='div-form'>
                            <p className='p-label-form'> Tipo Inventario: </p>
                            <Select ref={tipoInventarioRef} defaultValue={tipoInventario} onChange={(e) => setTipoInventario(e.value)} options={tipoInventarioOptions} placeholder='Seleccione' />
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
                                                {
                                                    editaArticulo.estadoEdita && editaArticulo.idProcesamiento === element.id_procesamiento ?
                                                        <input value={nombreArticulo} onChange={(e) => setNombreArticulo(e.target.value)} type="text" className='form-control' autoComplete='off' />
                                                        :
                                                        <p className='p-list'>{element.nombre_registro}</p>
                                                }
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-4 col-lg-4" >
                                                {
                                                    editaArticulo.estadoEdita && editaArticulo.idProcesamiento === element.id_procesamiento ?
                                                        <Select options={tipoInventarioOptions} placeholder='Seleccione' />
                                                        :
                                                        <p className='p-list'>{element.tipo_inventario}</p>
                                                }
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-4 col-lg-4" >
                                                <div className='div-list-icons'>
                                                    {
                                                        editaArticulo.estadoEdita && editaArticulo.idProcesamiento === element.id_procesamiento ?
                                                            <>
                                                                <button className='btn btn-link btn-salvar'  >
                                                                    <FontAwesomeIcon className='icon-fa-save ' icon={faFloppyDisk} />Guardar
                                                                </button>
                                                                <button className='btn btn-link btn-delete' onClick={cancelaEdicionArticlulo}>
                                                                    <FontAwesomeIcon className='icon-fa-delete' icon={faRotateLeft} />Cancelar
                                                                </button>
                                                            </>
                                                            :
                                                            <>
                                                                <button onClick={() => editarArticulo(element)} className='btn btn-link btn-editar'>
                                                                    <FontAwesomeIcon className='icon-fa-edit' icon={faPenToSquare} />Editar
                                                                </button>
                                                                <button onClick={() => eliminaArticuloAction(element)} className='btn btn-link btn-delete'>
                                                                    <FontAwesomeIcon className='icon-fa-delete' icon={faTrashCan} />Eliminar
                                                                </button>
                                                            </>
                                                    }
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
            {eliminaArticulo ?
                <>
                    <div className='div-cargando-active'>
                        <div className='div-gift-element'>
                            <div className='div-modal-container'>
                                <h3>Eliminar Articulo</h3>
                                <p>¿Esta seguro de eliminar el articulo {eliminaArticuloObject.nombre_registro} ?</p>
                                <button className='btn btn-primary bottom-custom' onClick={confirmaEliminarArticulo} >Eliminar</button>
                                <button className='btn btn-secundary bottom-custom-secondary'  onClick={cancelaEliminarArticulo}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </>
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
