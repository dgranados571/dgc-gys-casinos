import React from 'react'
import loading from '../img/loading.gif'


export const Cargando = () => {
    return (
        <div className='div-cargando-active'>
            <div className='div-gift-element'>
                <div className='div-size-gift'>
                    <img src={loading} className='gif-element' alt='image-load'></img>
                </div>
            </div>
        </div>
    )
}

