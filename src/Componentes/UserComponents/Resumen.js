import React, { useEffect, useState } from 'react'
import { utilUrl } from '../../utilUrl';
import { Cargando } from '../Cargando';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faSprayCan } from '@fortawesome/free-solid-svg-icons'

export const Resumen = () => {

    const { urlEntorno } = utilUrl();
    const [cargando, setCargando] = useState(false)

    const [totalMateriaPrima, setTotalMateriaPrima] = useState([])
    const [totalAseoPlasticos, setTotalAseoPlasticos] = useState([])
    
    useEffect(() => {
        consultaInformacionTotales()
    }, [])

    const consultaInformacionTotales= async () => {
        setCargando(true)
        const usuarioLocalStorage = sessionStorage.getItem('usuarioApp');
        console.log('USUARIO APP', usuarioLocalStorage);
        await axios.get(`${urlEntorno}/service/dgcgys/casinos/totalElementosResumen?usuarioApp=${usuarioLocalStorage}`)
            .then((response) => {
                setTimeout(() => {
                    setCargando(false)
                    setTotalMateriaPrima(response.data.totalMateriaPrima)
                    setTotalAseoPlasticos(response.data.totalElementosAseoPlasticos)
                }, 250)
            }).catch(() => {
                setTimeout(() => {
                    setCargando(false)
                }, 250)
            })
    }

    return (
        <div>
            <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-resumen-children'>
                        <div className='div-resumen-children-machine'>
                            <FontAwesomeIcon className='icon-machine' icon={faCartShopping} />
                            <div>
                                <p className='p-element-machine-1' >{totalMateriaPrima}</p>
                                <p className='p-element-machine-2' >Total elementos materia prima</p>
                            </div>
                            <div>
                                <p className='p-element-machine-1' >0%</p>
                                <p className='p-element-machine-2' >Estado del Inventario</p>
                            </div>
                        </div>
                        <div className='link-e-machine'>
                            <button className='btn btn-link a-link-redirect' >
                                Ver detalle inventario
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6" >
                    <div className='div-resumen-children'>
                        <div className='div-resumen-children-machine'>
                            <FontAwesomeIcon className='icon-machine' icon={faSprayCan} />
                            <div>
                                <p className='p-element-machine-1' >{totalAseoPlasticos}</p>
                                <p className='p-element-machine-2' >Total Elementso Aseo/ Plasticos</p>
                            </div>
                            <div>
                                <p className='p-element-machine-1' >0%</p>
                                <p className='p-element-machine-2' >Estado del Inventario</p>
                            </div>
                        </div>
                        <div className='link-e-machine'>
                            <button className='btn btn-link a-link-redirect' >
                                Ver detalle inventario
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {cargando ?
                <Cargando />
                :
                <></>
            }
        </div>
    )
}