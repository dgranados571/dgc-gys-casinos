import React, { useEffect, useState } from 'react'
import { utilUrl } from '../../utilUrl';
import { Cargando } from '../Cargando';
import axios from 'axios'
import Select from 'react-select'
import Autosuggest from 'react-autosuggest';
import 'react-toastify/dist/ReactToastify.css';

export const Inventario = () => {

    const { urlEntorno } = utilUrl();
    const [cargando, setCargando] = useState(false)

    const [articulos, setArticulos] = useState([])
    const [articulosSuggestion, setArticulosSuggestion] = useState([])
    const [articulosValue, setArticulosValue] = useState('')
    const [articulosSeleccionado, setArticulosSeleccionado] = useState('')

    const [proveedores, setProveedores] = useState([])
    const [proveedoresSuggestion, setProveedoresSuggestion] = useState([])
    const [proveedoresValue, setProveedoresValue] = useState('')
    const [proveedoresSeleccionado, setProveedoresSeleccionado] = useState('')

    const tipoDeConformidad = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'CONFORME', label: 'Conforme' },
        { value: 'NO_CONFORME', label: 'No conforme' }
    ]

    const unidadDeMedida = [
        { value: 'INITIAL', label: 'Seleccione' },
        { value: 'KILOS', label: 'Kilos' },
        { value: 'LIBRAS', label: 'Libras' },
        { value: 'ARROBAS', label: 'Arroba' },
        { value: 'LITROS', label: 'Litros' },
    ]

    const [estadoProductos, setEstadoProductos] = useState('')
    const [loteProducto, setLoteProducto] = useState('')
    const [cantidadProducto, setCantidadProducto] = useState('')
    const [unidadMedidaProducto, setUnidadMedidaProducto] = useState('')

    useEffect(() => {
        consultaInformacionMateriaPrima()
        consultaInformacionProveedores()
    }, [])

    /* INICIO AUTOCOMPLETE ARTICULOS */

    const onSuggestionsFetchRequestedArticulos = ({ value }) => {
        const valueLenght = value.length;
        const articuloSugestObject = articulos.filter((art) => {
            if (art.nombre_registro.includes(value.toUpperCase())) {
                return art;
            }
        })
        const articuloSugest = articuloSugestObject.map((art) => {
            return art.nombre_registro;
        })
        setArticulosSuggestion(valueLenght === 0 ? [] : articuloSugest)
    }

    const onSuggestionsClearRequestedArticulos = () => {
        setArticulosSuggestion([])
    }

    const getSuggestionValueArticulos = (suggestion) => {
        return suggestion;
    }

    const renderSuggestionArticulos = (suggestion) => {
        return (
            <div className='suggestion-element' onClick={seleccionaArticulo(suggestion)}>{suggestion}</div>
        )
    }

    const seleccionaArticulo = (articulo) => {
        setArticulosSeleccionado(articulo)
    }

    const onChangeArticulos = (e, { newValue }) => {
        setArticulosValue(newValue)
    }

    const inputPropsArticulos = {
        placeholder: 'Ej: Arracacha',
        value: articulosValue,
        onChange: onChangeArticulos,
        className: 'form-control'
    }

    const eventEnterArticulos = (e) => {
        if (e.key === 'Enter') {
            setArticulosSeleccionado(e.target.value)
        }
    }
    /* FINALIZA AUTOCOMPLETE ARTICULOS */

    /* INICIO AUTOCOMPLETE PROVEEDORES */
    const onSuggestionsFetchRequestedProveedores = ({ value }) => {
        const valueLenght = value.length;
        const proveedoresSugestObject = proveedores.filter((prov) => {
            if (prov.nombre_proveedor.includes(value.toUpperCase())) {
                return prov;
            }
        })
        const proveedorSugest = proveedoresSugestObject.map((prov) => {
            return prov.nombre_proveedor;
        })
        setProveedoresSuggestion(valueLenght === 0 ? [] : proveedorSugest)
    }

    const onSuggestionsClearRequestedProveedores = () => {
        setProveedoresSuggestion([])
    }

    const getSuggestionValueProveedores = (suggestion) => {
        return suggestion;
    }

    const renderSuggestionProveedores = (suggestion) => {
        return (
            <div className='suggestion-element' onClick={seleccionaProveedor(suggestion)}>{suggestion}</div>
        )
    }

    const seleccionaProveedor = (proveedor) => {
        setProveedoresSeleccionado(proveedor)
    }

    const onChangeProveedores = (e, { newValue }) => {
        setProveedoresValue(newValue)
    }

    const inputPropsProveedores = {
        placeholder: 'Ej: Proveedor 1',
        value: proveedoresValue,
        onChange: onChangeProveedores,
        className: 'form-control'
    }

    const eventEnterProveedores = (e) => {
        if (e.key === 'Enter') {
            setProveedoresSeleccionado(e.target.value)
        }
    }
    /* FINALIZA AUTOCOMPLETE PROVEEDORES */

    const consultaInformacionMateriaPrima = async () => {
        setCargando(true)
        await axios.get(`${urlEntorno}/service/dgcgys/casinos/obtieneMateriaPrimaTotal`)
            .then((response) => {
                setTimeout(() => {
                    setCargando(false)
                    setArticulos(response.data.registrosInventarioListPaginada)
                }, 250)
            }).catch(() => {
                setTimeout(() => {
                    setCargando(false)
                }, 250)
            })
    }

    const consultaInformacionProveedores = async () => {
        setCargando(true)
        await axios.get(`${urlEntorno}/service/dgcgys/casinos/obtieneProveedoresTotal`)
            .then((response) => {
                setTimeout(() => {
                    setCargando(false)
                    setProveedores(response.data.registroProveedorlistPaginada)
                }, 250)
            }).catch(() => {
                setTimeout((error) => {
                    setCargando(false)
                    console.log(error)
                }, 250)
            })
    }

    const guardaEnInventario = ()=>{
        console.log('ARTICULO', articulosSeleccionado)
        console.log('PROVEEDOR', proveedoresSeleccionado)
        console.log('ESTADO PRODUCTO', estadoProductos )
        console.log('LOTE PRODUCTO', loteProducto )
        console.log('CANTIDAD PRODUCTO', cantidadProducto )
        console.log('UNIDAD DE MEDIDA', unidadMedidaProducto )
    }

    return (
        <>
            <div className='div-style-form'>
                <h3>Recepción de materia prima</h3>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'> Articulo: </p>
                            <Autosuggest
                                suggestions={articulosSuggestion}
                                onSuggestionsFetchRequested={onSuggestionsFetchRequestedArticulos}
                                onSuggestionsClearRequested={onSuggestionsClearRequestedArticulos}
                                getSuggestionValue={getSuggestionValueArticulos}
                                renderSuggestion={renderSuggestionArticulos}
                                inputProps={inputPropsArticulos}
                                onSuggestionSelected={eventEnterArticulos}
                            />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'> Proveedor: </p>
                            <Autosuggest
                                suggestions={proveedoresSuggestion}
                                onSuggestionsFetchRequested={onSuggestionsFetchRequestedProveedores}
                                onSuggestionsClearRequested={onSuggestionsClearRequestedProveedores}
                                getSuggestionValue={getSuggestionValueProveedores}
                                renderSuggestion={renderSuggestionProveedores}
                                inputProps={inputPropsProveedores}
                                onSuggestionSelected={eventEnterProveedores}
                            />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'> Estado del producto: </p>
                            <Select options={tipoDeConformidad} onChange={(e)=> setEstadoProductos(e.value)} placeholder='Seleccione' />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'> Lote: </p>
                            <input type="text" className='form-control' onChange={(e)=> setLoteProducto(e.target.value)} placeholder='Ej: V-1232' autoComplete='off' />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'> Cantidad: </p>
                            <input type="text" className='form-control' onChange={(e)=> setCantidadProducto(e.target.value)} placeholder='Ej: 14' autoComplete='off' />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                        <div className='div-form'>
                            <p className='p-label-form'> Unidad de medida: </p>
                            <Select options={unidadDeMedida} onChange={(e)=>setUnidadMedidaProducto(e.value)} placeholder='Seleccione' />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
                        <div className='div-buttom-registra'>
                            <button className='btn btn-primary bottom-custom' onClick={guardaEnInventario} >Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
            {cargando ?
                <Cargando />
                :
                <></>
            }
        </>
    )
}
