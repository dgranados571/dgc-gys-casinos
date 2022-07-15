import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import '../css/paginador.css'

export const Paginacion = ({ elementsPaginacion, setElementsPaginacion }) => {


    const paginasBaseInfo = 10;
    const { totalElementos, elementosPorPagina, paginaActual } = elementsPaginacion

    const [paginacion, setPaginacion] = useState({
        paginas: [],
        totalPaginas: '',
        paginaActual: ''
    });

    useEffect(() => {
        let totalPagBase = Math.trunc(totalElementos / elementosPorPagina);
        const totalPagResiduo = totalElementos % elementosPorPagina;
        if (totalPagResiduo > 0) {
            totalPagBase = totalPagBase + 1;
        }
        let paginaList = []
        for (var i = 0; i < totalPagBase; i++) {
            let n = i + 1;
            paginaList.push({
                pageNum: n, classDiv: (n == paginaActual) ? 'btn btn-link div-pagina-link-selected' : 'btn btn-link div-pagina-link', classPage: (n == paginaActual) ? 'btn btn-link pagina-link-selected' : 'btn btn-link pagina-link'
            });
        }
        if (paginaList.length > paginasBaseInfo) {
            const paginaListFilter = paginaList.filter((pagina) => {
                if (pagina.pageNum >= paginaActual) {
                    if (pagina.pageNum < (parseInt(paginaActual, 10) + paginasBaseInfo)) {
                        return pagina
                    }
                }
            })
            if (paginaListFilter.length === paginasBaseInfo) {
                paginaList = paginaListFilter;
            } else {
                paginaList = paginaList.filter((pagina) => {
                    if (pagina.pageNum >= (totalPagBase - paginasBaseInfo + 1)) {
                        return pagina
                    }
                })
            }
        }
        setPaginacion({
            paginas: paginaList,
            totalPaginas: totalPagBase,
            paginaActual: paginaActual
        });
    }, [totalElementos, elementosPorPagina, paginaActual])

    const cambiaPagina = (e) => {
        setElementsPaginacion({
            ...elementsPaginacion,
            paginaActual: e.target.id
        })
    }

    const avanzaPage = () => {
        setElementsPaginacion({
            ...elementsPaginacion,
            paginaActual: (paginaActual < paginacion.totalPaginas) ? parseInt(paginaActual, 10) + 1 : paginaActual
        })
    }

    const regresaPage = () => {
        setElementsPaginacion({
            ...elementsPaginacion,
            paginaActual: (paginaActual > 1) ? parseInt(paginaActual, 10) - 1 : paginaActual
        })
    }

    return (
        <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 " >
                <div className='div-pagination'>
                    <button onClick={regresaPage} className='btn btn-link pagina-link'><FontAwesomeIcon icon={faAngleLeft} /></button>
                    {
                        paginacion.paginas.map((page) => {
                            return (
                                <div className={page.classDiv} >
                                    <button id={page.pageNum} onClick={cambiaPagina} className={page.classPage}>{page.pageNum}</button>
                                </div>
                            )
                        })
                    }
                    <button onClick={avanzaPage} className='btn btn-link pagina-link'><FontAwesomeIcon icon={faAngleRight} /></button>
                </div>
            </div>
        </div>
    )
}
